<template>
  <div>
    <div class="main">
      <div class="info-list">
        <div class="info">
          <div class="name">选择的租客</div>
          <div class="name">姓名 : {{appMan}}</div>
          <div class="cardID">身份证号 : {{cardID}}</div>
        </div>
        <div class="info">
          <div class="name">选择的房主</div>
          <div class="name">姓名 : {{appMan2}}</div>
          <div class="cardID">身份证号 : {{headcardid}}</div>
        </div>
        <div class="info">
          <div class="name">选择的房屋</div>
          <div class="name">面积（平方米）: {{houseArea}}</div>
          <div class="name">坐落 : {{houseLocation}}</div>
          <div class="cardID">房产证号 : {{houseCardNum}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      procID: "",
      houseID: "",
      personID: {
        proposerID: "",
        houseOwnerID: ""
      },
      appMan: "",
      cardID: "",
      appMan2: "",
      headcardid: "",
      houseLocation: "",
      houseCardNum: "",
      houseArea: ""
    };
  },
  computed: {
    createCaseData: {
      get() {
        return this.$store.state.createCase.createCaseData;
      },
      set(val) {
        this.$store.commit("changeCreateCaseData", {
          createCaseData: val
        });
      }
    }
  },
  mounted() {
    // alert(JSON.stringify(this.createCaseData));
    this.procID = this.createCaseData.task.procID;
    this.houseID = this.createCaseData.room[0].house_id;
    this.personID.proposerID = this.createCaseData.buyer[0].person_id;
    this.personID.houseOwnerID = this.createCaseData.seller[0].person_id;

    this.appMan = this.createCaseData.buyer[0].person_name;
    this.cardID = this.createCaseData.buyer[0].person_card_id;

    this.appMan2 = this.createCaseData.seller[0].person_name;
    this.headcardid = this.createCaseData.seller[0].person_card_id;

    this.houseLocation = this.createCaseData.room[0].house_location;
    this.houseCardNum = this.createCaseData.room[0].house_card_num;
    this.houseArea = this.createCaseData.room[0].house_area;
  },
  methods: {
    finish() {
      let obj = {
        procID: this.procID,
        houseID: this.houseID,
        caseType: "1",
        isRent: "1",
        personID: {
          proposerID: this.personID.proposerID,
          houseOwnerID: this.personID.houseOwnerID
        },
        appMan: this.appMan,
        appMan2: this.appMan2,
        houseLocation: this.houseLocation
      };
      //   console.log(obj);
      obj = JSON.stringify(obj);
      this.$http
        .post(
          process.env.ROOT_API + "task/createTask",
          { creatTaskInfo: obj },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.$toast("创建案件成功");
              this.$store.commit('toggleTopMenuPopVisible', {topMenuPopVisible: true})
            } else {
              this.$toast("创建案件失败");
            }
          },
          err => {
            this.$toast("创建案件失败");
            throw new Error(err);
          }
        );
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  .info-list {
    // padding: 10px 0;
    .info {
      margin-top: 8px;
      padding: 4px 10px;
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
</style>
