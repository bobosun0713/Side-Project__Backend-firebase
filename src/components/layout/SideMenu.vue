<template>
  <div class="sidebar" :class="{ 'sidebar--close': SideMenu }">
    <!-- 操作 -->
    <button for="sidebar-btn" class="sidebar-control" @click="closeSideMenu">
      <font-awesome-icon
        icon="chevron-circle-left"
        class="icon-side"
        v-if="!SideMenu"
      />
      <font-awesome-icon icon="chevron-circle-right" class="icon-side" v-else />
    </button>
    <!-- bar -->
    <div class="sidebar-content">
      <!-- Logo -->
      <div class="sidebar-content__logo"></div>
      <!-- 側邊選單 -->
      <ul class="sidebar-content__nav">
        <side-menu-list
          :item="item"
          v-for="(item, index) in SideMenuList"
          :key="index"
        ></side-menu-list>
      </ul>
    </div>
  </div>
</template>

<script>
import SideMenuList from '@/components/layout/SideMenuItem.vue'
export default {
  name: 'SideMenu',
  components: {
    SideMenuList,
  },
  data() {
    return {
      SideMenu: false,
      SideMenuList: [
        { name: '首頁', icon: 'house-damage', path: '/' },
        {
          name: '文章管理',
          icon: 'scroll',
          path: '',
          children: [
            { name: '文章列表', icon: 'list', path: '/Article' },
            { name: '新增文章', icon: 'list', path: '/Article' },
          ],
        },
        { name: '登入', icon: 'user-alt', path: '/Login' },
        { name: 'GitHub', icon: 'scroll', path: '' },
      ],
    }
  },
  methods: {
    closeSideMenu() {
      this.SideMenu = !this.SideMenu
      this.$emit('close-side')
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 330px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 1px 0px 10px rgb(180, 177, 177);
  transition: left 0.5s;
  z-index: 5;

  // 開關
  &-control {
    cursor: pointer;
    position: absolute;
    border: 0;
    border-radius: 100%;
    top: 0;
    right: -18px;
    bottom: 0;
    margin: auto 0;
    background-color: #fff;
    width: 40px;
    height: 40px;
    box-shadow: 5px 0 3px rgb(206, 206, 206);
  }

  // sidebar-內容
  &-content {
    height: 100%;

    //logo
    &__logo {
      margin: 30px auto;
      width: 200px;
      height: 200px;
      border-radius: 100%;
      box-shadow: 0 0 7px #888;
      background: url('~@/assets/logo.png') no-repeat center bottom;
      background-size: 80%;
    }

    // 導航欄
    &__nav {
      //   border: 1px solid blue;
      height: 100%;
      display: flex;
      flex-direction: column;

      // 項目
      &__item {
        // padding: 30px 0 30px 95px;
        // border: 1px solid red;
        text-align: left;

        > a {
          display: block;
          padding: 30px 0 30px 100px;
          color: #202836;
          font-weight: bold;
          font-size: 1.25rem;
          margin-left: 15px;
        }
      }
    }
  }
}
.sidebar--close {
  left: -330px;

  .sidebar-control {
    transition: all 0.5s;
    right: -25px;
    margin: auto 0;
    width: 50px;
    height: 50px;
    padding-left: 15px;
  }
}
</style>
