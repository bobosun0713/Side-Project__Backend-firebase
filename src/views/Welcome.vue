<template>
  <div class="welcome">
    <div class="welcome-content">
      <h1 class="welcome-content__title">BOBO</h1>
      <h2 class="welcome-content__subtitle">Welcome</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="scss" scoped>
.welcome {
  margin-top: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  &-content {
    text-align: center;
    &__title {
      font-size: 5rem;
      color: #41b883;
      text-shadow: 0px 0px 6px rgba(201, 189, 189, 0.7);
    }

    &__subtitle {
      color: #35495e;
      text-shadow: 0px 0px 6px rgba(237, 234, 234, 0.7);
      font-size: 1.75rem;
    }
  }
}
</style>