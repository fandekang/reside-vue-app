<template>
  <div>
    <!-- 动态查询筛选框 -->
    <mt-popup class="dynamic-dialog" v-model="dynamicDialogVisible"></mt-popup>
    <!-- 顶部导航列表 -->
    <full-popup
      class="material-dialog"
      v-model="topMenuDialogVisible"
      :title="topMenuDialogTitle"
      @back="topMenuDialogBackEvent"
    >
      <router-view v-if="topMenuDialogVisible"></router-view>
    </full-popup>
    <div class="main">
      <!-- 头部 -->
      <div class="header-wrapper">
        <img :src="logoImg" height="40px">
        <span class="logout-btn" @click="loginEvent">退出</span>
      </div>
      <div class="nav-wrapper">
        <div class="item" v-for="(item, index) in tabBars" :key="index">
          <span class="item-a" @click="toMenuDialog(item.id, item.text)">{{item.text}}</span>
        </div>
      </div>
      <div class="loadmore-wrapper">
        <load-more-cell
          v-if="dataUrl"
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
              <div class="up">
                <span class="serialNO">{{item.serialNO}}</span>
                <span class="process-name">{{item.processName}}</span>
              </div>
              <div class="down">
                <span>{{item.strTaskStatus}}</span>
                <span>申请人 : {{item.appMan}}</span>
                <span>申请时间 : {{formatDate(item.procInsCreated)}}</span>
              </div>
            </div>
          </template>
        </load-more-cell>
      </div>
    </div>
  </div>
</template>
<script>
import logoImg from "@/assets/images/logo.png";
export default {
  data() {
    return {
      logoImg,
      dataUrl: process.env.ROOT_API + "task/getTaskList?actType=2",
      pager: {
        curPage: 1,
        pageSize: 5
      },
      allLoaded: false,
      tabBars: [],
      topMenuDialogVisible: false,
      topMenuDialogTitle: '',
      dynamicDialogVisible: false
    };
  },
  computed: {
    topMenuPopVisible() {
      return this.$store.state.main.topMenuPopVisible
    }
  },
  watch: {
    topMenuPopVisible(val) {
      if (val) {
        this.topMenuDialogBackEvent()
      }
    }
  },
  methods: {
    // 格式化日期
    formatDate(date) {
      let arr = date.split("-");
      return arr[0] + "年" + arr[1] + "月" + arr[2] + "日";
    },
    loginEvent() {
      this.$store.commit("toggleLoginVisible", { loginVisible: true });
    },
    loadTop() {
      this.pager.curPage = 1
      this.$refs.loadMore.onTopLoaded();
    },
    loadBottom() {
      this.$refs.loadMore.onBottomLoaded();
    },
    // 进入顶部导航栏弹出框
    toMenuDialog(path, text) {
       this.topMenuDialogVisible = true
       this.topMenuDialogTitle = text
       this.$router.push(path)
    },
    // 顶部导航栏弹出框的返回事件
    topMenuDialogBackEvent() {
      this.topMenuDialogVisible = false
      this.dataUrl = process.env.ROOT_API + "task/getTaskList?actType=2&dt=" + Math.random()
      this.$router.push('/')
    }
  },
  created() {
    this.$http.get(process.env.ROOT_API + "menu/getCellphoneTopMenu").then(
      res => {
        res = JSON.parse(res.bodyText);
        if (res.success) {
          this.tabBars = res.data;
        } else {
          this.$toast({
            message: "请求顶部菜单列表失败",
            iconClass: "fa fa-exclamation"
          });
        }
      },
      err => {
        // this.$toast({
        //   message: "请求顶部菜单列表失败",
        //   iconClass: "fa fa-exclamation"
        // });
        throw new Error(err);
      }
    );
  }
};
</script>
<style lang="scss" scoped>
.main {
  background: rgba(255, 255, 255, 1);
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 60px;
    background: rgba(242, 242, 242, 1);
    .logout-btn {
      padding: 4px 15px;
      background: rgba(131, 81, 208, 1);
      color: #fff;
    }
  }
  .nav-wrapper {
    display: flex;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    .item {
      flex: 1;
      .item-a {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #333;
        font-size: 1.2em;
        text-decoration: none;
      }
    }
  }
  .loadmore-wrapper {
    position: fixed;
    top: 120px;
    bottom: 70px;
    width: 100%;
    overflow: scroll;
    .cell {
      padding: 10px 20px;
      font-weight: 650;
      border-bottom: 1px solid rgba(228, 228, 228, 1);
      .up {
        margin-bottom: 10px;
        font-size: 1.5em;
        color: #333;
        .serialNO {
          margin-right: 1em;
        }
      }
      .down {
        display: flex;
        justify-content: space-between;
        font-size: 0.83em;
        color: #999;
      }
    }
  }
}
</style>
