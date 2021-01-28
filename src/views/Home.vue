<template>
  <div class="home">
    <side-menu :class="{ 'sidebar--active': isOpenMenu }"></side-menu>
    <div class="backend" :class="{ 'backend--active': isOpenMenu }">
      <home-header @open-menu="openMenu"></home-header>
      <router-view />
    </div>
  </div>
</template>

<script>
import SideMenu from "@/components/layout/SideMenu.vue";
import HomeHeader from "@/components/layout/Header.vue";

export default {
  name: "Home",
  components: {
    SideMenu,
    HomeHeader,
  },
  data() {
    return {
      isOpenMenu: false,
    };
  },
  methods: {
    openMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
  },
};
</script>

<style lang="scss">
.backend {
  margin-left: 200px;
  transition: all 0.5s;

  &--active {
    margin-left: 0;
  }
}

.sidebar--active {
  left: -200px;
}
</style>
