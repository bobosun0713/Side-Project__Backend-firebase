<template>
  <div class="home">
    <side-menu @close-side="closeMenu"></side-menu>
    <div class="backend" :class="{ 'backend--active': sideLeft }">
      <header-top></header-top>
      <transition name="opacity">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { db, collection, User } from "@/db";
import SideMenu from "@/components/layout/SideMenu.vue";
import HeaderTop from "@/components/layout/Header.vue";

export default {
  name: "Home",
  components: {
    SideMenu,
    HeaderTop,
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
.home {
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
