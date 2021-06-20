<template>
  <div>
    <BaseLoader v-if="loading" />

    <div v-else>
      <div class="channel-header">
        <div
          :style="{ backgroundImage: 'url(' + channelDetails.bannerUrl + ')' }"
          class="channel-header__banner"
        ></div>

        <img
          v-if="channelDetails.thumbnails"
          :src="channelDetails.thumbnails.mediumUrl"
          :alt="channelDetails.title"
          class="channel-header__thumbnail"
        />

        <div class="channel-header__info">
          <h3 class="channel-header__info__title">
            {{ channelDetails.title }}
          </h3>
          <div class="channel-header__info__subscribe">
            <SubscribeButton />

            <span class="channel-header__info__subscribe__count">{{
              getSubscribesCount
            }}</span>
          </div>
        </div>
      </div>

      <div v-if="noPlaylistsFound" class="no-results">
        <h3>No playlist in this channel</h3>
      </div>

      <div v-else class="channel-content">
        <SearchItem
          v-for="(playlist, $index) in channelPlaylists"
          :key="$index"
          :itemDetails="playlist"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getChannelById } from "@/services/channel.service";
import { getPlaylistsByChannelId } from "@/services/playlist.service";
import { PlaylistItem } from "@/models/playlist.model";
import SearchItem from "@/components/SearchItem";
import SubscribeButton from "../components/SubscribeButton.vue";

export default {
  name: "Channel",
  data() {
    return {
      loading: false,
      channelId: "",
      channelDetails: {},
      channelPlaylists: [],
      noPlaylistsFound: false,
    };
  },
  computed: {
    getSubscribesCount() {
      return Number(this.channelDetails.subscriberCount).toLocaleString();
    },
  },
  components: {
    SearchItem,
    SubscribeButton,
  },
  methods: {
    async getChannelPlaylists(channelId) {
      this.loading = true;

      this.channelDetails = await getChannelById(channelId);
      this.channelPlaylists = await getPlaylistsByChannelId(channelId);

      this.noPlaylistsFound = this.channelPlaylists.pageInfo.totalResults === 0;

      if (!this.noPlaylistsFound) {
        this.channelPlaylists = this.channelPlaylists.items.map((playlist) => {
          return new PlaylistItem({ items: [playlist] });
        });
      }

      this.loading = false;
    },
  },
  async created() {
    this.channelId = this.$route.params.channelId;

    if (this.channelId) {
      await this.getChannelPlaylists(this.channelId);
    } else {
      this.noPlaylistsFound = true;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    this.channelId = to.params.channelId;

    if (this.channelId) {
      await this.getChannelPlaylists(this.channelId);
    } else {
      this.noPlaylistsFound = true;
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.channel-header {
  position: relative;

  &__banner {
    height: 20vh;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  &__thumbnail {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    transform: translate(1.5rem, -2.2rem);
    position: absolute;
  }

  &__info {
    background-color: $grey-300;
    padding: 2.5rem 5.5rem 1.5rem;

    &__title {
      font-weight: 400;
    }

    &__subscribe {
      display: flex;
      align-items: center;

      &__count {
        color: $grey-500;
      }
    }
  }
}

.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: $grey-500;

  h3 {
    font-weight: 400;
  }
}
</style>
