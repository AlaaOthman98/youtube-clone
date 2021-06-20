<template>
  <header class="yt-header">
    <div class="yt-header__logo">
      <img src="@/assets/svg/logo-white.svg" alt="logo" />
    </div>

    <div class="yt-header__title" v-if="!showSearchField">
      <h3>{{ headerTitle }}</h3>
    </div>

    <div class="yt-header__search-field" v-else>
      <input
        name="search"
        type="text"
        v-model="searchWord"
        class="search-input"
        ref="search"
        @keyup.enter="onSearchKeyClick"
        @keyup.esc="removeSearchField"
      />
      <button class="remove-search-field-btn" @click="removeSearchField">
        X
      </button>
    </div>

    <div class="yt-header__search-key" @click="onSearchKeyClick">
      <i class="fa fa-search"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      headerTitle: "",
      showSearchField: false,
      searchWord: "",
    };
  },
  methods: {
    removeSearchField() {
      this.showSearchField = false;
    },

    onSearchKeyClick() {
      if (!this.showSearchField) {
        this.showSearchField = true;

        this.$nextTick(() => {
          this.$refs.search.focus();
        });
      } else {
        this.submitSearch();
      }
    },

    submitSearch() {
      if (this.searchWord) {
        this.headerTitle = this.searchWord;

        this.$router
          .push({
            path: "search",
            query: { query: this.searchWord },
          })
          .catch(() => {});

        this.showSearchField = false;
      }
    },
  },
  created() {
    this.headerTitle = this.$route.query.query ?? "YouTube";
    this.searchWord = this.$route.query.query ?? "";
  },
  watch: {
    $route(to) {
      this.headerTitle = to.query.query ?? "YouTube";
      this.searchWord = to.query.query ?? "";
    },
  },
};
</script>

<style lang="scss" scoped>
.yt-header {
  background-color: $primary-red;
  color: $white;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

  &__logo {
    width: 2rem;
    height: 2rem;

    img {
      width: 100%;
    }
  }

  &__title {
    flex: 1;
    margin-left: 0.5rem;
    width: calc(100% - 5rem);

    h3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 400;
    }
  }

  &__search-field {
    flex: 1;
    margin-left: 0.5rem;
    display: flex;

    .search-input {
      border: none;
      border-radius: 2px 0 0 2px;
      width: 100%;
      padding: 0.3rem 0.5rem;

      &:focus,
      &:focus-visible {
        outline: none;
      }
    }

    .remove-search-field-btn {
      border: none;
      background-color: $white;
      border-radius: 0 2px 2px 0;
      padding-right: 0.5rem;
      cursor: pointer;
      color: $grey-500;
    }
  }

  &__search-key {
    margin-left: 1rem;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
