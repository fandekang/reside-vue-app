<template>
  <div class="material-dialog">
    <div class="form-wrapper">
      <div class="cell">
        <label class="label">材料编号 :</label>
        <input type="text" class="inp" v-model="datano" autofocus>
      </div>
      <div class="cell">
        <label class="label">材料名称 :</label>
        <input type="text" class="inp" v-model="dataname">
      </div>
      <!-- <div class="cell">
        <label class="label">起始页 :</label>
        <input type="text" class="inp" v-model="start">
      </div>-->
      <div class="cell">
        <label class="label">是否原件 :</label>
        <label class="radio">
          <input type="radio" v-model="datatype" value="1"> 是
        </label>
        <label class="radio">
          <input type="radio" v-model="datatype" value="2"> 否
        </label>
      </div>
    </div>
    <div class="submit">
      <button class="btn" @click="submit">保存</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datatype: "1",
      datano: "",
      dataname: ""
    };
  },
  created() {
    if (this.materialEdit) {
      this.getData();
    }
  },
  methods: {
    // 获得页面数据
    getData() {
      this.$http
        .post(
          process.env.ROOT_API + "recdata/judgeRecdata",
          { id: this.$store.state.main.materialItemID },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.datano = res.data.datano;
              this.dataname = res.data.dataname;
              this.datatype = res.data.datatype;
            }
          },
          err => {
            throw new Error(err);
          }
        );
    },
    submit() {
      if (this.materialEdit) {
        let param = {
          id: this.$store.state.main.materialItemID,
          casenum: this.$route.query.serialNO,
          datano: this.datano,
          dataname: this.dataname,
          datatype: this.datatype,
          statue: null,
          // storepath: ""
        };
        // console.log(param);
        param = JSON.stringify(param);
        this.$http
          .post(
            process.env.ROOT_API + "recdata/updateObj",
            { updateRecString: param },
            { emulateJSON: true }
          )
          .then(
            res => {
              res = JSON.parse(res.bodyText);
              if (res.success) {
                this.$toast({ message: "修改成功" });
                this.$store.commit("toggleMaterialDialogVisible", {
                  materialDialogVisible: false
                });
                this.$store.commit("changeMaterialURL", {
                  materialURL:
                    process.env.ROOT_API +
                    "recdata/getRecdataList?serialNO=" +
                    this.$route.query.serialNO +
                    "&dt=" +
                    Math.random()
                });
                this.materialEdit = false;
              } else {
                this.$toast("修改失败");
              }
            },
            err => {
              this.$toast("修改失败");
              throw new Error(err);
            }
          );
      } else {
        let param = {
          id: null,
          casenum: this.$route.query.serialNO,
          datano: this.datano,
          dataname: this.dataname,
          datatype: this.datatype,
          statue: null,
          storepath: ""
        };
        // console.log(param);
        param = JSON.stringify(param);
        this.$http
          .post(
            process.env.ROOT_API + "recdata/addObj",
            { addRecString: param },
            { emulateJSON: true }
          )
          .then(
            res => {
              res = JSON.parse(res.bodyText);
              if (res.success) {
                this.$toast({ message: "提交成功" });
                this.$store.commit("toggleMaterialDialogVisible", {
                  materialDialogVisible: false
                });
                this.$store.commit("changeMaterialURL", {
                  materialURL:
                    process.env.ROOT_API +
                    "recdata/getRecdataList?serialNO=" +
                    this.$route.query.serialNO +
                    "&dt=" +
                    Math.random()
                });
              } else {
                this.$toast("提交失败");
              }
            },
            err => {
              this.$toast("提交失败");
              throw new Error(err);
            }
          );
      }
    }
  },
  computed: {
    materialEdit: {
      get() {
        return this.$store.state.main.materialEdit;
      },
      set(val) {
        this.$store.commit("toggleMaterialEdit", { materialEdit: val });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.material-dialog {
  margin-top: 5em;
  padding: 0 2.5em;
  .form-wrapper {
    .cell {
      display: flex;
      align-items: center;
      padding: 20px 0 10px 0;
      border-bottom: 1px solid rgba(226, 226, 226, 1);
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
