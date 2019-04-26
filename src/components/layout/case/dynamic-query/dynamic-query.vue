<template>
  <div class="qwer">
    <mt-popup class="dynamic-wrapper" v-model="visible" position="right">
      <div class="wrapper123">
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </div>
    </mt-popup>

    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>
    <h1>动态查询</h1>

    <button @click="query">查询</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
        visible: false
    };
  },
  created() {},
  methods: {
    query() {
        this.visible = true
    }
  }
};
</script>
<style>
.qwer .v-modal {
    z-index: 10000 !important;
}
.dynamic-wrapper {
    width: 80%;
    height: 100%;
    z-index: 10000;
}
.wrapper123 {
    width: 80%;
    height: 100%;
}
</style>
<style lang="scss" scoped>

</style>
