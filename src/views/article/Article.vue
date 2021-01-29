<template>
  <div class="article">
    <!-- 搜尋 -->
    <search-form :title="'文章'" @search-value="searchValue"></search-form>

    <!-- 文章列表 -->
    <div class="article-list">
      <h2 class="article-list__title">文章列表</h2>
      <table class="table article-list__table">
        <thead class="table-thead">
          <tr>
            <th class="table-thead__th">文章編號</th>
            <th class="table-thead__th">刊登時間</th>
            <th class="table-thead__th">文章標題</th>
            <th class="table-thead__th">文章內容</th>
            <th class="table-thead__th">文章圖片</th>
            <th class="table-thead__th">操作</th>
          </tr>
        </thead>

        <tbody v-if="pageList.length !== 0" class="table-tbody">
          <tr v-for="(item, index) in pageList" :key="index">
            <td class="table-tbody__td">{{ item.id }}</td>
            <td class="table-tbody__td">
              {{ getDate(item.time) }}
            </td>
            <td class="table-tbody__td">
              {{ item.title }}
            </td>
            <td class="table-tbody__td" v-html="item.content"></td>
            <td class="table-tbody__td">
              <img class="table-tbody__td__img" alt="" :src="item.imgUrl" />
            </td>
            <td class="table-tbody__td">
              <button
                class="table-tbody__td__button"
                @click="editAction(item.id)"
              >
                <font-awesome-icon
                  icon="pencil-alt"
                  class="article-icon"
                ></font-awesome-icon>
              </button>
              <button
                type="text"
                class="table-tbody__td__button"
                @click="deleteMessage(item.title, item.id, item.time)"
              >
                <font-awesome-icon
                  icon="trash-alt"
                  class="article-icon-delete"
                ></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
        <template v-else>
          <tbody class="table-tbody">
            <tr>
              <td class="table-tbody__td" colspan="6">無此文章</td>
            </tr>
          </tbody>
        </template>
      </table>

      <!-- 分頁器 -->
      <div v-if="pageList.length !== 0" class="pagination">
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
      </div>
    </div>
  </div>
</template>

<script>
import { collection, storageRef, collectionOrder } from '@/db'
import { isLoading, GetTimeMixin } from '@/assets/js/function.js'

import SearchForm from '@/components/SearchFrom.vue'
export default {
  name: 'ArticleList',
  components: {
    SearchForm,
  },
  mixins: [isLoading, GetTimeMixin],
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
        .slice(start, start + this.perPage)
        .filter((val) => val.title.match(this.searchTitle))
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
    this.isLoading()
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
    deleteMessage(title, id, time) {
      this.$confirm(`刪除這篇『${title}』文章?`, '刪除通知', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          storageRef.child(`image/${time}`).delete()
          collection.doc(id).delete()
          this.MessageDialog('success', '刪除成功!', false)
        })
        .catch(() => this.MessageDialog('info', '取消刪除!', false))
    },

    // 搜尋按鈕
    searchValue(value) {
      this.searchTitle = value
      // 判斷按下篩選後，切換 computed totalPage函式調用哪個的陣列
      this.isSearch = !this.searchTitle ? false : true
    },

    // 分頁控制按鈕
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
  },
}
</script>

<style lang="scss" scoped>
.article {
  padding: 30px 35px;

  &-list {
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.548);
    box-shadow: 0 0 7px rgb(206, 201, 201);
    border-radius: 15px;

    // 標題
    &__title {
      margin-bottom: 20px;
      font-size: 18px;
    }
  }
}
s
// 分頁
.pagination {
  padding: 20px 0 0;
  display: flex;
  justify-content: center;

  &__pages {
    &__num {
      font-weight: bold;
      font-size: 1.125rem;
      color: #41b883;

      &:last-child {
        color: #193152;
      }
    }
  }

  // 操作鈕
  &__button {
    cursor: pointer;
    border: 0;
    margin: 0 10px;
    background-color: transparent;
    transition: all 0.5s;
    &:hover {
      color: black;
    }
  }
}
</style>
