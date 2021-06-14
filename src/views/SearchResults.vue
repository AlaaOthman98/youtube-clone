<template>
  <div>
    <div v-if="loading" class="loading-indicator">
      <div class="loading-indicator__spinner">
        <img src="@/assets/svg/animated-spinner.svg" />
      </div>
      <h4 class="loading-indicator__text">Loading</h4>
    </div>

    <div v-else>
      <div v-if="noSearchResults" class="no-results">
        <h3>No Search Results</h3>
      </div>

      <div v-else>
        <SearchFilters />

        <div>
          <SearchItem
            v-for="(item, $index) in searchResultList"
            :key="$index"
            :itemDetails="item"
          />

          <infinite-loading
            @infinite="infiniteHandler"
            spinner="circles"
          ></infinite-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchFilters from "@/components/SearchFilters";
import SearchItem from "@/components/SearchItem";
import { getModifiedSearchResults } from "@/services/search.service";
import { getModifiedChannelItem } from "@/services/channel.service";
import { getModifiedPlaylistItem } from "@/services/playlist.service";
import { getModifiedVideoItem } from "@/services/video.service";

export default {
  name: "SearchResults",
  data() {
    return {
      loading: true,
      searchKeyword: "",
      searchResult: {},
      searchResultList: [],
      noSearchResults: false,
    };
  },
  components: {
    SearchFilters,
    SearchItem,
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

    async infiniteHandler($state) {
      const nextSearchResult = await getModifiedSearchResults(
        this.searchKeyword,
        this.searchResult.nextPageToken
      );

      const nextSearchResultList = await this.getSearchList(
        nextSearchResult.items
      );

      this.searchResult.items.push(...nextSearchResult.items);
      this.searchResult.nextPageToken = nextSearchResult.nextPageToken;
      this.searchResult.totalResults = nextSearchResult.totalResults;

      this.searchResultList.push(...nextSearchResultList);

      $state.loaded();
    },
  },
  async created() {
    this.searchKeyword = this.$route.query.query;
    await this.searchByKeyword(this.searchKeyword);
  },
  async beforeRouteUpdate(to, from, next) {
    this.searchKeyword = to.query.query;
    await this.searchByKeyword(this.searchKeyword);

    next();
  },
};
</script>

<style lang="scss" scoped>
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50vh;
  color: $dark-grey;

  &__spinner {
    img {
      width: 4rem;
    }
  }
}

.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  color: $dark-grey;
}
</style>
