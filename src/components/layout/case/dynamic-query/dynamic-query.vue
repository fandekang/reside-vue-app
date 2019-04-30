<template>
  <div class="dynamic-wrapper">
    <button class="query-btn" @click="query">筛查</button>
    <!-- <load-more-cell
      ref="loadMore"
      :pager="pager"
      :dataJson="dataJson"
      :auto-fill="false"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded.sync="allLoaded"
    >
      <template slot-scope="scope">
        <div class="cell" v-for="(item, index) in scope.source" :key="index">
          <div v-for="(val, k) in item" :key="k" class="cell-item">{{k}} ： {{val}}</div>
        </div>
      </template>
    </load-more-cell> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataJson: null,
      pager: {
        curPage: 1,
        pageSize: 3
      },
      allLoaded: false,
      resData: null
    };
  },
  created() {
    this.$http
      .get(process.env.ROOT_API + "query/trendsAllQuery?queryStructID=2")
      .then(
        res => {
          this.resData = res.body.data[0];
          this.resolveDataJson();
        },
        err => {
          throw new Error(err);
        }
      );
  },
  methods: {
    query() {
      this.$store.commit("toggleScreeningVisible", { screeningVisible: true });
    },
    loadTop() {
      this.pager.curPage = 1;
      this.$refs.loadMore.onTopLoaded();
    },
    loadBottom() {
      this.$refs.loadMore.onBottomLoaded();
    },
    resolveDataJson() {
      // console.log(this.resData);
      let jsonArr = [];
      this.resData.rowData.forEach(row => {
        let obj = {};

        this.resData.columnNameAliasList.forEach((item, index) => {
          row.forEach((col, ci) => {
            if (index == ci) {
              item = item.split(".").join("");
              obj[item] = col;
            }
          });
        });

        jsonArr.push(obj);
      });
      //   console.log(jsonArr);
      this.dataJson = jsonArr;
      // console.log(this.dataJson);
    }
  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
.dynamic-wrapper {
  padding: 60px 20px;
  .query-btn {
    display: inline-block;
    margin: 15px 0;
    padding: 5px 20px;
    background-color: rgba(131, 81, 208, 1);
    color: #fff;
    border: none;
    outline: none;
  }
}
.cell {
  padding: 15px;
  margin-bottom: 30px;
  font-size: 1.5em;
  background: rgba(242, 242, 242, 1);
  color: #333;
  .cell-item {
    margin-bottom: 8px;
  }
}
</style>
