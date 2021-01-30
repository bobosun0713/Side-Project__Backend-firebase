<template>
  <div class="home">
    <side-menu :class="{ 'sidebar--active': isToggleMenu }"></side-menu>
    <div class="backend" :class="{ 'backend--active': isToggleMenu }">
      <home-header @toggle-menu="toggleMenu"></home-header>
      <router-view></router-view>
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
      isToggleMenu: false,
    }
  },
  computed: {
    getUserInfo() {
      return this.$store.getters.userInfo
    },
  },
  mounted() {
    if (this.getUserInfo) {
      this.MessageDialog('success', '登入成功', false)
    }
  },
  methods: {
    toggleMenu() {
      this.isToggleMenu = !this.isToggleMenu
    },
  },
}
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
