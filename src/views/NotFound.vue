<template>
  <div>
    <div class="not-found">
      <img src="@/assets/monkey.png" alt="Not found" />
      <h3>This page isn't available. Sorry about that.</h3>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  color: $grey-500;

  h3 {
    font-weight: 400;
    margin-top: 2rem;
  }
}
</style>
