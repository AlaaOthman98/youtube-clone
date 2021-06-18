import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import InfiniteLoading from "vue-infinite-loading";

import "@/components/_globals";
import "@/styles/_global.scss";

// inline svg
import InlineSvg from "vue-inline-svg";
Vue.component("inline-svg", InlineSvg);

// infinite loading for pagination
Vue.config.productionTip = false;
Vue.use(InfiniteLoading, {});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
