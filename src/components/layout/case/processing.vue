<template>
  <div>
    <!-- 增加/修改收件材料框 -->
    <full-popup
      class="material-full-popup"
      v-model="materialDialogVisible"
      :title="materialDialogTitle"
      @back="materialDialogBackEvent"
    >
      <material-dialog v-if="materialDialogVisible"></material-dialog>
    </full-popup>

    <!-- 转件 -->
    <mt-popup class="skipDialog" v-model="skipDialogVisible" position="bottom">
      <mt-picker :slots="slots" valueKey="staffName" @change="onValuesChange"></mt-picker>
      <div class="conform" @click="conform">确定</div>
    </mt-popup>

    <!-- 办理框 -->
    <full-popup
      class="handle-case-dialog"
      v-model="dialogVisible"
      :title="dialogTitle"
      @back="fullPopUpBackEvent"
    >
      <router-view v-if="dialogVisible"></router-view>
    </full-popup>

    <header-wrapper :title="title" @back="back"></header-wrapper>
    <div class="loadmore-wrapper">
      <load-more-cell
        ref="loadMore"
        :pager="pager"
        :dataUrl="dataUrl"
        :auto-fill="false"
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded.sync="allLoaded"
      >
        <template slot-scope="scope">
          <div class="cell" v-for="(item, index) in scope.source" :key="index">
            <div class="status-triangle type1" v-if="item.taskStatus == 1"></div>
            <div class="status-triangle type2" v-else></div>
            <div class="status" v-if="item.taskStatus == 1">正</div>
            <div class="status" v-else>退</div>
            <div class="serialNO">案件编号 : {{item.serialNO}}</div>
            <div class="type">案件类型 : {{item.processName}}</div>
            <div class="proposer">申请人 : {{item.appMan}}</div>
            <div class="landlord">房东 : {{item.appMan2}}</div>
            <div class="date">申请时间 : {{formatDate(item.procInsCreated)}}</div>
            <div class="operate" v-if="item.actID == 7 || item.actID == 19">
              <button class="btn handle" @click="handleCase(item.actID, item.serialNO)">办理</button>
              <button class="btn" @click="skipCase(item)">转件</button>
            </div>
            <div class="operate" v-else>
              <button class="btn handle" @click="handleCase(item.actID, item.serialNO)">办理</button>
              <button class="btn" @click="backCase(item)">退件</button>
            </div>
          </div>
        </template>
      </load-more-cell>
    </div>
  </div>
</template>
<script>
import headerWrapper from "@/components/layout/header-back";
import materialDialog from "@/components/layout/case/handle/write/material/add-edit-material";
import applyer from "@/components/layout/case/handle/write/application-form/applyer";

export default {
  components: {
    headerWrapper,
    materialDialog,
    applyer
  },
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      title: "办理中任务",
      // dataUrl: process.env.ROOT_API + "task/getTaskList?actType=2",
      pager: {
        curPage: 1,
        pageSize: 2
      },
      allLoaded: false,
      skipDialogVisible: false,
      selectStaff: null,
      selectItem: null,
      slots: [
        {
          values: [
            {
              staffName: "转到待接收列表",
              staffID: ""
            }
          ]
        }
      ]
    };
  },
  methods: {
    back() {
      this.$store.commit("toggleTabBarActive", { tabBarActive: "/home" });
    },
    loadTop() {
      // alert('下啦')
      this.pager.curPage = 1;
      this.$refs.loadMore.onTopLoaded();
    },
    loadBottom() {
      // alert('上拉')
      this.$refs.loadMore.onBottomLoaded();
    },
    // 格式化日期
    formatDate(date) {
      let arr = date.split("-");
      return arr[0] + "年" + arr[1] + "月" + arr[2] + "日";
    },
    // 办理案件
    handleCase(actID, serialNO) {
      this.dialogVisible = true;
      this.dialogTitle = serialNO + " 居住证办理";
      // alert(this.dialogVisible);
      if (actID == 7 || actID == 19) {
        // alert('正在办理')
        this.$router.push({
          path: "/handleWrite",
          query: {
            actID: actID,
            serialNO: serialNO
          }
        });
      } else if (actID == 8 || actID == 21) {
        // alert('缮证')
        this.$router.push({
          path: "/handleView",
          query: {
            actID: actID,
            serialNO: serialNO
          }
        });
      }
    },
    // 弹出框返回事件
    fullPopUpBackEvent() {
      // this.$router.back();
      this.dialogVisible = false;
    },
    // 收件材料编辑框返回事件
    materialDialogBackEvent() {
      this.materialDialogVisible = false;
    },
    // 转件
    skipCase(item) {
      this.skipDialogVisible = true;
      this.selectItem = item;
      let param = {
        random: Math.random(),
        actID: item.actID,
        serialNO: item.serialNO
      };
      this.$http
        .post(process.env.ROOT_API + "task/getAllStaff", param, {
          emulateJSON: true
        })
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.data) {
              this.slots[0].values = this.slots[0].values.concat(res.data);
            }
          },
          err => {
            throw new Error(err);
          }
        );
    },
    // 选择框picker 发生改变是触发
    onValuesChange(picker, values) {
      // console.log(values);
      this.selectStaff = values[0];
    },
    // 转件框选择确认
    conform() {
      let arr = [
        {
          procID: this.selectItem.procID,
          nextStaffID: this.selectStaff.staffID,
          type: "SendTask",
          taskID: this.selectItem.taskID,
          actID: this.selectItem.actID,
          procInstanceID: this.selectItem.procInstanceID
        }
      ];

      // console.log(arr);

      this.$http
        .post(
          process.env.ROOT_API + "task/changeTask",
          { taskListString: JSON.stringify(arr) },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.$toast("转件成功");
              this.dataUrl =
                process.env.ROOT_API +
                "task/getTaskList?actType=2&dt" +
                Math.random();
              this.pager.curPage = 1;
              this.skipDialogVisible = false;
            } else {
              this.$toast("转件失败");
            }
          },
          err => {
            this.$toast("转件失败");
            throw new Error(err);
          }
        );
    },
    // 退件
    backCase(item) {
      let arr = [
        {
          procID: item.procID,
          type: "BackTask",
          taskID: item.taskID,
          procInstanceID: item.procInstanceID
        }
      ];

      this.$http
        .post(
          process.env.ROOT_API + "task/changeTask",
          { taskListString: JSON.stringify(arr) },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.$toast("退件成功");
              this.dataUrl =
                process.env.ROOT_API +
                "task/getTaskList?actType=2&dt" +
                Math.random();
            } else {
              this.$toast("退件失败");
            }
          },
          err => {
            this.$toast("退件失败");
            throw new Error(err);
          }
        );
    },
  },
  computed: {
    materialDialogVisible: {
      get() {
        return this.$store.state.main.materialDialogVisible;
      },
      set(val) {
        this.$store.commit("toggleMaterialDialogVisible", {
          materialDialogVisible: val
        });
      }
    },
    materialDialogTitle: {
      get() {
        return this.$store.state.main.materialDialogTitle;
      },
      set(val) {
        this.$store.commit("changeMaterialDialogTitle", {
          materialDialogTitle: val
        });
      }
    },
    dataUrl() {
      return this.$store.state.taskProcessing.processingURL
    }
  }
};
</script>
<style>
.handle-case-dialog .sy-full-popup-title,
.material-full-popup .sy-full-popup-title {
  height: 60px !important;
  background: rgba(242, 242, 242, 1) !important;
  color: #333;
  font-weight: 700 !important;
  border-bottom: 1px solid rgba(226, 226, 226, 1) !important;
}

.handle-case-dialog .sy-full-popup-title .mint-header-title,
.material-full-popup .mint-header-title {
  font-weight: 700;
}
.handle-case-dialog .sy-full-popup-title .mintui-back,
.material-full-popup .sy-full-popup-title .mintui-back {
  font-size: 2em;
}

.skipDialog {
  width: 100%;
  z-index: 3001 !important;
}
.skipDialog .conform {
  height: 35px;
  width: 100%;
  text-align: center;
  line-height: 35px;
  font-size: 1.5em;
  background: rgba(153, 51, 204, 1);
  color: #fff;
}
</style>

<style lang="scss" scoped>
.loadmore-wrapper {
  position: fixed;
  top: 70px;
  bottom: 70px;
  padding: 0 25px;
  width: 100%;
  box-sizing: border-box;
  overflow: scroll;
  .cell {
    position: relative;
    padding: 1.25em;
    margin-bottom: 30px;
    font-size: 1.2em;
    background: rgba(242, 242, 242, 1);
    color: #333;
    .status {
      position: absolute;
      top: 4px;
      right: 10px;
      font-size: 1.5em;
      font-weight: 650;
      color: #fff;
    }
    .status-triangle {
      position: absolute;
      right: -10px;
      top: -25px;
      width: 0;
      height: 0;
      border-width: 3.3em 0 3.3em 3.3em;
      border-style: solid;
      transform: rotateZ(-45deg);
      //   transform: rotateZ(-45deg) translateX(2px) translateY(-2px);
    }
    .type1 {
      border-color: transparent transparent transparent #9933cc;
    }
    .type2 {
      border-color: transparent transparent transparent #f00;
    }
    .serialNO,
    .type,
    .proposer,
    .landlord,
    .date {
      margin-bottom: 8px;
    }
    .operate {
      .btn {
        margin-right: 10px;
        padding: 3px 10px;
        background: rgba(153, 51, 204, 1);
        font-size: 1em;
        color: #fff;
        border: none;
        outline: none;
      }
      .handle {
        background: rgba(221, 221, 221, 1);
        color: #333;
        font-weight: 650;
      }
    }
  }
}
</style>
