<template>
  <div>playlist</div>
</template>

<script>
import { getPlaylistItems } from "@/services/playlist-items.service";
import { getVideoById } from "@/services/video.service";
import RatingButton from "@/components/RatingButton.vue";

export default {
  data() {
    return {
      loading: false,
      playlistId: "",
      playlistVideosList: [],
      currentlyPlayingVideo: {},
      showDescription: false,
      nextPageToken: "",
      currentRating: "",
    };
  },
  methods: {
    getPlaylistVideos(apiItems) {
      return Promise.all(
        apiItems.map(async (res) => {
          return await getVideoById(res.snippet.resourceId.videoId);
        })
      );
    },
    async initializePlaylistData(playlistId) {
      this.loading = true;

      const apiPlaylistItems = await getPlaylistItems(playlistId);
      this.nextPageToken = apiPlaylistItems.nextPageToken;

      if (apiPlaylistItems.items.length) {
        this.playlistVideosList = await this.getPlaylistVideos(
          apiPlaylistItems.items
        );

        this.currentlyPlayingVideo = this.playlistVideosList[0];
      }
      this.loading = false;
    },
    showDescriptionToggle() {
      this.showDescription = !this.showDescription;
    },
    onRateClick(rateType) {
      // Rating Api should be called here depending on which rate is clicked

      this.currentRating = this.currentRating === rateType ? "" : rateType;
    },
    changePlayedVideo(video) {
      this.currentlyPlayingVideo = video;
      window.scrollTo(0, 0);
    },
    getFormattedViews(views) {
      return Number(views).toLocaleString();
    },
    async infiniteHandler($state) {
      if (this.nextPageToken) {
        const nextVideosResult = await getPlaylistItems(
          this.playlistId,
          this.nextPageToken
        );
        const nextVideosResultList = await this.getPlaylistVideos(
          nextVideosResult.items
        );
        this.nextPageToken = nextVideosResult.nextPageToken;

        this.playlistVideosList.push(...nextVideosResultList);

        $state.loaded();
      } else {
        $state.loaded();
        $state.complete();
      }
    },
  },
  computed: {
    viewsNumber() {
      return Number(this.currentlyPlayingVideo.viewCount).toLocaleString();
    },
    likesNumber() {
      return Number(this.currentlyPlayingVideo.likeCount).toLocaleString();
    },
    dislikesNumber() {
      return Number(this.currentlyPlayingVideo.dislikeCount).toLocaleString();
    },
  },
  components: {
    RatingButton,
  },
  async created() {
    this.playlistId = this.$route.params.playlistId;

    this.initializePlaylistData(this.playlistId);
  },
  async beforeRouteUpdate(to, from, next) {
    this.playlistId = to.params.playlistId;

    this.initializePlaylistData(this.playlistId);

    next();
  },
};
</script>

<style></style>
