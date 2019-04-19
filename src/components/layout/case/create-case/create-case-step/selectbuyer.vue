<template>
  <div class="step">
    <header class="header">
      <button class="add" @click="add">添加</button>
      <span class="search">
        <input type="text" class="input" v-model="searchVal" placeholder="请输入姓名或身份证号">
        <button class="btn" @click="search">搜索</button>
      </span>
    </header>

    <div class="main">
      <div class="info-list" v-if="infoList.length">
        <div
          class="info"
          :class="index1 == index ? 'active' : ''"
          v-for="(item, index) in infoList"
          :key="index"
          @click="selectInfo(index, item)"
          :ref="('info' + index)"
        >
          <div class="name">姓名 : {{item.person_name}}</div>
          <div class="age">年龄 : {{item.person_age}}</div>
          <div class="sex">性别 : {{item.person_sex}}</div>
          <div class="cardID">身份证 : {{item.person_card_id}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index1: null,
      searchVal: "",
      infoList: [],
      selectList: []
    };
  },
  methods: {
    search() {
      this.index1 = null;
      if (this.searchVal.replace(/^\s+|\s+$/g, "") != "") {
        let selectInfo = {};
        selectInfo.searchVal = this.searchVal;
        selectInfo = JSON.stringify(selectInfo);

        this.$http
          .post(
            process.env.ROOT_API + "guide/getPersonInfo?curPage=1&pageSize=5",
            { selectInfo: selectInfo },
            { emulateJSON: true }
          )
          .then(
            res => {
              res = JSON.parse(res.bodyText);
              if (res.success) {
                this.infoList = res.data.list;
              } else {
                this.$toast("查询失败");
              }
            },
            err => {
              this.$toast("查询失败");
              throw new Error(err);
            }
          );
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

      //   let info = "info" + i;
      //   console.log(this.$refs);
      //   this.$refs[info][0].parentNode.childNodes.forEach(item => {
      //     item.className = "info";
      //   });
      //   this.$refs[info][0].className = "info active";
      //   this.$refs[info][0].parentNode.childNodes.forEach(item => {
      //     item.className = "info";
      //   });
    },
    add() {
      if (this.selectList.length) {
        this.index1 = null;
        this.infoList = this.selectList;

        this.$emit('selectedData', this.selectList[0])
      } else {
        this.$toast("未选择一条信息");
      }
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
