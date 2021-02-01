<template>
  <div class="index">
    <div class="index-content">
      <h1 class="index-content__title">BOBO</h1>
      <h2 class="index-content__subtitle">Welcome</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>

<style lang="scss" scoped>
.index {
  margin-top: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  &-content {
    text-align: center;
    &__title {
      font-size: 5rem;
      color: #41b883;
      text-shadow: 0px 0px 6px map-get($theme-colors, shadow);
    }

    &__subtitle {
      color: #35495e;
      text-shadow: 0px 0px 6px map-get($theme-colors, shadow);
      font-size: 1.75rem;
    }
  }
}
</style>
