<template>
  <div>
    <div class="video-player" v-html="videoDetails.embedHtml"></div>
  </div>
</template>

<script>
import { getVideoById } from "@/services/video.service";

export default {
  name: "Video",
  data() {
    return {
      videoId: "",
      videoDetails: {},
      noVideos: false,
    };
  },
  async created() {
    this.videoId = this.$route.query.videoId;

    if (this.videoId) {
      this.videoDetails = await getVideoById(this.videoId);
    } else {
      this.noVideos = true;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    this.videoId = to.query.videoId;

    if (this.videoId) {
      this.videoDetails = await getVideoById(this.videoId);
    } else {
      this.noVideos = true;
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.video-player {
  position: relative;
  width: 100%;
  padding-bottom: 50vh;
  height: 0;
}

</style>
