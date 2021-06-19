<template>
  <div>
    <div v-if="itemDetails.type === 'channel'">
      <div class="search-card channel">
        <router-link
          :to="{
            name: 'channel',
            params: { channelId: itemDetails.id },
          }"
        >
          <img
            :src="itemDetails.thumbnails.mediumUrl"
            :alt="itemDetails.title"
            class="search-card__image"
          />
        </router-link>

        <router-link
          :to="{
            name: 'channel',
            params: { channelId: itemDetails.id },
          }"
        >
          <div class="search-card__info">
            <h4>{{ itemDetails.title }}</h4>
            <span>{{ videosNumber }} videos</span>
            <span>{{ subscribersNumber }} subscribers</span>
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="itemDetails.type === 'video'">
      <div class="search-card">
        <router-link
          :to="{
            path: 'video',
            query: { videoId: itemDetails.id },
          }"
        >
          <img
            :src="itemDetails.thumbnails.mediumUrl"
            :alt="itemDetails.title"
            class="search-card__image"
          />
        </router-link>

        <div class="search-card__info">
          <router-link
            :to="{
              path: 'video',
              query: { videoId: itemDetails.id },
            }"
          >
            <h4>{{ itemDetails.title }}</h4>
          </router-link>

          <router-link
            :to="{
              name: 'channel',
              params: { channelId: itemDetails.channelId },
            }"
          >
            <span>{{ itemDetails.channelTitle }}</span>
          </router-link>

          <span>{{ viewsNumber }} views</span>
        </div>
      </div>
    </div>

    <div v-if="itemDetails.type === 'playlist'">
      <div class="search-card playlist">
        <div class="playlist__thumbnail">
          <img
            :src="itemDetails.thumbnails.mediumUrl"
            :alt="itemDetails.title"
            class="search-card__image"
          />

          <div class="playlist__thumbnail__overlay">
            <span>{{ itemDetails.itemCount }}</span>
            <img src="@/assets/svg/playlist-logo.svg" class="playlist-logo" />
          </div>
        </div>

        <div class="search-card__info">
          <h4>{{ itemDetails.title }}</h4>
          <span>{{ itemDetails.channelTitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    itemDetails: {
      type: Object,
    },
  },
  computed: {
    videosNumber() {
      return Number(this.itemDetails.videoCount).toLocaleString();
    },
    subscribersNumber() {
      return Number(this.itemDetails.subscriberCount).toLocaleString();
    },
    viewsNumber() {
      return Number(this.itemDetails.viewCount).toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-card {
  margin: 1rem 0.75rem;
  display: flex;

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

  &.channel {
    .search-card__image {
      border-radius: 50%;
      width: 8rem;
    }

    .search-card__info {
      padding-top: 2.5rem;
    }
  }

  &.playlist {
    .playlist__thumbnail {
      position: relative;
      margin-right: 0.75rem;

      .search-card__image {
        margin: 0;
      }

      &__overlay {
        position: absolute;
        top: 0;
        bottom: 0.25rem;
        right: 0;
        background-color: $overlay-transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.75rem;
        color: $white;

        .playlist-logo {
          width: 1.5rem;
          margin-top: 0.3rem;
          margin-left: 0.3rem;
        }
      }
    }
  }
}
</style>
