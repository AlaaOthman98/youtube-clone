<template>
  <header class="yt-header">
    <div class="yt-header__logo">
      <router-link to="/">
        <img src="@/assets/svg/logo-white.svg" alt="logo" />
      </router-link>
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
  data() {
    return {
      headerTitle: "YouTube",
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
      } else {
        this.submitSearch();
      }
    },

    submitSearch() {},
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
      color: $dark-grey;
    }
  }

  &__search-key {
    margin-left: 1rem;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
