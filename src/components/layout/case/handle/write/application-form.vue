<template>
  <div>
    <mt-popup
      class="edit-applyer-dialog"
      position="left"
      v-model="applyerVisible"
      @back="applyerBack"
    >
      <edit-applyer v-if="applyerVisible" @select="selectApplyerItem"></edit-applyer>
    </mt-popup>

    <mt-popup
      class="edit-renter-dialog"
      position="left"
      v-model="renterVisible"
      @back="renterBack"
    >
      <edit-applyer v-if="renterVisible" @select="selectRenterItem"></edit-applyer>
    </mt-popup>

    <mt-popup class="edit-room-dialog" position="left" v-model="houseroomVisible" @back="roomBack">
      <edit-applyer v-if="houseroomVisible" @select="selectRoomItem"></edit-applyer>
    </mt-popup>

    <div class="form-wrapper">
      <div class="cell">
        <div class="form-item">
          <label class="label">申请人 :</label>
          <input class="inp" type="text" v-model="form.name">
        </div>
        <div class="operate">
          <button class="btn" @click="editApply">修改</button>
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
          <button class="btn" @click="editRenter">修改</button>
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
          <button class="btn" @click="editRoom">修改</button>
        </div>
      </div>
      <div class="cell">
        <div class="form-item">
          <label class="label">房产证 :</label>
          <input class="inp" type="text" v-model="form.roomCardNum">
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
        <button class="btn" @click="submit">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import editApplyer from "@/components/layout/case/handle/write/application-form/applyer";
import editRenter from "@/components/layout/case/handle/write/application-form/renter";
import editHouseRoom from "@/components/layout/case/handle/write/application-form/houseroom";

export default {
  components: {
    editApplyer,
    editRenter,
    editHouseRoom
  },
  data() {
    return {
      visible: false,
      appMan1ID: "",
      oldAppMan1ID: "",
      appMan2ID: "",
      oldAppMan2ID: "",
      oldHouseID: "",
      newHouseID: "",
      appMan1Type: "2",
      appMan2Type: "2",
      houseType: "2",
      form: {
        name: "",
        cardID: "",
        headname: "",
        headcardid: "",
        roomlocation: "",
        roomCardNum: "",
        isrent: ""
      },
      applyerVisible: false,
      renterVisible: false,
      houseroomVisible: false
    };
  },
  created() {
    this.isApply();
  },
  watch: {
    // toggleApplySelected(newVal) {
    //   if (newVal) {
    //     if (
    //       this.appMan1ID !=
    //       this.$store.state.taskProcessing.applyerSelectData.person_id
    //     ) {
    //       this.appMan1ID = this.$store.state.taskProcessing.applyerSelectData.person_id;
    //       this.form.name = this.$store.state.taskProcessing.applyerSelectData.person_name;
    //       this.form.cardID = this.$store.state.taskProcessing.applyerSelectData.person_card_id;
    //     }
    //   }
    // }
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
                this.oldAppMan1ID = res.data.appMan1ID;
                this.appMan2ID = res.data.appMan2ID;
                this.oldAppMan2ID = res.data.appMan2ID;
                this.oldHouseID = res.data.houseID;
                this.newHouseID = res.data.houseID;

                this.form.name = res.data.appMan1;
                this.form.cardID = res.data.appMan1CardID;
                this.form.headname = res.data.appMan2;
                this.form.headcardid = res.data.appMan2CardID;
                this.form.roomlocation = res.data.houseLocation;
                this.form.roomCardNum = res.data.housePropertyCardNum;
                this.form.isrent = res.data.isRent;
              }
            }
          },
          err => {
            this.$message.error("获取数据失败！");
            throw new Error(err);
          }
        );
    },
    editApply() {
      this.applyerVisible = true;
    },
    editRenter() {
      this.renterVisible = true;
    },
    editRoom() {
      this.houseroomVisible = true;
    },
    applyerBack() {
      this.applyerVisible = false;
    },
    renterBack() {
      this.renterVisible = false;
    },
    roomBack() {
      this.houseroomVisible = false;
    },
    selectApplyerItem(item) {
      console.log(item);
      this.applyerVisible = false;
      if (item.person_id != this.appMan1ID) {
        this.appMan1ID = item.person_id;
        this.form.name = item.person_name;
        this.form.cardID = item.person_card_id;
      }
    },
    selectRenterItem(item) {
      console.log(item);
      this.renterVisible = false;
      if (item.person_id != this.appMan2ID) {
        this.appMan2ID = item.person_id;
        this.form.headname = item.person_name;
        this.form.headcardid = item.person_card_id;
      }
    },
    selectRoomItem(item) {
      console.log(item);
      this.houseroomVisible = false;
      if (item.house_id != this.newHouseID) {
        this.newHouseID = item.house_id;
        this.form.roomlocation = item.house_location;
        this.form.roomCardNum = item.house_card_num;
      }
    },
    // 提交
    submit() {
      if (this.oldAppMan1ID != this.appMan1ID) {
        this.appMan1Type = "1";
      }

      if (this.oldAppMan2ID != this.appMan2ID) {
        this.appMan2Type = "1";
      }

      if (this.oldHouseID != this.newHouseID) {
        this.houseType = "1";
      }

      let param = {
        casenum: this.$route.query.serialNO,
        appMan1Type: this.appMan1Type,
        appMan2Type: this.appMan2Type,
        houseType: this.houseType,
        appMan1ID: this.appMan1ID,
        appMan2ID: this.appMan2ID,
        oldHouseID: this.oldHouseID,
        newHouseID: this.newHouseID,
        isRent: this.form.isrent
      };
      param = JSON.stringify(param);

      this.$http
        .post(
          process.env.ROOT_API + "guide/updateRecandappformInfo",
          { recandappformInfo: param },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.$toast("提交成功");
              this.$store.commit('processingURLReload')
            } else {
              this.$toast("提交失败");
            }
          },
          err => {
            throw new Error(err);
          }
        );
    }
  },
  computed: {
    // toggleApplySelected() {
    //   return this.$store.state.taskProcessing.toggleApplySelected;
    // }
  }
};
</script>
<style>
.edit-applyer-dialog,
.edit-renter-dialog,
.edit-room-dialog {
  /* top: 60px; */
  width: 80%;
  height: 100%;
}
</style>

<style lang="scss" scoped>
.form-wrapper {
  padding: 10px;
  margin-bottom: 55px;
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
