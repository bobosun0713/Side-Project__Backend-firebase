<template>
  <ul class="breadcrumb">
    <li
      v-for="(breadcrumb, idx) in breadCrumbList"
      :key="idx"
      @click="routerTo(idx)"
      class="breadcrumb__links"
    >
      {{ breadcrumb.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "BreadCrumbs",
  data() {
    return {
      breadCrumbList: [],
    };
  },
  methods: {
    routerTo(idx) {
      if (this.breadCrumbList[idx].link) {
        this.$router.push(this.breadCrumbList[idx].link);
      }
    },
  },
  mounted() {
    // 一開始先把值塞入breadCrumbList 陣列裡。
    this.breadCrumbList = this.$route.meta.breadcrumb;
  },
  watch: {
    // 監聽路由變化，把每個路由meta裡面的breadcrumb值，塞入breadCrumbList 陣列裡。
    $route(newlink) {
      // console.log(newlink.meta.breadList);
      this.breadCrumbList = newlink.meta.breadcrumb;
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  box-shadow: 0 2px 7px #888;
  background-color: white;
  padding: 10px 30px;
  display: flex;
  width: 100%;

  &__links {
    font-size: 1.25rem;
    font-weight: bold;
    position: relative;

    &:first-child {
      cursor: pointer;
    }

    &:not(:first-child) {
      margin-left: 30px;
      color: rgb(167, 160, 160);
    }

    &:not(:first-child)::before {
      content: "\2B9E";
      position: absolute;
      left: -22px;
      top: 0;
      bottom: 0;
      height: 20px;
      margin: auto 0;
      display: inline-block;
      font-size: 1rem;
    }
  }
}
</style>
