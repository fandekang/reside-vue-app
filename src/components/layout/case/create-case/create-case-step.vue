<template>
  <div class="create-case-step-container">
    <div class="steps-wrapper">
      <div
        class="step"
        v-for="(step, index) in steps"
        :class="stepIndex === index ? 'active' : ''"
        :key="index"
      >{{step}}</div>
    </div>

    <div class="steps-container">
      <router-view ref="step"></router-view>
    </div>

    <div class="btns-wrapper">
      <div class="btn disabled" ref="prev" @click="prev">上一步</div>
      <div class="btn" ref="next" @click="next">下一步</div>
      <div class="btn hidden" ref="finish" @click="finish">创建案件</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stepIndex: 0,
      steps: ["选择租客", "选择房主", "选择房屋", "创建汇总"],
      selRow: null
    };
  },
  created() {
    // console.log(this.$route)
    // console.log(this.$router)
    // this.$router.replace({path: this.createCaseData.pathArr[this.stepIndex]})
    // this.$router.push(this.createCaseData.pathArr[this.stepIndex]);
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
  methods: {
    prev() {
      if (this.stepIndex) {
        this.$refs.prev.className = "btn";
        this.$refs.next.className = "btn";
        this.$refs.finish.className = "btn hidden";
        this.stepIndex--;
        this.$router.push(this.createCaseData.pathArr[this.stepIndex]);
      }
      if (this.stepIndex == 0) {
        this.$refs.prev.className = "btn disabled";
        this.$refs.next.className = "btn";
      }
    },
    next() {
      let str = this.$refs.step.next();
      // console.log(str);
      if (str.indexOf("{") < 0 && str.indexOf("[") < 0) {
        this.$toast(str);
      } else {
        this.$store.commit("changeCreateCaseData", {
          createCaseData: JSON.parse(str)
        });
        if (this.stepIndex < 3) {
          this.$refs.prev.className = "btn";
          this.stepIndex++;
          this.$router.push(this.createCaseData.pathArr[this.stepIndex]);
        }
        if (this.stepIndex == 3) {
          this.$refs.next.className = "btn hidden";
          this.$refs.finish.className = "btn";
        }
      }
    },
    finish() {
      this.$refs.step.finish();
    }
  }
};
</script>
<style lang="scss" scoped>
.create-case-step-container {
  padding: 2em;
  .steps-wrapper {
    display: flex;
    box-shadow: 3px 3px 3px rgba(226, 226, 226, 1);
    background-color: rgba(242, 242, 242, 1);
    .step {
      flex: 1;
      padding: 6px 0;
      text-align: center;
      font-size: 1.1em;
      color: #333;
    }
    .active {
      background-color: rgba(153, 51, 204, 1);
      color: #fff;
    }
  }
  .steps-container {
    margin-top: 2em;
  }
  .btns-wrapper {
    .btn {
      margin-top: 10px;
      width: 100%;
      height: 3.5em;
      text-align: center;
      line-height: 3.5em;
      font-size: 1.2em;
      background-color: rgba(131, 81, 208, 1);
      color: #fff;
    }
    .disabled {
      background-color: rgba(226, 226, 226, 1);
      color: #333;
    }
    .hidden {
      display: none;
    }
  }
}
</style>
