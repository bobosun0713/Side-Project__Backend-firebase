<template>
  <div class="admin">
    <search-form :title="'管理員'"></search-form>
    <div class="content">
      <div class="content-header">
        <h2 class="content-header__title">管理員列表</h2>
      </div>
      <table class="content-table">
        <thead>
          <tr>
            <th class="table-th">管理員名稱</th>
            <th class="table-th">管理員帳號</th>
            <th class="table-th">創建時間</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in adminData" :key="index">
            <td class="table-td">{{ item.name }}</td>
            <td class="table-td">{{ item.email }}</td>
            <td class="table-td">{{ getDate(item.time) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db, collection, storageRef, UserCollection } from "@/db";
import { isLoading, GetTimeMixin } from "@/assets/js/function.js";

import SearchForm from "@/components/SearchFrom.vue";
export default {
  name: "admin",
  components: {
    SearchForm,
  },
  data() {
    return {
      adminData: [],
    };
  },
  mounted() {
    this.isLoading();
    this.$bind("adminData", UserCollection).then(() => {
      this.loading.close();
    });
  },
  mixins: [isLoading, GetTimeMixin],
  watch: {
    adminData(newValue, oldValue) {
      this.mixinAry = [...newValue];
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  padding: 30px 35px;
}
</style>