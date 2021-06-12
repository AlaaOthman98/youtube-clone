import Vue from "vue";
import VueRouter from "vue-router";

import SearchResultsComponent from "@/views/SearchResults";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/search",
  },
  {
    path: "/search",
    component: SearchResultsComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
