<template>
  <div class="form-wrapper">
    <div class="cell">
      <div class="form-item">
        <label class="label">申请人 :</label>
        <input class="inp" type="text" v-model="form.name">
      </div>
      <div class="operate">
        <button class="btn">修改</button>
      </div>
    </div>
    <div class="cell">
      <div class="form-item">
        <label class="label">身份证 :</label>
        <input class="inp" type="text" v-model="form.cardID">
      </div>
    </div>
    <div class="cell">
      <div class="form-item">
        <label class="label">房东 :</label>
        <input class="inp" type="text" v-model="form.headname">
      </div>
      <div class="operate">
        <button class="btn">修改</button>
      </div>
    </div>
    <div class="cell">
      <div class="form-item">
        <label class="label">身份证 :</label>
        <input class="inp" type="text" v-model="form.headcardid">
      </div>
    </div>
    <div class="cell">
      <div class="form-item">
        <label class="label">房屋地址 :</label>
        <input class="inp" type="text" v-model="form.roomlocation">
      </div>
      <div class="operate">
        <button class="btn">修改</button>
      </div>
    </div>
    <div class="cell">
      <div class="form-item">
        <label class="label">房产证 :</label>
        <input class="inp" type="text" v-model="casenum">
      </div>
    </div>
    <div class="cell">
      <div class="form-item">
        <label class="label">是否合租 :</label>
        <label class="radio">
          <input type="radio" v-model="form.isrent" value="1"> 是
        </label>
        <label class="radio">
          <input type="radio" v-model="form.isrent" value="0"> 否
        </label>
      </div>
    </div>

    <div class="submit">
      <button class="btn">保存</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      casenum: this.$route.query.serialNO,
      appMan1ID: "",
      appMan2ID: "",
      oldHouseID: "",
      newHouseID: "",
      form: {
        name: "",
        cardID: "",
        headname: "",
        headcardid: "",
        roomlocation: "",
        isrent: ""
      }
    };
  },
  created() {
    this.isApply();
  },
  watch: {
    $route() {
      this.isApply();
    }
  },
  methods: {
    // 判断是否已经申请过
    isApply() {
      this.$http
        .post(
          process.env.ROOT_API + "recandappform/getRecByCasenum",
          { casenum: this.$route.query.serialNO },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);

            if (res.success) {
              if (res.data) {
                // console.log(res.data);
                this.appMan1ID = res.data.appMan1ID;
                this.appMan2ID = res.data.appMan2ID;
                this.oldHouseID = res.data.houseID;
                this.newHouseID = res.data.houseID;

                this.form.name = res.data.appMan1;
                this.form.cardID = res.data.appMan1CardID;
                this.form.headname = res.data.appMan2;
                this.form.headcardid = res.data.appMan2CardID;
                this.form.roomlocation = res.data.houseLocation;
                this.form.isrent = res.data.isReat;
              }
            }
          },
          err => {
            this.$message.error("获取数据失败！");
            throw new Error(err);
          }
        );
    }
  }
};
</script>
<style>
[v-cloak] {
  display: none;
}
</style>

<style lang="scss" scoped>
.form-wrapper {
  padding: 10px;
  .cell {
    display: flex;
    justify-content: space-between;
    padding: 20px 0 10px 0;
    border-bottom: 1px solid rgba(226, 226, 226, 1);
    .form-item {
      display: flex;
      align-items: center;
      .label {
        display: inline-block;
        width: 5em;
        font-size: 1.3em;
        color: #ccc;
      }
      .inp {
        display: inline-block;
        width: 8.4em;
        border: none;
        outline: none;
        font-size: 1.4em;
        color: #333;
      }
      .radio {
        margin-right: 2em;
        display: flex;
        align-items: center;
        input[type="radio"] {
          margin: 0;
        }
      }
    }
    .operate {
      .btn {
        padding: 2px 10px;
        background-color: rgba(131, 81, 208, 1);
        color: #fff;
        border: none;
        outline: none;
      }
    }
  }
  .submit {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
    .btn {
      padding: 4px 12px;
      font-size: 1.1em;
      background-color: rgba(131, 81, 208, 1);
      color: #fff;
      border: none;
      outline: none;
    }
  }
}
</style>
