<template>
  <div class="home">
    <transition name="opacity">
      <light-box
        @close-dialog="switchDialog"
        v-if="isOpenDialog"
        :articleData="articleData"
        :boxDate="boxDate"
      ></light-box>
    </transition>
    <div class="article">
      <div class="article-header">
        <h2 class="article-header__title">文章列表</h2>
        <button class="article-header__upload" @click="switchDialog">
          上傳文章
        </button>
        <div class="article-header__search">
          <input
            class="article-header__search__input"
            type="text"
            v-model="matchTitle"
            placeholder="輸入標題搜尋"
          />
          <button class="article-header__search__button" @click="searchAry">
            搜尋
          </button>
        </div>
      </div>
      <table class="table">
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
          <tr v-for="(item, index) in matchAry" :key="index">
            <td class="table-td">{{ item.id }}</td>
            <td class="table-td">
              {{ getDate(item.time) }}
            </td>
            <td class="table-td">
              {{ item.title }}
            </td>
            <td class="table-td" v-html="item.content">
              <!-- {{ item.title }} -->
            </td>
            <td class="table-td">
              <img
                class="table-id__img"
                alt=""
                style="width:100px"
                :src="item.imgUrl"
              />
            </td>
            <td class="table-td">
              <button class="table-btns" @click="editAction(item.id)">
                <font-awesome-icon icon="pencil-alt" class="article-icon-btn" />
              </button>
              <el-button
                type="text"
                class="table-btns"
                @click="DeleteMsg(item.title, item.id, item.imgName)"
              >
                <font-awesome-icon icon="trash-alt" class="article-icon-btn"
              /></el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db, repairsCollection, storageRef } from '@/db'
import LightBox from '@/components/LightBox.vue'
import MessagePlugin from '@/assets/js/element.js'

export default {
  name: 'home',
  components: {
    LightBox,
  },
  data() {
    return {
      articleData: [],
      boxDate: {},
      isOpenDialog: false,

      // 搜尋
      matchTitle: '',
      matchAry: [],
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

    // 刪除  ---- 第一版
    deleteAction(id, img) {
      let Msg = confirm('確認刪除嗎？')
      if (Msg) {
        storageRef.child(`image/${img}`).delete()
        repairsCollection.doc(id).delete()
        this.MessageDialog('success', '刪除成功', true)
      } else {
        this.MessageDialog('error', '取消刪除', true)
      }
    },

    // 搜尋
    searchAry() {
      console.log('搜尋')
      this.matchAry = this.articleData.filter((val) =>
        val.title.match(this.matchTitle)
      )
    },
  },
  computed: {
    //取得時間
    getDate() {
      return (time) => {
        let year = new Date(time).getUTCFullYear()
        let Month = new Date(time).getMonth() + 1
        let date = new Date(time).getDate()
        let Hours = new Date(time).getHours()
        let Min = new Date(time).getMinutes()
        let scs = new Date(time).getSeconds()

        return `${year}-${Month}-${date} | ${Hours}:${Min}:${scs}`
      }
    },
  },
  mounted() {
    // 取得資料
    this.$bind('articleData', repairsCollection)
    // .then((res) => {
    //   // 每筆資料存在搜尋用的陣列
    //   this.matchAry.push(...res)
    // })
    // console.log(this.articleData)
  },
  watch: {
    articleData(newValue, oldValue) {
      this.matchAry = [...newValue]
      // console.log('篩選', this.matchAry)
    },
  },
  mixins: [MessagePlugin],
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  padding: 30px 40px;

  .article {
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 0 7px #888;
    background-color: rgba(255, 255, 255, 0.548);

    // 標題 - 上傳
    &-header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 20px;

      // 標題
      &__title {
        font-size: 1.5rem;
      }

      // 上傳按鈕
      &__upload {
        background-color: #40b983;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
        letter-spacing: 1.5px;
        color: #fff;
        text-shadow: 0 0 1px rgb(129, 125, 125);
        box-shadow: 0 0 3px #888;
        cursor: pointer;
      }

      // 搜尋
      &__search {
        margin: 10px 0 0;
        flex-basis: 100%;

        &__input {
          width: 200px;
          border-radius: 5px;
          border: 1px solid #35495e;
          padding: 5px 10px;
        }

        &__button {
          cursor: pointer;
          box-shadow: 0 0 7px #888;
          border-radius: 5px;
          border: 0;
          padding: 5px 10px;
          margin-left: 5px;
          background-color: #35495e;
          color: white;
        }
      }
    }

    .table {
      width: 100%;
      max-width: 100%;
      border: 1px solid #35495e;
      border-collapse: collapse;
      text-align: center;

      //標頭
      thead {
        background-color: #35495e;
        color: #fff;
        font-size: 1.125rem;
        th {
          width: calc(100% / 6);
        }

        th + th {
          border-left: 1px solid white;
        }
      }

      // 欄位設定
      &-th,
      &-td {
        padding: 16px;
        max-width: 100px;
      }

      &-td {
        border-bottom: 1px solid #354951;
        border-left: 1px solid #354951;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &-td__img {
        width: 100px;
        object-fit: cover;
        height: 100%;
      }

      // 按鈕
      &-btns {
        cursor: pointer;
        border: 0;
        background-color: transparent;

        &:nth-of-type(2) {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
