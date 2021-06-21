<template>
  <div>
    <BaseLoader v-if="loading" />

    <div v-else>
      <div class="video-player" v-html="currentlyPlayingVideo.embedHtml"></div>

      <div class="video-info">
        <div class="video-info__heading">
          <h3 class="video-info__heading__title">
            {{ currentlyPlayingVideo.title }}
          </h3>
          <span
            class="video-info__heading__description-toggle"
            :class="{ open: showDescription }"
            @click="showDescriptionToggle"
          ></span>
        </div>

        <div class="video-info__channel-and-views">
          <router-link
            :to="{
              name: 'channel',
              params: { channelId: currentlyPlayingVideo.channelId },
            }"
          >
            <h4 class="channel-title">
              {{ currentlyPlayingVideo.channelTitle }}
            </h4>
          </router-link>

          <span class="views-count">{{ viewsNumber }} views</span>
        </div>

        <div class="video-info__rating">
          <RatingButton
            :rateType="'like'"
            :rateNumber="+currentlyPlayingVideo.likeCount"
            :isActive="currentRating === 'like'"
            @rateClick="onRateClick($event)"
          />

          <RatingButton
            :rateType="'dislike'"
            :rateNumber="+currentlyPlayingVideo.dislikeCount"
            :isActive="currentRating === 'dislike'"
            @rateClick="onRateClick($event)"
          />
        </div>

        <div class="video-info__actions">
          <inline-svg
            style="width: 1.75rem; margin-right: 0.5rem"
            :src="require('../assets/svg/save-video.svg')"
            :fill="'#979696'"
          ></inline-svg>
          <inline-svg
            style="width: 1.75rem; margin-right: 0.5rem"
            :src="require('../assets/svg/share.svg')"
            :fill="'#979696'"
          ></inline-svg>
          <inline-svg
            style="width: 1.75rem; margin-right: 0.5rem"
            :src="require('../assets/svg/report-video.svg')"
            :fill="'#979696'"
          ></inline-svg>
        </div>

        <div class="clear-floats"></div>

        <div class="video-info__description" v-if="showDescription">
          {{ currentlyPlayingVideo.description }}
        </div>
      </div>

      <div class="playlist-videos">
        <div
          class="video-card"
          v-for="(video, $index) in playlistVideosList"
          :key="$index"
          @click="changePlayedVideo(video)"
        >
          <img
            :src="video.thumbnails.mediumUrl"
            :alt="video.title"
            class="video-card__image"
          />

          <div class="video-card__info">
            <h4>{{ video.title }}</h4>
            <span>{{ video.channelTitle }}</span>
            <span>{{ getFormattedViews(video.viewCount) }} views</span>
          </div>
        </div>

        <infinite-loading @infinite="infiniteHandler" spinner="circles">
          <div slot="no-more" style="margin: 0.5rem 0">No more results.</div>
        </infinite-loading>
      </div>
    </div>
  </div>
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

<style lang="scss" scoped>
.video-player {
  position: relative;
  width: 100%;
  padding-bottom: 50vh;
  height: 0;
}

.video-info {
  padding: 1rem;
  word-wrap: break-word;

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    &__title {
      font-weight: 400;
    }

    &__description-toggle {
      display: inline-block;
      cursor: pointer;
      border: 0.4rem solid;
      border-right-color: transparent;
      border-bottom-color: transparent;
      border-left-color: transparent;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  &__channel-and-views {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    .channel-title {
      font-weight: 400;
    }

    .views-count {
      color: $grey-500;
      margin-left: 0.5rem;
    }
  }

  &__rating {
    display: inline-flex;
    align-items: center;
    float: left;
    color: $grey-500;
    user-select: none;

    &__likes {
      display: flex;
      align-items: center;
      margin-right: 0.75rem;
      cursor: pointer;
    }

    &__dislikes {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .active {
      color: #3ea6ff;
    }
  }

  &__actions {
    display: inline-flex;
    align-items: center;
    float: right;
  }

  &__description {
    margin-top: 3rem;
    font-size: 14px;
  }
}

.clear-floats {
  clear: both;
}

.video-card {
  margin: 1rem 0.75rem;
  display: flex;
  cursor: pointer;

  &__image {
    margin-right: 0.75rem;
    width: 10rem;
  }

  &__info {
    display: flex;
    flex-direction: column;

    h4 {
      font-weight: normal;
    }

    span {
      color: $grey-500;
      font-size: 14px;
    }
  }
}
</style>
