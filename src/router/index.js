import Vue from "vue";
import VueRouter from "vue-router";

import SearchResultsComponent from "@/views/SearchResults";
import ChannelComponent from "@/views/Channel";
import VideoComponent from "@/views/Video";

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
    path: "/channel/:channelId",
    name: "channel",
    component: ChannelComponent,
  },
  {
    path: "/video",
    component: VideoComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
