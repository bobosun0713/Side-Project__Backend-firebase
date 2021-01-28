<template>
  <nav class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <img
        class="sidebar-logo__img"
        src="../../assets/image/vueV3.png"
        alt=""
        @click="goHome"
      />
    </div>
    <!-- 側邊選單 -->
    <ul class="sidebar-menu">
      <side-menu-item
        :item="item"
        v-for="(item, index) in SideMenuList"
        :key="index"
      ></side-menu-item>
    </ul>
  </nav>
</template>

<script>
import SideMenuItem from "@/components/layout/SideMenuItem.vue";
export default {
  name: "SideMenu",
  components: {
    SideMenuItem,
  },
  data() {
    return {
      isSideMenu: false,
      SideMenuList: [
        {
          name: "文章管理",
          icon: "sticky-note",
          children: [
            { name: "文章列表", icon: "list-alt", path: "/article/list" },
            { name: "新增文章", icon: "edit", path: "/article/add" },
          ],
        },
        {
          name: "商品管理",
          icon: "box",
          children: [
            { name: "商品列表", icon: "list-alt", path: "/123" },
            { name: "新增商品", icon: "cart-plus", path: "/123" },
          ],
        },
        {
          name: "管理員",
          icon: "user-alt",
          children: [
            { name: "管理員列表", icon: "list-alt", path: "/admin/list" },
            { name: "新增管理員", icon: "cart-plus", path: "/admin/add" },
          ],
        },
        { name: "GitHub", icon: "edit", path: "/search" },
      ],
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
// sideMenu
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #34384e;
  height: 100vh;
  width: 200px;
  transition: left 0.5s;

  &-logo {
    text-align: center;
    margin: 60px 0 30px;

    &__img {
      cursor: pointer;
      border-radius: 100%;
      background-color: white;
      height: 80px;
      width: 80px;
      padding: 5px;
    }
  }

  &-menu {
    &-item {
      overflow: hidden;
      &__link {
        padding: 10px 30px;
        display: block;
        font-size: 16px;
        transition: all 0.2s;
        color: white;
      }
    }
  }
}

// 複選單
.sub-menu {
  background-color: $sub-color-blue;
  transition: all 0.5s;
}
.router-link-exact-active {
  background-color: $sub-color-shallow_green;
  border-left: 4px solid rgb(51, 245, 51);
}
</style>
