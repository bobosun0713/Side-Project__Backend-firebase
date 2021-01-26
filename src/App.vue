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

}

</style>
