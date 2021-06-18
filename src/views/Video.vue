<template>
  <div>video</div>
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

<style lang="scss" scoped></style>
