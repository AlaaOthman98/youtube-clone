<template>
  <div>{{ $route.query.channelId }}</div>
</template>

<script>
import { getChannelById } from "@/services/channel.service";
import { getPlaylistsByChannelId } from "@/services/playlist.service";
import { PlaylistItem } from "@/models/playlist.model";
import SearchItem from "@/components/SearchItem";

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
  },
  methods: {
    async getChannelPlaylists(channelId) {
      this.loading = true;

      this.channelDetails = await getChannelById(channelId);
      this.channelPlaylists = await getPlaylistsByChannelId(channelId);

      this.channelPlaylists = this.channelPlaylists.items.map((playlist) => {
        return new PlaylistItem({ items: [playlist] });
      });

      this.loading = false;
    },
  },
  async created() {
    this.channelId = this.$route.query.channelId;

    if (this.channelId) {
      await this.getChannelPlaylists(this.channelId);
    }
  },
  async beforeRouteUpdate(to, from, next) {
    this.channelId = to.query.channelId;

    if (this.channelId) {
      await this.getChannelPlaylists(this.channelId);
    }
    next();
  },
};
</script>

<style></style>
