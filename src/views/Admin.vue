<template>
  <div class="admin">
    <div class="content">
      <div class="content-header">
        <h2 class="content-header__title">管理員列表</h2>
        <div class="content-header__search">
          <input
            class="content-header__search__input"
            type="text"
            v-model="mixinTitle"
            placeholder="輸入標題搜尋"
          />
          <button
            class="content-header__search__button"
            @click="SearchMixin(adminData, 'name')"
          >
            搜尋
          </button>
        </div>
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
          <tr v-for="(item, index) in mixinAry" :key="index">
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
import { SearchMixin, GetTimeMixin } from "@/assets/js/function.js";
export default {
  name: "admin",
  data() {
    return {
      adminData: [],
    };
  },
  mounted() {
    this.$bind("adminData", UserCollection);
  },
  mixins: [SearchMixin, GetTimeMixin],
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