import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import MintUIWrapper from '../MintUI-Framework'
import router from "./router";
import resource from 'vue-resource';

import 'font-awesome/css/font-awesome.css';

import login from '@/assets/js/store/login';
import main from '@/assets/js/store/main';
import createCase from '@/assets/js/store/createCase';
import taskProcessing from '@/assets/js/store/taskProcessing';
import dynamicQuery from '@/assets/js/store/dynamicQuery';

Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(MintUIWrapper);
Vue.use(resource);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    login,
    main,
    createCase,
    taskProcessing,
    dynamicQuery
  }
})

/* eslint-disable no-new */
const vm = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

// 路由 过滤器
router.beforeEach((to, from, next) => {
  vm.$http.get(process.env.ROOT_API + 'login/getLoginName')
    .then(res => {
      res = JSON.parse(res.bodyText)
      if (res.success) {
        next()
      } else {
        vm.$toast("您还未登陆或者已经登陆超时");
        store.commit('toggleLoginVisible', { login: true })
        next({ path: from.path, query: from.query });
      }
    }, err => {
      vm.$toast("您还未登陆或者已经登陆超时");
      store.commit('toggleLoginVisible', { login: true })
      next({ path: from.path, query: from.query });
      throw new Error(err)
    })
})
