<template>
  <div class="home">
    <side-menu :class="{ sideMenu: sideLeft }"></side-menu>
    <div class="backend" :class="{ 'backend--active': sideLeft }">
      <home-header @switch-btn="switchMenu"></home-header>
      <router-view />
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/layout/SideMenu.vue'
import HomeHeader from '@/components/layout/Header.vue'

export default {
  name: 'Home',
  components: {
    SideMenu,
    HomeHeader,
  },
  data() {
    return {
      sideLeft: false,
    }
  },
  methods: {
    switchMenu() {
      this.sideLeft = !this.sideLeft
    },
  },
}
</script>

<style lang="scss">
.backend {
  margin-left: 200px;
  transition: all 0.5s;
}
.backend--active {
  margin-left: 0;
}
.sideMenu {
  left: -200px;
}
</style>
