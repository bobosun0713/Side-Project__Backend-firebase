<template>
  <div class="admin">
    <search-form :title="'管理員'"></search-form>
    <div class="admin-list-content">
      <div class="admin-list-content__header">
        <h2 class="admin-list-content__header__title">管理員列表</h2>
      </div>

      <table class="bo-table">
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
import { UserCollection } from '@/db'
import { isLoading, GetTimeMixin } from '@/assets/js/function.js'

import SearchForm from '@/components/SearchFrom.vue'
export default {
  name: 'admin',
  components: {
    SearchForm,
  },
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
  mixins: [isLoading, GetTimeMixin],
}
</script>

<style lang="scss" scoped>
.admin {
  padding: 30px 35px;
}

// list
.admin-list-content {
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.548);
  box-shadow: 0 0 7px rgb(206, 201, 201);
  border-radius: 15px;

  &__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;

    // 標題
    &__title {
      font-size: 18px;
    }
  }
}
</style>
