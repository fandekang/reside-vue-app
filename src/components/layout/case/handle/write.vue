<template>
  <div class="main">
    <mt-navbar class="nav-wrapper" v-model="selected">
      <mt-tab-item id="form">申请表</mt-tab-item>
      <mt-tab-item id="material">收件材料</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="form">
        <application-form></application-form>
      </mt-tab-container-item>
      <mt-tab-container-item id="material">
        <receipt-material></receipt-material>
      </mt-tab-container-item>
    </mt-tab-container>
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
      swipeable: true,
      isVisible: true,
      selected: "form"
    };
  },
  methods: {
    fullPopUpBackEvent() {
      alert(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 5em;
  padding: 2.5em;
  .nav-wrapper {
    margin: 0 auto;
    width: 45%;
    box-shadow: 3px 3px 3px rgba(226, 226, 226, 1);
    .mint-tab-item {
      padding: 8px 0;
      background-color: rgba(242, 242, 242, 1);
      border: none;
    }
    .is-selected {
      background-color: rgba(153, 51, 204, 1);
      color: #fff;
    }
  }
}
</style>
