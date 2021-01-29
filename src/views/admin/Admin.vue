<template>
  <div class="admin">
    <search-form :title="'管理員'"></search-form>
    <div class="admin-list">
      <h2 class="admin-list__title">管理員列表</h2>
      <table class="table admin-list__table">
        <thead class="table-thead">
          <tr>
            <th class="table-thead__th">管理員名稱</th>
            <th class="table-thead__th">管理員帳號</th>
            <th class="table-thead__th">創建時間</th>
          </tr>
        </thead>
        <tbody class="table-tbody">
          <tr v-for="(item, index) in adminData" :key="index">
            <td class="table-tbody__td">{{ item.name }}</td>
            <td class="table-tbody__td">{{ item.email }}</td>
            <td class="table-tbody__td">{{ getDate(item.time) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { UserCollection } from '@/db'
import { isLoading, GetTimeMixin } from '@/assets/js/function.js'

import SearchForm from '@/components/SearchFrom.vue'
export default {
  name: 'Admin',
  components: {
    SearchForm,
  },
  mixins: [isLoading, GetTimeMixin],
  data() {
    return {
      adminData: [],
    }
  },
  mounted() {
    this.isLoading()
    this.$bind('adminData', UserCollection).then(() => {
      this.loading.close()
    })
  },
}
</script>

<style lang="scss" scoped>
.admin {
  padding: 30px 35px;
}
// list
.admin-list {
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.548);
  box-shadow: 0 0 7px rgb(206, 201, 201);
  border-radius: 15px;

  // 標題
  &__title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}
</style>
