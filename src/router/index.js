import Vue from "vue";
import VueRouter from "vue-router";

import SearchResultsComponent from "@/views/SearchResults";
import ChannelComponent from "@/views/Channel";

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
  {
    path: "/channel",
    component: ChannelComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
