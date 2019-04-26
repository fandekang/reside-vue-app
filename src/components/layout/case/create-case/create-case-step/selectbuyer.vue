<template>
  <div class="step">
    <header class="header">
      <button class="add" @click="add">添加</button>
      <span class="search">
        <input type="text" class="input" ref="inp" v-model="searchVal" placeholder="请输入姓名或身份证号">
        <button class="btn" @click="search">搜索</button>
      </span>
    </header>

    <div class="main">
      <div class="info-list" v-if="isAdd">
        <div
          class="info"
          :class="index1 == index ? 'active' : ''"
          v-for="(item, index) in infoList"
          :key="index"
          @click="selectInfo(index, item)"
        >
          <div class="name">姓名 : {{item.person_name}}</div>
          <div class="age">年龄 : {{item.person_age}}</div>
          <div class="sex">性别 : {{item.person_sex}}</div>
          <div class="cardID">身份证 : {{item.person_card_id}}</div>
        </div>
      </div>

      <load-more-cell
        v-else-if="url"
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
            :class="index1 == index ? 'active' : ''"
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
      index1: null, // 要添加的索引
      searchVal: "",
      infoList: null,
      selectList: [],
      isAdd: false, // 是否添加了数据
      url: "",
      pager: {
        curPage: 1,
        pageSize: 2
      },
      remoteParam: {},
      allLoaded: false
    };
  },
  created() {},
  mounted() {
    let createCaseData = this.$store.state.createCase.createCaseData;
    if (createCaseData.buyer) {
      this.selectList = createCaseData.buyer;
      this.infoList = this.selectList;
      this.isAdd = true;
    }
    this.$refs.inp.focus();
  },
  computed: {},
  methods: {
    loadTop() {
      // alert("下拉");
      this.$refs.loadMore.onTopLoaded();
    },
    loadBottom() {
      // alert("上啦");
      this.url =
        process.env.ROOT_API + "guide/getPersonInfo?dt=" + Math.random();
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

        this.index1 = null;
        this.isAdd = false;
        this.selectList = [];
        this.infoList = null;
      } else {
        this.$toast({
          message: "请输入要查询的值",
          iconClass: "fa fa-exclamation"
        });
      }
    },
    selectInfo(i, item) {
      let list = [];
      list.push(item);
      this.selectList = list;
      this.index1 = i;
    },
    add() {
      if (this.selectList.length) {
        if (this.isAdd) {
          this.$toast("已选择了数据， 请重新查询并选择");
        } else {
          this.index1 = null;
          this.infoList = this.selectList;
          this.isAdd = true;
        }
      } else {
        this.$toast("未选择一条信息");
      }
    },
    next() {
      let str = "";

      if (this.isAdd) {
        if (this.infoList.length) {
          let personID = this.infoList[0].person_id;
          let request = new XMLHttpRequest();
          request.open(
            "POST",
            process.env.ROOT_API + "guide/judgePersonApprove",
            false
          ); // 第三个参数 false 代表设置同步请求
          request.setRequestHeader("Accept", "application/json");
          request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
          request.send(`personID=${personID}`);

          if (request.status === 200) {
            let res = JSON.parse(request.response);
            if (res.success) {
              let obj = this.$store.state.createCase.createCaseData;
              obj.buyer = this.infoList;
              str = JSON.stringify(obj);

              this.isAdd = false;
              this.selectList = [];
              this.infoList = null;
            } else {
              str = res.errorMsg;
            }
          } else {
            str = "数据验证未通过";
          }
        } else {
          str = "未选择";
        }
      } else {
        str = "未添加";
      }

      return str;
    }
  }
};
</script>

<style lang="scss" scoped>
.step {
  .header {
    display: flex;
    justify-content: space-between;
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
