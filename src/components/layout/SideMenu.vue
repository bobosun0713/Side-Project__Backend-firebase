<template>
  <nav class="side-menu" :class="{ active: isToggleMenu }">
    <!-- Logo -->
    <img
      class="side-menu__logo"
      src="../../assets/image/vue.png"
      alt=""
      @click="goHome"
    />
    <div class="side-menu__text" @click="goHome">BACKEND</div>
    <!-- 側邊選單 -->
    <ul class="menu-list">
      <side-menu-item
        v-for="(item, index) in SideMenuList"
        :key="index"
        :item="item"
      ></side-menu-item>
    </ul>
  </nav>
</template>

<script>
import SideMenuItem from '@/components/layout/SideMenuItem.vue'
export default {
  name: 'SideMenu',
  components: {
    SideMenuItem,
  },
  props: {
    isToggleMenu: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      SideMenuList: [
        {
          name: '文章管理',
          icon: 'sticky-note',
          children: [
            { name: '文章列表', icon: 'list-alt', path: '/article/list' },
            { name: '新增文章', icon: 'pencil-alt', path: '/article/add' },
          ],
        },
        {
          name: '管理員',
          icon: 'user-alt',
          children: [
            { name: '管理員列表', icon: 'list-alt', path: '/admin/list' },
            { name: '新增管理員', icon: 'pencil-alt', path: '/admin/add' },
          ],
        },
        { name: 'GitHub', icon: 'code-branch', path: '/' },
      ],
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
// sideMenu
.side-menu {
  position: fixed;
  left: 0;
  top: 0;
  background-color: map-get($theme-colors, dark-blue);
  height: 100vh;
  width: 200px;
  transition: left 0.5s;

  &__logo {
    display: block;
    border: 1px solid;
    margin: 60px auto 30px;
    cursor: pointer;
    border-radius: 100%;
    background-color: map-get($theme-colors, light);
    height: 80px;
    width: 80px;
    padding: 5px;
  }

  &__text {
    color: map-get($theme-colors, light);
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    writing-mode: vertical-lr;
    text-orientation: mixed;
    display: none;
    margin-left: auto;
    margin-right: 14px;
    letter-spacing: 2px;
  }

  // 收合
  &.active {
    left: -150px;
    .side-menu__logo {
      display: none;
    }
    .side-menu__text {
      display: block;
      padding: 20px 0 20px;
    }
    .menu-list__item {
      &__link {
        padding: 10px 17px;
        text-align: right;
        &-text {
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

.router-link-exact-active {
  background-color: map-get($theme-colors, light-green);
  border-left: 4px solid rgb(51, 245, 51);
}
</style>
