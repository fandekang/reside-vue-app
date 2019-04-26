<template>
  <div class="step">
    <header class="header">
      <span class="search">
        <input type="text" class="input" ref="inp" v-model="searchVal" placeholder="请输入姓名或身份证号">
        <button class="btn" @click="search">搜索</button>
      </span>
    </header>

    <div class="main">
      <load-more-cell
        v-if="url"
        ref="loadMore"
        class="info-list"
        :data-url="url"
        :pager="pager"
        :remote-param="remoteParam"
        :auto-fill="false"
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded.sync="allLoaded"
      >
        <template slot-scope="scope">
          <div
            class="info"
            v-for="(item, index) in scope.source"
            :key="index"
            @click="selectInfo(index, item)"
          >
            <div class="name">姓名 : {{item.person_name}}</div>
            <div class="age">年龄 : {{item.person_age}}</div>
            <div class="sex">性别 : {{item.person_sex}}</div>
            <div class="cardID">身份证 : {{item.person_card_id}}</div>
          </div>
        </template>
      </load-more-cell>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchVal: "",
      url: "",
      pager: {
        curPage: 1,
        pageSize: 2
      },
      remoteParam: {},
      allLoaded: false
    };
  },
  mounted() {
    this.$refs.inp.focus();
  },
  methods: {
    loadTop() {
      // alert("下拉");
      this.pager.curPage = 1
      this.$refs.loadMore.onTopLoaded();
    },
    loadBottom() {
      // alert("上啦");
      this.$refs.loadMore.onBottomLoaded();
    },
    search() {
      if (this.searchVal.replace(/^\s+|\s+$/g, "") != "") {
        let selectInfo = {};
        selectInfo.searchVal = this.searchVal;
        selectInfo = JSON.stringify(selectInfo);

        this.url =
          process.env.ROOT_API + "guide/getPersonInfo?dt=" + Math.random();
        this.pager.curPage = 1;
        this.remoteParam.selectInfo = selectInfo;
      } else {
        this.$toast({
          message: "请输入要查询的值",
          iconClass: "fa fa-exclamation"
        });
      }
    },
    selectInfo(i, item) {
      this.$emit("select", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.step {
  padding: 0 20px;
  margin-top: 70px;
  .header {
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
    .add {
      padding: 0 1.5em;
      height: 100%;
      font-size: 1.1em;
      border: none;
      outline: none;
      background-color: rgba(131, 81, 208, 1);
      color: #fff;
    }
    .search {
      display: flex;
      height: 100%;
      border-radius: 30px;
      overflow: hidden;
      .input {
        display: inline-block;
        width: 13em;
        height: 100%;
        text-indent: 8px;
        font-size: 1.1em;
        border: none;
        outline: none;
        background-color: rgba(226, 226, 226, 1);
      }
      .input::placeholder {
        font-size: 10px;
      }
      .input:focus {
        background-color: rgba(226, 226, 226, 0.6);
      }
      .btn {
        display: inline-block;
        padding: 0 5px 0 5px;
        height: 100%;
        font-size: 1.1em;
        border: none;
        outline: none;
        background-color: rgba(131, 81, 208, 1);
        color: #fff;
      }
    }
  }
  .main {
    .info-list {
      padding: 10px 0;
      .info {
        margin-top: 1em;
        padding: 1em;
        background-color: rgba(242, 242, 242, 1);
        color: #333;
        font-size: 1.4em;
        .name,
        .age,
        .sex,
        .cardID {
          margin: 5px 0;
        }
      }
      .active {
        background-color: rgba(131, 81, 208, 1);
      }
    }
  }
}
</style>
