<template>
  <div>
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
            <!-- <div class="status" v-if="item.actID == 7 || item.actID == 19">正</div>
              <div class="status" v-if="item.actID == 8 || item.actID == 21">缮</div>
            <div class="status" v-else>完</div>-->
            <div class="serialNO">案件编号 : {{item.serialNO}}</div>
            <div class="type">案件类型 : {{item.processName}}</div>
            <div class="proposer">申请人 : {{item.appMan}}</div>
            <div class="landlord">房东 : {{item.appMan2}}</div>
            <div class="date">申请时间 : {{formatDate(item.procInsCreated)}}</div>
            <div class="operate">
              <button class="btn">接收</button>
            </div>
          </div>
        </template>
      </load-more-cell>
    </div>
  </div>
</template>
<script>
import headerWrapper from "@/components/layout/header-back";

export default {
  components: {
    headerWrapper
  },
  data() {
    return {
      title: "待接收任务列表",
      dataUrl: process.env.ROOT_API + "task/getTaskList?actType=5",
      pager: {
        curPage: 1,
        pageSize: 2
      },
      allLoaded: false
    };
  },
  methods: {
    back() {
      this.$store.commit("toggleTabBarActive", { tabBarActive: "/home" });
    },
    loadTop() {
      // alert('下啦')
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
    }
  }
};
</script>
<style lang="scss" scoped>
.loadmore-wrapper {
  padding: 30px 25px;
  .cell {
    position: relative;
    padding: 15px;
    margin-bottom: 60px;
    font-size: 1.5em;
    background: rgba(242, 242, 242, 1);
    color: #333;
    .status {
      position: absolute;
      right: 0;
      top: 0;
      color: red;
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
        padding: 3px 10px;
        background: rgba(153, 51, 204, 1);
        font-size: 1.2em;
        color: #fff;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
