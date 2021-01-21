<template>
  <div class="bread">
    <a
      v-for="(list, index) in navList"
      :key="index"
      href="#"
      class="bread-list__link"
      >{{ list }}</a
    >
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  data() {
    return {
      navList: ['Home'],
    }
  },
}
</script>

<style lang="scss" scoped>
// 麵包屑
.bread {
  position: sticky;
  top: 100px;
  height: 50px;
  background-color: #fff;
  border-bottom: 0.5px solid rgb(216, 208, 208);
  border-top: 0.5px solid rgb(216, 208, 208);
  padding: 0 40px;

  display: flex;
  align-items: center;

  &-list__link {
    color: #3223db;
    font-size: 1rem;
  }
}
</style>
