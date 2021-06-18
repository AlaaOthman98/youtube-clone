<template>
  <div class="loading-indicator">
    <div class="loading-indicator__spinner">
      <img src="@/assets/svg/animated-spinner.svg" />
    </div>
    <h4 class="loading-indicator__text">Loading</h4>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50vh;
  color: $grey-500;

  &__spinner {
    img {
      width: 4rem;
    }
  }

  &__text {
    font-weight: 400;
  }
}
</style>
