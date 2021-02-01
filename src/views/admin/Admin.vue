<template>
  <div class="admin">
    <search-form :title="'管理員'" @search-value="searchValue"></search-form>
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
        <tbody v-if="adminList.length !== 0" class="table-tbody">
          <tr v-for="(item, index) in adminList" :key="index">
            <td class="table-tbody__td">{{ item.name }}</td>
            <td class="table-tbody__td">{{ item.email }}</td>
            <td class="table-tbody__td">
              {{ item.time | dateFormat('YYYY-MM-DD HH:mm') }}
            </td>
          </tr>
        </tbody>
        <tbody v-else class="table-tbody">
          <tr>
            <td class="table-tbody__td" colspan="6">無此管理員</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { UserCollection } from '@/db'
import IsLoading from '@/js/loading.js'
import MessageDialog from '@/js/message.js'

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
  background-color: white;
  box-shadow: 0 0 7px rgb(206, 201, 201);
  border-radius: 15px;

  // 標題
  &__title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}
</style>
