<template>
  <div>
    <div class="video-player" v-html="videoDetails.embedHtml"></div>

    <div class="video-info">
      <div class="video-info__heading">
        <h3 class="video-info__heading__title">{{ videoDetails.title }}</h3>
        <span
          class="video-info__heading__description-toggle"
          @click="showDescriptionToggle"
        ></span>
      </div>

      <div class="video-info__channel-and-views">
        <router-link
          :to="{
            path: 'channel',
            query: { channelId: videoDetails.channelId },
          }"
        >
          <h4 class="channel-title">
            {{ videoDetails.channelTitle }}
          </h4>
        </router-link>

        <span class="views-count">{{ viewsNumber }} views</span>
      </div>
      <div class="video-info__rating">
        <div class="video-info__rating__likes" @click="rateVideo($event)">
          <inline-svg
            style="width: 1.75rem; margin-right: 0.5rem"
            :src="require('../assets/svg/like.svg')"
            :fill="likeIconColor"
          ></inline-svg>

          {{ videoDetails.likeCount }}
        </div>

        <div class="video-info__rating__dislikes" @click="rateVideo($event)">
          <inline-svg
            style="width: 1.75rem; margin-right: 0.5rem"
            :src="require('../assets/svg/dislike.svg')"
            :fill="dislikeIconColor"
          ></inline-svg>
          {{ videoDetails.dislikeCount }}
        </div>
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
    </div>

    <div class="related-videos"></div>
  </div>
</template>

<script>
import { getVideoById } from "@/services/video.service";

const greyColor = "#979696";
const blueColor = "#3ea6ff";

export default {
  name: "Video",
  data() {
    return {
      videoId: "",
      videoDetails: {},
      noVideos: false,
      likeIconColor: greyColor,
      dislikeIconColor: greyColor,
      showDescription: false,
    };
  },
  computed: {
    viewsNumber() {
      return Number(this.videoDetails.viewCount).toLocaleString();
    },
  },
  methods: {
    rateVideo(event) {
      this.likeIconColor = greyColor;
      this.dislikeIconColor = greyColor;

      const clickedEl = event.target;
      const chosenRate = clickedEl.classList.contains(
        "video-info__rating__likes"
      )
        ? "like"
        : "dislike";
      const currentlyActive = clickedEl.classList.contains("active");

      switch (chosenRate) {
        case "like":
          this.likeIconColor = currentlyActive ? greyColor : blueColor;
          break;
        case "dislike":
          this.dislikeIconColor = currentlyActive ? greyColor : blueColor;
          break;
      }

      document.querySelectorAll(".active").forEach((el) => {
        if (el !== clickedEl) el.classList.remove("active");
      });

      clickedEl.classList.toggle("active");
    },
    showDescriptionToggle(event) {
      event.target.classList.toggle("open");
      this.showDescription = !this.showDescription;
    },
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
    clear: both;
    margin-top: 3rem;
    font-size: 14px;
  }
}
</style>
