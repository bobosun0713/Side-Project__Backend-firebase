<template>
  <div class="admin">
    <search-form :title="'管理員'" @search-value="searchValue"></search-form>
    <div class="admin-list">
      <h2 class="admin-list__title">管理員列表</h2>
      <table class="table admin-list__table">
        <thead class="table-header">
          <tr>
            <th class="table-header__th">管理員名稱</th>
            <th class="table-header__th">管理員帳號</th>
            <th class="table-header__th">創建時間</th>
          </tr>
        </thead>
        <tbody v-if="adminList.length !== 0" class="table-body">
          <tr v-for="(item, index) in adminList" :key="index">
            <td class="table-body__td">{{ item.name }}</td>
            <td class="table-body__td">{{ item.email }}</td>
            <td class="table-body__td">
              {{ item.time | dateFormat('YYYY-MM-DD HH:mm') }}
            </td>
          </tr>
        </tbody>
        <tbody v-else class="table-body">
          <tr>
            <td class="table-body__td" colspan="6">無此管理員</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { UserCollection } from '@/db'
import IsLoading from '@/mixin/loading.js'
import MessageDialog from '@/mixin/message.js'

import SearchForm from '@/components/SearchFrom.vue'
export default {
  name: 'Admin',
  components: {
    SearchForm,
  },
  mixins: [IsLoading, MessageDialog],
  data() {
    return {
      adminData: [],
      searchName: '',
    }
  },
  computed: {
    adminList() {
      return this.adminData.filter((val) => val.name.match(this.searchName))
    },
  },
  mounted() {
    this.IsLoading()
    this.$bind('adminData', UserCollection).then(() => {
      this.loading.close()
    })
  },
  methods: {
    searchValue(value) {
      this.searchName = value
    },
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
  background-color: map-get($theme-colors, light);
  box-shadow: 0 0 7px rgb(206, 201, 201);
  border-radius: 15px;

  // 標題
  &__title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}
</style>
