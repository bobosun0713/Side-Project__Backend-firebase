<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="home"></router-view>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
};
</script>
<style lang="scss">
#app {
  height: 100%;
}
.test {
  width: 80px;
  height: 80px;
  font-size: 1.5rem !important;
}
</style>
