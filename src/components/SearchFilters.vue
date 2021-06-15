<template>
  <div>
    <div class="filters">
      <select class="filters__menu" @change="filterResultsByType($event)">
        <option
          v-for="(option, $index) in typeMenuOptions"
          :key="$index"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeMenuOptions: [
        {
          text: "All",
          value: "",
        },
        {
          text: "Video",
          value: "video",
        },
        {
          text: "Channel",
          value: "channel",
        },
        {
          text: "Playlist",
          value: "playlist",
        },
      ],
    };
  },
  methods: {
    filterResultsByType($event) {
      this.$emit("onFilterByType", $event.target.value);
    },

    filterResultsByTime($event) {
      this.$emit("onFilterByTime", $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  padding: 0.75rem;

  &__menu {
    outline: none;
    background-color: $grey-200;
    border: 1px solid $grey-300;
    border-radius: 0.2rem;
    padding: 0.5rem 0.75rem;
    margin-right: 0.5rem;

    &:focus,
    &:focus-visible {
      outline: none;
    }
  }
}
</style>
