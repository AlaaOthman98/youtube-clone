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

      <select class="filters__menu" @change="filterResultsByUploadDate($event)">
        <option
          v-for="(option, $index) in uploadDateMenuOptions"
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

      uploadDateMenuOptions: [
        {
          text: "Any time",
          value: "",
        },
        {
          text: "This day",
          value: `${new Date().toISOString()}`,
        },
        {
          text: "This week",
          value: `${this.getFirstDayInCurrentWeek().toISOString()}`,
        },
        {
          text: "This month",
          value: `${this.getFirstDayInCurrentMonth().toISOString()}`,
        },
      ],
    };
  },
  methods: {
    filterResultsByType($event) {
      this.$emit("onFilterByType", $event.target.value);
    },

    filterResultsByUploadDate($event) {
      this.$emit("onFilterByUploadDate", $event.target.value);
    },

    getFirstDayInCurrentWeek() {
      const todayDate = new Date();
      const day = todayDate.getDay();
      const diff = todayDate.getDate() - day + (day == 0 ? -6 : 1); // handle sunday case

      return new Date(todayDate.setDate(diff));
    },

    getFirstDayInCurrentMonth() {
      const today = new Date();
      const firstMonthDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      ).setHours(today.getHours() + 2);
      return new Date(firstMonthDay);
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
