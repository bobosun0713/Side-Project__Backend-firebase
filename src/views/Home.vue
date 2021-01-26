<template>
  <div class="home">
    <side-menu :class="{ sideMenu: sideLeft }"></side-menu>
    <div class="backend" :class="{ 'backend--active': sideLeft }">
      <header-top @switch-btn="switchMenu"></header-top>
      <transition name="opacity">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/layout/SideMenu.vue'
import HeaderTop from '@/components/layout/Header.vue'

export default {
  name: 'Home',
  components: {
    SideMenu,
    HeaderTop,
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
  margin-left: 250px;
  transition: all 0.5s;
  height: 100%;
}
.backend--active {
  margin-left: 0;
}
.sideMenu {
  left: -250px;
}
</style>
