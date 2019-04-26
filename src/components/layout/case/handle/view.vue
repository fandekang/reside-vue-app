<template>
  <div class="container">
    <div class="main">
      <div class="nav-wrapper">
        <router-link :to="viewApply" class="nav-item" active-class="activeClass">申请表</router-link>
        <router-link :to="viewMaterial" class="nav-item" active-class="activeClass">收件材料</router-link>
        <router-link :to="viewMealCard" class="nav-item" active-class="activeClass">缮证信息</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  data() {
    return {
      viewApply:
        "/viewApply?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO,
      viewMaterial:
        "/viewMaterial?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO,
      viewMealCard:
        "/viewMealCard?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO,
      swipeable: true
    };
  },
  created() {},
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

      this.viewMealCard =
        "/viewMealCard?actID=" +
        newVal.query.actID +
        "&serialNO=" +
        newVal.query.serialNO;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.container {
  padding: 2.5em;
  .main {
    display: flex;
    justify-content: center;
    margin-top: 5em;
    .nav-wrapper {
      background-color: rgba(242, 242, 242, 1);
      box-shadow: 3px 3px 3px rgba(226, 226, 226, 1);
      .nav-item {
        display: inline-block;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        text-decoration: none;
        color: #333;
      }
      .activeClass {
        background-color: rgba(153, 51, 204, 1);
        color: #fff;
      }
    }
  }
}
</style>
