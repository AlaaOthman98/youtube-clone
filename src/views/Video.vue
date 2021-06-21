<template>
  <div>
    <BaseLoader v-if="loading" />

    <div v-else>
      <div class="video-player" v-html="videoDetails.embedHtml"></div>

      <div class="video-info">
        <div class="video-info__heading">
          <h3 class="video-info__heading__title">{{ videoDetails.title }}</h3>
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
              params: { channelId: videoDetails.channelId },
            }"
          >
            <h4 class="channel-title">
              {{ videoDetails.channelTitle }}
            </h4>
          </router-link>

          <span class="views-count">{{ viewsNumber }} views</span>
        </div>

        <div class="video-info__rating">
          <RatingButton
            :rateType="'like'"
            :rateNumber="+videoDetails.likeCount"
            :isActive="currentRating === 'like'"
            @rateClick="onRateClick($event)"
          />

          <RatingButton
            :rateType="'dislike'"
            :rateNumber="+videoDetails.dislikeCount"
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

        <div class="video-info__description" v-if="showDescription">
          {{ videoDetails.description }}
        </div>
        <div class="clear-floats"></div>
      </div>

      <div class="related-videos">
        <SearchItem
          v-for="(video, $index) in relatedVideosList"
          :key="$index"
          :itemDetails="video"
        />

        <infinite-loading @infinite="infiniteHandler" spinner="circles">
          <div slot="no-more" style="margin: 0.5rem 0">No more results.</div>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideoById } from "@/services/video.service";
import { getResultsRelatedToVideo } from "@/services/search.service";

import SearchItem from "@/components/SearchItem";
import RatingButton from "../components/RatingButton.vue";

export default {
  data() {
    return {
      loading: false,
      videoId: "",
      videoDetails: {},
      noVideos: false,
      currentRating: "",
      showDescription: false,
      relatedVideosResponse: {},
      relatedVideosList: [],
    };
  },
  components: {
    SearchItem,
    RatingButton,
  },
  computed: {
    viewsNumber() {
      return Number(this.videoDetails.viewCount).toLocaleString();
    },
  },
  methods: {
    onRateClick(rateType) {
      // Rating Api should be called here depending on which rate is clicked

      this.currentRating = this.currentRating === rateType ? "" : rateType;
    },
    showDescriptionToggle() {
      this.showDescription = !this.showDescription;
    },
    getRelatedVideosList(relatedVideos) {
      return Promise.all(
        relatedVideos.items.map(async (res) => await getVideoById(res.id))
      );
    },
    async infiniteHandler($state) {
      if (this.relatedVideosResponse.nextPageToken) {
        const nextVideosResult = await getResultsRelatedToVideo(
          this.videoId,
          this.relatedVideosResponse.nextPageToken
        );
        const nextVideosResultList = await this.getRelatedVideosList(
          nextVideosResult
        );

        this.relatedVideosResponse.items.push(...nextVideosResult.items);
        this.relatedVideosResponse.nextPageToken =
          nextVideosResult.nextPageToken;
        this.relatedVideosResponse.totalResults = nextVideosResult.totalResults;
        this.relatedVideosList.push(...nextVideosResultList);

        $state.loaded();

        if (
          this.relatedVideosResponse.items?.length >=
          this.relatedVideosResponse.totalResults
        ) {
          $state.complete();
        }
      } else {
        $state.loaded();
        $state.complete();
      }
    },
  },
  async created() {
    this.videoId = this.$route.params.videoId;

    if (this.videoId) {
      this.loading = true;
      this.relatedVideosResponse = await getResultsRelatedToVideo(this.videoId);

      this.videoDetails = await getVideoById(this.videoId);
      this.relatedVideosList = await this.getRelatedVideosList(
        this.relatedVideosResponse
      );

      this.loading = false;
    } else {
      this.noVideos = true;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    this.videoId = to.params.videoId;

    if (this.videoId) {
      this.loading = true;

      this.relatedVideosResponse = await getResultsRelatedToVideo(this.videoId);

      this.videoDetails = await getVideoById(this.videoId);
      this.relatedVideosList = await this.getRelatedVideosList(
        this.relatedVideosResponse
      );

      this.loading = false;
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

.related-videos {
  margin-top: 1rem;
  border-top: 1px solid $grey-300;
  padding-top: 1rem;
}

.clear-floats {
  clear: both;
}
</style>
