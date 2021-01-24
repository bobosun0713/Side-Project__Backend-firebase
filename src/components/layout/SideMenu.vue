<template>
  <div class="sidebar" :class="{ 'sidebar--close': SideMenu }">
    <button class="sidebar-control" @click="closeSideMenu">
      <font-awesome-icon
        icon="chevron-circle-left"
        class="icon-side"
        v-if="!SideMenu"
      />
      <font-awesome-icon icon="chevron-circle-right" class="icon-side" v-else />
    </button>
    <div class="sidebar-content">
      <!-- Logo -->
      <div class="sidebar__logo"></div>
      <!-- 側邊選單 -->
      <ul class="sidebar__nav">
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
import SideMenuList from "@/components/layout/SideMenuItem.vue";
export default {
  name: "SideMenu",
  components: {
    SideMenuList,
  },
  data() {
    return {
      SideMenu: false,
      SideMenuList: [
        { name: "首頁", icon: "house-damage", path: "/" },
        {
          name: "文章管理",
          icon: "scroll",
          children: [
            { name: "文章列表", icon: "list", path: "/article" },
            { name: "新增文章", icon: "list", path: "" },
          ],
        },
        { name: "管理員", icon: "user-alt", path: "/admin" },
        { name: "GitHub", icon: "scroll", path: "/login" },
      ],
    };
  },
  methods: {
    closeSideMenu() {
      this.SideMenu = !this.SideMenu;
      this.$emit("close-side");
    },
  },
};
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
    .sidebar__logo {
      margin: 30px auto;
      width: 200px;
      height: 200px;
      border-radius: 100%;
      box-shadow: 0 0 7px #888;
      background: url("~@/assets/image/logo.png") no-repeat center bottom;
      background-size: 80%;
    }

    // 導航欄
    .sidebar__nav {
      // border: 1px solid blue;
      height: 100%;
      display: flex;
      flex-direction: column;

      // 項目
      &__item {
        > a {
          // text-align: center;
          display: block;
          padding: 31.5px 0 31.5px 70px;
          color: #202836;
          font-weight: 900;
          font-size: 1.25rem;
          transition: all 0.2s;
        }

        &:hover > a {
          color: #3a976d;
        }
      }
    }

    // 選單 複選單
    .sidebar__nav__child {
      // height: auto;
      background-color: #476382;
      transition: all 0.5s;
      overflow: hidden;

      // 項目
      li {
        > a {
          text-align: center;
          padding: 31.5px 0 31.5px 0;
          font-size: 1rem;
          color: white;

          .icon {
            font-size: 1rem;
            color: white;
          }
        }

        &:hover > a {
          color: black;
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
.router-link-exact-active {
  background-color: #5bd39f;
}
</style>
