<template>
  <div id="app">
    <side-menu @close-side="closeMenu"></side-menu>
    <div
      class="backend-wrapper"
      :class="{ 'backend-wrapper--active': sideLeft }"
    >
      <header-top></header-top>
      <bread-crumb></bread-crumb>
      <router-view />
    </div>
  </div>
</template>
<script>
import { db, repairsCollection } from '@/db'
import SideMenu from '@/components/layout/SideMenu.vue'
import HeaderTop from '@/components/layout/Header.vue'
import BreadCrumb from '@/components/layout/BreadCrumbs.vue'

export default {
  name: 'App',
  components: {
    SideMenu,
    HeaderTop,
    BreadCrumb,
  },
  data() {
    return {
      // data: [],
      sideLeft: false,
    }
  },
  methods: {
    closeMenu() {
      this.sideLeft = !this.sideLeft
    },
  },
}
</script>

<style lang="scss">
.backend-wrapper {
  margin-left: 330px;
  transition: all 0.5s;
}
.backend-wrapper--active {
  margin-left: 0;
}
</style>
