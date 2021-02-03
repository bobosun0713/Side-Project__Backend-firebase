<template>
  <div class="home">
    <side-menu
      :class="{
        'side-menu--active': isToggleMenu,
      }"
    ></side-menu>
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
    margin-left: 50px;
  }
}

// 收合
.side-menu--active {
  left: -150px;
  .side-menu__logo {
    display: none;
  }
  .side-menu__text {
    display: block;
    padding: 20px 0 20px;
  }
  .menu-list {
    //測試
    &__item {
      &__link {
        padding: 10px 17px;
        text-align: right;
        span {
          display: none;
        }
        .menu-icon {
          margin-right: 0;
          font-size: 18px;
        }
        .menu-arrow-down {
          display: none;
        }
      }
    }
  }
}
</style>
