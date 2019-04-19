<template>
  <div class="container">
    <mt-popup class="create-case-step" v-model="popupVisible" :modal="false" popup-transition="popup-fade" position="bottom">
      <create-case-step></create-case-step>
    </mt-popup>
    <div class="list-wrapper" v-if="authList.length">
      <template v-for="(item, index) in authList">
        <div
          class="item"
          :class="isSelect ? 'selected' : '' "
          :key="index"
          @click="tap(item.procID, item.actID, item.busiessName)"
        >{{item.busiessName}}</div>
      </template>
    </div>
    <div class="next-btn" @click="next">下一步</div>
  </div>
</template>
<script>
import createCaseStep from "@/components/layout/case/create-case/create-case-step";

export default {
  components: {
    createCaseStep
  },
  data() {
    return {
      popupVisible: false,
      authList: [],
      isSelect: false,
      procID: ""
    };
  },
  created() {
    // console.log(this);
    this.getAuthList();
  },
  methods: {
    // 获取任务流程列表
    getAuthList() {
      this.$http.get(process.env.ROOT_API + "auth/getAuthList.do").then(
        res => {
          res = JSON.parse(res.bodyText);
          if (res.success) {
            this.authList = res.data;
          }
        },
        err => {
          this.$message.error("获取任务流程列表失败");
          throw new Error(err);
        }
      );
    },
    tap(procID, processName) {
      this.isSelect = !this.isSelect;

      if (this.isSelect) {
        this.procID = procID;
      }
    },
    next() {
      if (this.isSelect) {
        let jsonObj = {
            task: {
              procID: this.procID
            }
          },
          jsonStr = JSON.stringify(jsonObj),
          pathArr = [],
          pageNameArr = [],
          pageCheckArr = [];

        this.$http
          .post(
            process.env.ROOT_API + "guide/getFormList",
            { jsonStr: jsonStr },
            { emulateJSON: true }
          )
          .then(
            res => {
              res = JSON.parse(res.bodyText);
              if (res.success) {
                res.data.forEach(item => {
                  pageNameArr.push(item.pageName);
                  pathArr.push("/" + item.pagePath.slice(0, -5));
                  pageCheckArr.push(item.checkValidRule);
                });

                let obj = {
                  task: {
                    procID: this.procID,
                    // serialNO: 0,
                    // processName: processName
                  },
                  pathArr: pathArr,
                  pageNameArr: pageNameArr,
                  pageCheckArr: pageCheckArr
                };

                this.$store.commit("changeCreateCaseData", {
                  createCaseData: obj
                });

                this.popupVisible = true;
              } else {
                this.$toast({
                  message: "请求失败",
                  iconClass: "fa fa-exclamation"
                });
              }
            },
            err => {
              this.$toast({
                message: "请求失败",
                iconClass: "fa fa-exclamation"
              });
              throw new Error(err);
            }
          );
      } else {
        //   alert('error')
        this.$toast({ message: "还没有选择一项" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.create-case-step {
    width: 100%;
    top: 60px;
    bottom: 55px;
    overflow: auto;
}
.container {
  margin-top: 60px;
  padding: 2em;
  .list-wrapper {
    .item {
      margin-bottom: 20px;
      padding: 10px 0;
      text-align: center;
      background-color: rgba(226, 226, 226, 1);
      color: #333;
    }
    .selected {
      background-color: rgba(131, 81, 208, 1);
    }
  }
  .next-btn {
    padding: 10px 0;
    text-align: center;
    background-color: rgba(131, 81, 208, 1);
    color: #fff;
  }
}
</style>
