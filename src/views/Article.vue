<template>
  <div class="article">
    <light-box
      @close-dialog="switchDialog"
      v-if="isOpenDialog"
      :articleData="articleData"
      :boxDate="boxDate"
    ></light-box>
    <div class="article__search">
      <input type="text" class="article__search__input" />
      <button class="article__search__bi">搜尋列表</button>
    </div>
    <div class="content">
      <div class="content-header">
        <h2 class="content-header__title">文章列表</h2>
        <button class="content-header__upload" @click="switchDialog">
          上傳文章
        </button>
        <!-- <div class="content-header__search">
          <input
            class="content-header__search__input"
            type="text"
            ref="title"
            placeholder="輸入標題搜尋"
          />
          <button class="content-header__search__button" @click="searchBtn">
            搜尋
          </button>
        </div> -->
      </div>
      <table class="content-table">
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
                <font-awesome-icon icon="pencil-alt" class="article-icon-btn" />
              </button>
              <button
                type="text"
                class="table-btns"
                @click="DeleteMsg(item.title, item.id, item.imgName)"
              >
                <font-awesome-icon icon="trash-alt" class="article-icon-btn" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
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
import { db, collection, storageRef, collectionOrder } from '@/db'
import LightBox from '@/components/LightBox.vue'
import { SearchMixin, GetTimeMixin } from '@/assets/js/function.js'

export default {
  name: 'home',
  components: {
    LightBox,
  },
  data() {
    return {
      // 總資料
      articleData: [],

      // 搜尋
      searchTitle: '',
      // 切換搜尋時的功能
      isSearch: false,

      // 分頁
      nowPage: 1,
      perPage: 8,

      // 修改資料暫存
      boxDate: {},
      // 開啟燈箱
      isOpenDialog: false,
    }
  },
  methods: {
    //dialog 開關
    switchDialog() {
      this.boxDate = {}
      // console.log('執行關閉')
      this.isOpenDialog = !this.isOpenDialog
    },
    // 修改 --- 待詢問（無法解構ID)
    editAction(idx) {
      // 用id 抓取修改資料，放到暫存修改資料的物件裡。
      this.boxDate = { ...this.articleData.find((val) => val.id === idx) }
      // id為唯獨 無法解構, 手動把id加回去。
      this.boxDate.id = idx
      this.isOpenDialog = !this.isOpenDialog
    },
    // 刪除
    DELETE_MESSAGE(title, id, imgName) {
      this.$confirm(`刪除這篇『${title}』文章?`, '刪除通知', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          storageRef.child(`image/${imgName}`).delete()
          collection.doc(id).delete()
          this.MessageDialog('success', '刪除成功!', false)
        })
        .catch(() => this.MessageDialog('info', '取消刪除!', false))
    },

    // 搜尋按鈕
    searchBtn() {
      this.searchTitle = this.$refs.title.value
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
    this.$bind('articleData', collectionOrder)
  },
  mixins: [SearchMixin, GetTimeMixin],
}
</script>

<style lang="scss" scoped>
.article {
  padding: 30px 35px;
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
.article__search {
  display: flex;
  justify-content: space-between;
  border: 1px solid red;
}
</style>
