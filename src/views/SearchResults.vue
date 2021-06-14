<template>
  <div>{{ $route.query }}</div>
</template>

<script>
import SearchFilters from "@/components/SearchFilters";
import { getModifiedSearchResults } from "@/services/search.service";
import { getModifiedChannelItem } from "@/services/channel.service";
import { getModifiedPlaylistItem } from "@/services/playlist.service";
import { getModifiedVideoItem } from "@/services/video.service";

export default {
  name: "SearchResults",
  data() {
    return {
      loading: true,
      searchResult: {},
      searchResultList: [],
      noSearchResults: false,
    };
  },
  components: {
    SearchFilters,
  },
  methods: {
    async searchByKeyword(keyword) {
      this.loading = true;

      this.searchResult = await getModifiedSearchResults(keyword);
      this.searchResultList = await this.getSearchList(this.searchResult.items);

      this.noSearchResults = this.searchResult.totalResults === 0;
      this.loading = false;
    },

    getSearchList(searchItems) {
      return Promise.all(
        searchItems.map((res) => {
          let searchItem;
          switch (res.type) {
            case "channel":
              searchItem = getModifiedChannelItem(res.id);
              break;
            case "playlist":
              searchItem = getModifiedPlaylistItem(res.id);
              break;
            case "video":
              searchItem = getModifiedVideoItem(res.id);
              break;
          }
          return searchItem;
        })
      );
    },
  },
  async created() {
    await this.searchByKeyword(this.$route.query.query);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.searchByKeyword(to.query.query);

    next();
  },
};
</script>

<style></style>
