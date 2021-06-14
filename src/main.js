import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import InfiniteLoading from "vue-infinite-loading";

import "@/styles/_global.scss";

Vue.config.productionTip = false;
Vue.use(InfiniteLoading, {});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
