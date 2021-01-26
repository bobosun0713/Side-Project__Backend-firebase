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
  name: 'BreadCrumbs',
  data() {
    return {
      breadCrumbList: [],
    }
  },
  methods: {
    routerTo(idx) {
      if (this.breadCrumbList[idx].link) {
        this.$router.push(this.breadCrumbList[idx].link)
      }
    },
  },
  mounted() {
    // 一開始先把值塞入breadCrumbList 陣列裡。
    this.breadCrumbList = this.$route.meta.breadcrumb
  },
  watch: {
    // 監聽路由變化，把每個路由meta裡面的breadcrumb值，塞入breadCrumbList 陣列裡。
    $route(newlink) {
      // console.log(newlink.meta.breadList);
      this.breadCrumbList = newlink.meta.breadcrumb
    },
  },
}
</script>

<style lang="scss" scoped>
// breadcrumb
.breadcrumb {
  display: flex;
  padding: 10px 25px;
  border-top: 1px solid rgb(226, 220, 220);
  border-bottom: 1px solid rgb(226, 220, 220);
  flex-basis: 100%;

  &__links {
    position: relative;
    color: $main-color;
    font-size: 14px;

    &:not(:first-child) {
      margin-left: 20px;

      &:before {
        content: '\276F';
        position: absolute;
        left: -13.5px;
        font-size: 10px;
        top: 1.5px;
        color: rgb(180, 176, 176);
      }
    }
  }
}
</style>
