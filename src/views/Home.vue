<template>
  <div class="home">
    <side-menu @close-side="closeMenu"></side-menu>
    <div class="backend" :class="{ 'backend--active': sideLeft }">
      <header-top></header-top>
      <bread-crumb></bread-crumb>
      <!-- <h1>這是首頁</h1>
      <button @click="backLogin">登出</button> -->
      <transition name="opacity">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { db, collection, User } from "@/db";
import SideMenu from "@/components/layout/SideMenu.vue";
import HeaderTop from "@/components/layout/Header.vue";
import BreadCrumb from "@/components/layout/BreadCrumbs.vue";

export default {
  name: "Home",
  components: {
    SideMenu,
    HeaderTop,
    BreadCrumb,
  },
  data() {
    return {
      sideLeft: false,
    };
  },
  methods: {
    backLogin() {
      User.signOut().then(() => {
        console.log("登出");
        this.MessageDialog("success", "已登出成功！", true);
        this.$router.push("/login");
      });
    },
    closeMenu() {
      this.sideLeft = !this.sideLeft;
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;
}
.backend {
  margin-left: 330px;
  transition: all 0.5s;
  height: 100%;
}
.backend--active {
  margin-left: 0;
}
</style>
