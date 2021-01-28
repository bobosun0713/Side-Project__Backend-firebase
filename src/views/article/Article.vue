<template>
  <div class="article">
    <!-- 搜尋 -->
    <search-form :title="'文章'" @search-value="searchValue"></search-form>

    <!-- 文章列表 -->
    <div class="article-list-content">
      <div class="article-list-content__header">
        <h2 class="article-list-content__header__title">文章列表</h2>
      </div>

      <table class="bo-table">
        <thead>
          <tr>
            <th class="table-th">文章編號</th>
            <th class="table-th">刊登時間</th>
            <th class="table-th">文章標題</th>
            <th class="table-th">文章內容</th>
            <th class="table-th">文章圖片</th>
            <th class="table-th">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="pageList.length !== 0">
            <tr v-for="(item, index) in pageList" :key="index">
              <td class="table-td">{{ item.id }}</td>
              <td class="table-td">
                {{ getDate(item.time) }}
              </td>
              <td class="table-td">
                {{ item.title }}
              </td>
              <td class="table-td" v-html="item.content"></td>
              <td class="table-td">
                <img
                  class="table-id__img"
                  alt=""
                  style="width: 100px"
                  :src="item.imgUrl"
                />
              </td>
              <td class="table-td">
                <button class="table-btns" @click="editAction(item.id)">
                  <font-awesome-icon
                    icon="pencil-alt"
                    class="article-icon-btn"
                  />
                </button>
                <button
                  type="text"
                  class="table-btns"
                  @click="deleteMessage(item.title, item.id, item.time)"
                >
                  <font-awesome-icon
                    icon="trash-alt"
                    class="article-icon-btn"
                  />
                </button>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td class="table-td" colspan="6">無此文章</td>
          </tr>
        </tbody>
      </table>

      <!-- 分頁器 -->
      <div class="pagination" v-if="pageList.length !== 0">
        <button class="pagination__button" @click="changeBtn(-1)">
          <font-awesome-icon
            icon="chevron-circle-left"
            class="article-icon-btn"
          />
        </button>
        <div class="pagination__pages" v-show="totalPage !== 0">
          <span class="pagination__pages__num">{{ nowPage }}</span>
          <span class="pagination__pages__num"> / {{ totalPage }}</span>
        </div>
        <button class="pagination__button" @click="changeBtn(1)">
          <font-awesome-icon
            icon="chevron-circle-right"
            class="article-icon-btn"
          />
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
  mixins: [isLoading, GetTimeMixin],
}
</script>

<style lang="scss" scoped>
.article {
  padding: 30px 35px;
}

// list
.article-list-content {
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
