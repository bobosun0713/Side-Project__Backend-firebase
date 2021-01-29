<template>
  <ul class="breadcrumb">
    <li
      v-for="(breadcrumb, idx) in breadCrumbList"
      :key="idx"
      class="breadcrumb__links"
      @click="routerTo(idx)"
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
  watch: {
    // 監聽路由變化，把每個路由meta裡面的breadcrumb值，塞入breadCrumbList 陣列裡。
    $route: {
      immediate: true,
      handler(newValue) {
        this.breadCrumbList = newValue.meta.breadcrumb
      },
    },
  },
  methods: {
    routerTo(idx) {
      if (this.breadCrumbList[idx].link) {
        this.$router.push(this.breadCrumbList[idx].link)
      }
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
    color: map-get($theme-colors,dark-blue);
    font-size: 14px;

    &:first-child {
      cursor: pointer;
    }

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
