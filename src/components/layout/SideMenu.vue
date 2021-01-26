<template>
  <nav class="sidebar">
    <div class="sidebar-content">
      <!-- Logo -->
      <div class="sidebar-logo">
        <img
          class="sidebar-logo__img"
          src="../../assets/image/vueV3.png"
          alt=""
        />
      </div>
      <!-- 側邊選單 -->
      <div class="sidebar__nav">
        <ul class="menu">
          <side-menu-item
            :item="item"
            v-for="(item, index) in SideMenuList"
            :key="index"
          ></side-menu-item>
        </ul>
      </div>
    </div>
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
      SideMenu: false,
      SideMenuList: [
        { name: "首頁", icon: "home", path: "/" },
        {
          name: "文章管理",
          icon: "sticky-note",
          children: [
            { name: "文章列表", icon: "list-alt", path: "/article" },
            { name: "新增文章", icon: "edit", path: "/articleadd" },
          ],
        },
        {
          name: "商品管理",
          icon: "box",
          children: [
            { name: "商品列表", icon: "list-alt", path: "/article" },
            { name: "新增商品", icon: "cart-plus", path: "/articleadd" },
          ],
        },
        { name: "管理員", icon: "user-alt", path: "/admin" },
        { name: "GitHub", icon: "edit", path: "/search" },
      ],

      routerLink: "",
    };
  },
  methods: {
    closeSideMenu() {
      this.SideMenu = !this.SideMenu;
      this.$emit("close-side");
    },
  },
  watch: {
    $route(link) {
      this.routerLink = this.$route.path.substr(1).split("/");
      console.log(this.routerLink);
    },
  },
};
</script>

<style lang="scss">
.menu-icon {
  margin-right: 15px;
}
.menu-drop-down {
  float: right;
  margin-top: 7px;
  font-size: 12px;
  transition: transform 0.5s;
}

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
      border-radius: 100%;
      background-color: white;
      height: 80px;
      width: 80px;
      padding: 5px;
    }
  }

  .menu {
    &__item {
      overflow: hidden;
      &__link {
        padding: 10px 30px;
        display: block;
        font-size: 16px;
        transition: all 0.2s;
        color: white;
      }

      // 複選單
      .sub-menu {
        background-color: $sub-color-blue;
        transition: all 0.5s;

        .menu__item__link {
          display: block;
          padding: 10px 0 15px 40px;
          color: white;
          font-size: 14px;
          // font-weight: bold;
          border-bottom: 0.5px solid white;
        }
      }
    }
  }
}

.router-link-exact-active {
  background-color: $sub-color-shallow_green;
  border-left: 4px solid rgb(51, 245, 51);
}
</style>
