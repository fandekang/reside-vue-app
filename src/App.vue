<template>
  <div id="app">
    <!-- 登录页 -->
    <mt-popup v-model="loginVisible" class="login-wrapper" style="width: 100%; height: 100%;">
      <login v-if="loginVisible"></login>
    </mt-popup>

    <!-- 底部菜单栏响应组件 -->
    <main-wrapper v-if="!loginVisible" class="main-wrapper" v-model="active"></main-wrapper>

    <!-- 弹出框 -->
    <!-- <full-popup v-model="fullPopUpVisible" :title="'阅读文章'" @back="fullPopUpBackEvent">
      <router-view v-if="fullPopUpVisible"></router-view>
    </full-popup>-->

    <!-- 底部导航栏 -->
    <foot-wrapper class="footer-wrapper" v-model="active" :source="source"></foot-wrapper>
  </div>
</template>
<script>
import login from "@/components/user/login";
import mainWrapper from "@/components/layout/case/main";
export default {
  components: {
    login,
    mainWrapper
  },
  data() {
    return {
      // active: "home",
      source: []
      // source: [
      // { text: "首页", icon: "fa fa-home", id: "/home" },
      // { text: "办理", icon: "fa fa-level-up", id: "/processing" },
      // { text: "接收", icon: "fa fa-list-ul", id: "/receive" },
      // { text: "完成", icon: "fa fa-cog", id: "/complete" }
      // ]
    };
  },
  created() {
    this.$router.push("/");
    this.isLogin();
  },
  mounted() {
    // alert(this.loginVisible)
    if (!this.loginVisible) {
      this.getCellphoneMenu();
    }
  },
  watch: {
    active(newVal, oldval) {
      this.$http.get(process.env.ROOT_API + "login/getLoginName").then(
        res => {
          res = JSON.parse(res.bodyText);
          if (!res.success) {
            this.$toast("您还未登陆或者已经登陆超时");
            this.$store.commit("toggleLoginVisible", { loginVisible: true });
          }
        },
        err => {
          this.$toast("您还未登陆或者已经登陆超时");
          throw new Error(err);
        }
      );
    }
  },
  computed: {
    active: {
      get() {
        return this.$store.state.main.tabBarActive;
      },
      set(val) {
        this.$store.commit("toggleTabBarActive", { tabBarActive: val });
      }
    },
    loginVisible: {
      get() {
        return this.$store.state.login.loginVisible;
      },
      set(val) {
        this.$store.commit("toggleLoginVisible", { loginVisible: val });
      }
    },
    fullPopUpVisible: {
      get() {
        return this.$store.state.main.fullPopUpVisible;
      },
      set(val) {
        this.$store.commit("toggleFullPopUp", { fullPopUpVisible: val });
      }
    }
  },
  methods: {
    // 判断是否登录
    isLogin() {
      this.$http.get(process.env.ROOT_API + "login/getLoginName").then(
        res => {
          res = JSON.parse(res.bodyText);
          if (!res.success) {
            this.$toast("您还未登陆或者已经登陆超时");
            this.$store.commit("toggleLoginVisible", { loginVisible: true });
          }
        },
        err => {
          this.$toast("您还未登陆或者已经登陆超时");
          throw new Error(err);
        }
      );
    },
    // 获得底部菜单栏
    getCellphoneMenu() {
      this.$http.get(process.env.ROOT_API + "menu/getCellphoneMenu").then(
        res => {
          res = JSON.parse(res.bodyText);
          if (res.success) {
            // console.log(res)
            this.source = res.data;
          } else {
            this.$toast("请求底部菜单栏失败");
          }
        },
        err => {
          this.$toast("请求底部菜单栏失败");
          throw new Error(err);
        }
      );
    },
    // 弹出框发返回事件
    fullPopUpBackEvent() {
      alert("点击了返回");
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html,
body {
  height: 100%;
  font-size: 62.5%;
  /* -webkit-text-size-adjust: none; */
  /* transform: scale(0.84);
  -webkit-transform: scale(0.84); */
}
ul,
li {
  text-decoration: none;
}
[class^="mintui-fa"],
[class*="mintui-fa"] {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome !important;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.sy-footer-item.active {
  background-color: #8351d0 !important;
}

.sy-full-popup-title.mint-header.is-fixed {
  z-index: 5000 !important;
}

.mint-header {
  height: 60px;
  font-size: 2em;
  font-weight: 700;
  background: #f2f2f2;
  color: #000;
  border-bottom: 1px solid #e2e2e2;
}

.mint-header-title {
  overflow: visible;
}

.mint-toast {
  z-index: 5000;
}
</style>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  .main-wrapper {
    flex: 1;
  }
  .sy-app-footer {
    font-size: 1em !important;
    background: rgb(228, 228, 228) !important;
    color: #333 !important;
    z-index: 5000;
  }
}
</style>
