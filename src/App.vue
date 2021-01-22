<template>
  <div id="app">
    <side-menu @close-side="closeMenu"></side-menu>
    <div
      class="backend"
      :class="{ 'backend--active': sideLeft }"
    >
      <header-top></header-top>
      <bread-crumb></bread-crumb>
      <router-view />
    </div>
  </div>
</template>
<script>
import { db, collection } from "@/db";
import SideMenu from "@/components/layout/SideMenu.vue";
import HeaderTop from "@/components/layout/Header.vue";
import BreadCrumb from "@/components/layout/BreadCrumbs.vue";

export default {
  name: "App",
  components: {
    SideMenu,
    HeaderTop,
    BreadCrumb,
  },
  data() {
    return {
      sideLeft: false,
    };
  },
  methods: {
    closeMenu() {
      this.sideLeft = !this.sideLeft;
    },
  },
};
</script>

<style lang="scss">
#app{
  height: 100%;
}
.backend {
  margin-left: 330px;
  transition: all 0.5s;
  height: 100%;
}
.backend--active {
  margin-left: 0;
}
</style>
