<template>
  <div class="article">
    <!-- 搜尋 -->
    <search-form :title="'文章'" @search-value="searchValue"></search-form>

    <!-- 文章列表 -->
    <div class="article-list">
      <h2 class="article-list__title">文章列表</h2>
      <table class="table article-list__table">
        <thead class="table-header">
          <tr>
            <th class="table-header__th">文章編號</th>
            <th class="table-header__th">刊登時間</th>
            <th class="table-header__th">文章標題</th>
            <!-- <th class="table-theader__th">文章內容</th> -->
            <th class="table-header__th">文章圖片</th>
            <th class="table-header__th">操作</th>
          </tr>
        </thead>

        <tbody v-if="pageList.length !== 0" class="table-body">
          <tr v-for="(item, index) in pageList" :key="index">
            <td class="table-body__td">{{ item.id }}</td>
            <td class="table-body__td">
              {{ item.time | dateFormat('YYYY-MM-DD HH:mm') }}
            </td>
            <td class="table-body__td">
              {{ item.title }}
            </td>
            <!-- <td
              class="table-body__td table-body__td__text"
              v-html="item.content"
            ></td> -->
            <td class="table-body__td">
              <img class="table-body__td__img" alt="" :src="item.imgUrl" />
            </td>
            <td class="table-body__td">
              <button
                class="table-body__td__button"
                @click="editAction(item.id)"
              >
                <font-awesome-icon
                  icon="pencil-alt"
                  class="article-icon"
                ></font-awesome-icon>
              </button>
              <button
                type="text"
                class="table-body__td__button"
                @click="
                  deleteMessage(item.title, item.id, item.time, item.imgUrl)
                "
              >
                <font-awesome-icon
                  icon="trash-alt"
                  class="article-icon-delete"
                ></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="table-body">
          <tr>
            <td class="table-body__td" colspan="6">無此文章</td>
          </tr>
        </tbody>
      </table>

      <!-- 分頁器 -->
      <!-- <div v-if="pageList.length !== 0" class="pagination">
        <button class="pagination__button" @click="changeBtn(-1)">
          <font-awesome-icon
            icon="chevron-circle-left"
            class="pagination-icon"
          ></font-awesome-icon>
        </button>

        <div v-show="totalPage !== 0" class="pagination__pages">
          <span class="pagination__pages__num">{{ nowPage }}</span>
          <span class="pagination__pages__num"> / {{ totalPage }}</span>
        </div>

        <button class="pagination__button" @click="changeBtn(1)">
          <font-awesome-icon
            icon="chevron-circle-right"
            class="pagination-icon"
          ></font-awesome-icon>
        </button>
      </div> -->

      <!-- 測試分頁 -->
      <pagination
        :total-page="totalPage"
        :now-page="nowPage"
        :view-page="3"
        @total-page-num="currentPage"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { collection, storageRef, collectionOrder } from '@/db'
import IsLoading from '@/mixin/loading.js'
import MessageDialog from '@/mixin/message.js'
import SearchForm from '@/components/SearchFrom.vue'

// 測試
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'ArticleList',
  components: {
    SearchForm,
    Pagination,
  },
  mixins: [IsLoading, MessageDialog],
  data() {
    return {
      // 總資料
      articleData: [],

      // 搜尋
      searchTitle: '',
      isSearch: false,

      // 分頁
      nowPage: 1,
      perPage: 8,
    }
  },
  computed: {
    // 搜尋
    pageList() {
      let start = (this.nowPage - 1) * this.perPage
      return this.articleData
        .filter((val) => val.title.match(this.searchTitle))
        .slice(start, start + this.perPage)
    },

    // 總頁數 (判斷篩選前 或 篩選後 使用哪個陣列)
    totalPage() {
      return !this.isSearch
        ? Math.ceil(this.articleData.length / this.perPage)
        : Math.ceil(this.pageList.length / this.perPage)
    },
  },
  mounted() {
    // 取得資料
    this.IsLoading()
    this.$bind('articleData', collectionOrder).then(() => {
      this.loading.close()
    })
  },

  methods: {
    // 修改
    editAction(idx) {
      this.$router.push(`/article/edit/${idx}`)
    },

    // 刪除
    deleteMessage(title, id, time, imgLen) {
      this.$confirm(`刪除這篇『${title}』文章?`, '刪除通知', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          imgLen.forEach((img, i) =>
            storageRef.child(`image/${time}-${i}`).delete()
          )
          collection.doc(id).delete()
          this.MessageDialog('成功', 'success', '刪除成功!', false)
        })
        .catch(() => this.MessageDialog('取消', 'info', '取消刪除!', false))
    },

    // 搜尋按鈕
    searchValue(value) {
      this.nowPage = 1
      this.searchTitle = value
      // 判斷按下篩選後，切換 computed totalPage函式調用哪個的陣列
      this.isSearch = !this.searchTitle ? false : true
    },

    changeBtn(Num) {
      let pageNum = this.nowPage + Num
      if (pageNum < 1) {
        this.nowPage = 1
      } else if (pageNum > this.totalPage) {
        this.nowPage = this.totalPage
      } else {
        this.nowPage = pageNum
      }
    },

    currentPage(num) {
      this.nowPage = num
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  padding: 30px 35px;

  &-list {
    padding: 30px;
    background-color: map-get($theme-colors, light);
    box-shadow: 0 0 7px map-get($theme-colors, shadow);
    border-radius: 15px;

    // 標題
    &__title {
      margin-bottom: 20px;
      font-size: 18px;
    }
  }
}
</style>
