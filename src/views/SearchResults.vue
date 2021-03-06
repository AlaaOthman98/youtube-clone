<template>
  <div>
    <div v-if="noQueryText" class="no-results">
      <h3>No provided search keyword</h3>
    </div>

    <div v-else>
      <SearchFilters
        v-if="!noSearchResults"
        @onFilterByType="filterResultsByType"
        @onFilterByUploadDate="filterResultsByUploadDate"
      />

      <hr v-if="!noSearchResults" />

      <div v-if="noSearchResults" class="no-results">
        <h3>No Search Results</h3>
      </div>

      <div v-else>
        <BaseLoader v-if="loading" />

        <div v-else>
          <SearchItem
            v-for="(item, $index) in searchResultList"
            :key="$index"
            :itemDetails="item"
          />

          <infinite-loading @infinite="infiniteHandler" spinner="circles">
            <div slot="no-more" style="margin: 0.5rem 0">No more results.</div>
          </infinite-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchFilters from "@/components/SearchFilters";
import SearchItem from "@/components/SearchItem";

import { getSearchResults } from "@/services/search.service";
import { getChannelById } from "@/services/channel.service";
import { getPlaylistById } from "@/services/playlist.service";
import { getVideoById } from "@/services/video.service";

export default {
  name: "SearchResults",
  data() {
    return {
      loading: false,
      searchKeyword: "",
      searchTypeFilter: "",
      searchDateFilter: "",
      searchResult: {},
      searchResultList: [],
      noSearchResults: false,
      noQueryText: false,
    };
  },
  components: {
    SearchFilters,
    SearchItem,
  },
  methods: {
    async searchByKeyword(keyword) {
      this.loading = true;

      this.searchResult = await getSearchResults(keyword);
      this.searchResultList = await this.getSearchList(this.searchResult.items);

      this.noSearchResults = this.searchResult.totalResults === 0;
      this.noQueryText = false;
      this.loading = false;
    },

    async filterResultsByType(type) {
      this.loading = true;
      this.searchTypeFilter = type;

      this.searchResult = await getSearchResults(
        this.searchKeyword,
        "",
        this.searchTypeFilter
      );
      this.searchResultList = await this.getSearchList(this.searchResult.items);

      this.noSearchResults = this.searchResult.totalResults === 0;
      this.loading = false;
    },

    async filterResultsByUploadDate(afterDate) {
      this.loading = true;
      this.searchDateFilter = afterDate;

      this.searchResult = await getSearchResults(
        this.searchKeyword,
        "",
        this.searchTypeFilter,
        this.searchDateFilter
      );
      this.searchResultList = await this.getSearchList(this.searchResult.items);

      this.noSearchResults = this.searchResult.totalResults === 0;
      this.loading = false;
    },

    getSearchList(searchItems) {
      return Promise.all(
        searchItems.map(async (res) => {
          let searchItem;
          switch (res.type) {
            case "channel":
              searchItem = await getChannelById(res.id);
              break;
            case "playlist":
              searchItem = await getPlaylistById(res.id);
              break;
            case "video":
              searchItem = await getVideoById(res.id);
              break;
          }
          return searchItem;
        })
      );
    },

    async infiniteHandler($state) {
      if (this.searchResult.nextPageToken) {
        const nextSearchResult = await getSearchResults(
          this.searchKeyword,
          this.searchResult.nextPageToken,
          this.searchTypeFilter,
          this.searchDateFilter
        );

        const nextSearchResultList = await this.getSearchList(
          nextSearchResult.items
        );

        this.searchResult.items.push(...nextSearchResult.items);
        this.searchResult.nextPageToken = nextSearchResult.nextPageToken;
        this.searchResult.totalResults = nextSearchResult.totalResults;

        this.searchResultList.push(...nextSearchResultList);

        $state.loaded();

        if (this.searchResult.items?.length >= this.searchResult.totalResults) {
          $state.complete();
        }
      } else {
        $state.loaded();
        $state.complete();
      }
    },
  },
  async created() {
    this.searchKeyword = this.$route.query.query;
    this.searchKeyword
      ? await this.searchByKeyword(this.searchKeyword)
      : (this.noQueryText = true);
  },
  async beforeRouteUpdate(to, from, next) {
    this.searchKeyword = to.query.query;
    this.searchKeyword
      ? await this.searchByKeyword(this.searchKeyword)
      : (this.noQueryText = true);

    next();
  },
};
</script>

<style lang="scss" scoped>
hr {
  border: none;
  display: block;
  height: 1px;
  border-top: 1px solid $grey-300;
}

.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  color: $grey-500;

  h3 {
    font-weight: 400;
  }
}
</style>
