<template>
  <div class="main">
    <div class="nav-wrapper">
      <router-link :to="writeApply" class="nav-item" active-class="activeClass">申请表</router-link>
      <router-link :to="writeMaterial" class="nav-item" active-class="activeClass">收件材料</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
import applicationForm from "@/components/layout/case/handle/write/application-form";
import receiptMaterial from "@/components/layout/case/handle/write/receipt-material";

export default {
  components: {
    applicationForm,
    receiptMaterial
  },
  data() {
    return {
      writeApply:
        "/writeApply?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO,
      writeMaterial:
        "/writeMaterial?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO,
      swipeable: true
    };
  },
  created() {
  },
  watch: {
    $route(newVal) {
      this.writeApply =
        "/writeApply?actID=" +
        newVal.query.actID +
        "&serialNO=" +
        newVal.query.serialNO;

      this.writeMaterial =
        "/writeMaterial?actID=" +
        newVal.query.actID +
        "&serialNO=" +
        newVal.query.serialNO;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 5em;
  padding: 2.5em;
  .nav-wrapper {
    display: flex;
    margin: 0 auto;
    width: 50%;
    box-shadow: 3px 3px 3px rgba(226, 226, 226, 1);
    .nav-item {
      display: inline-block;
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: rgba(242, 242, 242, 1);
      text-decoration: none;
      color: #333;
    }
    .activeClass {
      background-color: rgba(153, 51, 204, 1);
      color: #fff;
    }
  }
}
</style>
