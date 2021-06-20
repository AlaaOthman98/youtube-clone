<template>
  <a class="rating-btn" @click="onRateClick(rateType)">
    <template v-if="rateType === 'like'">
      <svg
        class="rating-btn__icon"
        :class="{ clicked: isActive }"
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        style="pointer-events: none; display: block"
      >
        <g>
          <path
            d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
          ></path>
        </g>
      </svg>
    </template>

    <template v-else>
      <svg
        class="rating-btn__icon dislike"
        :class="{ clicked: isActive }"
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        style="pointer-events: none; display: block"
      >
        <g>
          <path
            d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
          ></path>
        </g>
      </svg>
    </template>

    <span class="rating-btn__text" :class="{ clicked: isActive }">
      {{ formattedRateNumber }}
    </span>
  </a>
</template>

<script>
export default {
  props: {
    rateType: {
      type: String,
      default: "like",
    },
    rateNumber: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedRateNumber() {
      return Number(this.rateNumber).toLocaleString();
    },
  },
  methods: {
    onRateClick(rateType) {
      this.$emit("rateClick", rateType);
    },
  },
};
</script>

<style lang="scss" scoped>
.rating-btn {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;

  &__icon {
    width: 1.75rem;
    margin-right: 0.5rem;

    path {
      fill: $grey-500;
    }

    &.clicked path {
      fill: $primary-blue;
    }

    &.dislike {
      margin-left: 0.75rem;
      transform: rotate(180deg);
    }
  }

  &__text {
    color: $grey-500;

    &.clicked {
      color: $primary-blue;
    }
  }
}
</style>
