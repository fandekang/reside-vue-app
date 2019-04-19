<template>
  <div>
    <header class="header">
      <img src="../../assets/images/logo.png">
    </header>
    <section class="form">
      <div class="cell">
        <label class="label">账号 :</label>
        <input type="text" class="inp" v-model="username" placeholder="请输入您的账号">
      </div>
      <div class="cell">
        <label class="label">密码 :</label>
        <input type="text" class="inp" v-model="password" placeholder="请输入您的密码">
      </div>
    </section>
    <div class="login-btn" @click="login">登录</div>
  </div>
</template>
<script>
// import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$http
        .get(
          process.env.ROOT_API +
            "login/authentication?loginname=" +
            this.username +
            "&password=" +
            this.password
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);

            if (res.success) {
              this.$toast({message: '登录成功'})
              this.$store.commit("toggleLoginVisible", { loginVisible: false });
              this.$router.push({path: '/'})
            } else {
              this.$toast({message: '登录失败', iconClass: 'fa fa-exclamation'})
            }
          },
          err => {
            this.$toast({message: '登录失败', iconClass: 'fa fa-exclamation'})
            throw new Error(err);
          }
        );
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: rgba(242, 242, 242, 1);
  border-bottom: 1px solid rgba(226, 226, 226, 1);
}

.login-btn {
  margin: 20px 10px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 1.3em;
  background: rgba(131, 81, 208, 1);
  color: #fff;
}
.form {
  .cell {
    margin: 5px 10px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(226, 226, 226, 1);
    .label {
      font-size: 13px;
      color: #ccc;
    }
    .inp {
      margin-left: 5px;
      border: none;
      outline: none;
    }
  }
}
</style>
