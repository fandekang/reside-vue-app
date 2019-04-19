<template>
  <header class="header-wrapper">
    <div class="back" @click="back">
      <i class="fa fa-angle-left"></i>
    </div>
    <div class="title">{{title}}</div>
  </header>
</template>
<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
    };
  },
  methods: {
      back() {
          this.$emit('back')
      }
  }
};
</script>
<style lang="scss" scoped>
.header-wrapper {
  position: relative;
  height: 60px;
  line-height: 60px;
  font-size: 2em;
  font-weight: 700;
  background: rgba(242, 242, 242, 1);
  border-bottom: 1px solid rgba(226, 226, 226, 1);
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 15px;
    width: 30px;
    padding: 0 10px;
    height: 100%;
    i {
      font-size: 3.33em;
    }
  }
  .title {
    width: 100%;
    height: 100%;
    text-align: center;
  }
}
</style>
