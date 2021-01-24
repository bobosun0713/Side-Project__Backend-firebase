<template>
  <div class="article">
    <transition name="opacity">
      <light-box
        @close-dialog="switchDialog"
        v-if="isOpenDialog"
        :articleData="articleData"
        :boxDate="boxDate"
      ></light-box>
    </transition>
    <div class="content">
      <div class="content-header">
        <h2 class="content-header__title">文章列表</h2>
        <button class="content-header__upload" @click="switchDialog">
          上傳文章
        </button>
        <div class="content-header__search">
          <input
            class="content-header__search__input"
            type="text"
            v-model="mixinTitle"
            placeholder="輸入標題搜尋"
          />
          <button
            class="content-header__search__button"
            @click="SearchMixin(articleData, 'title')"
          >
            搜尋
          </button>
        </div>
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
          <tr v-for="(item, index) in mixinAry" :key="index">
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
import { db, collection, storageRef } from "@/db";
import LightBox from "@/components/LightBox.vue";
import { SearchMixin, GetTimeMixin } from "@/assets/js/function.js";

export default {
  name: "home",
  components: {
    LightBox,
  },
  data() {
    return {
      // 總資料
      articleData: [],

      // 分頁
      nowPage: 1,
      perPage: 10,

      // 開啟燈箱 - 修改資料暫存
      boxDate: {},
      isOpenDialog: false,
    };
  },
  methods: {
    //dialog 開關
    switchDialog() {
      this.boxDate = {};
      // console.log('執行關閉')
      this.isOpenDialog = !this.isOpenDialog;
    },

    // 修改 --- 待詢問（無法解構ID)
    editAction(idx) {
      // 用id 抓取修改資料，放到暫存修改資料的物件裡。
      this.boxDate = { ...this.articleData.find((val) => val.id === idx) };
      // id為唯獨 無法解構, 手動把id加回去。
      this.boxDate.id = idx;
      this.isOpenDialog = !this.isOpenDialog;
    },

    // 刪除  ---- 第一版
    deleteAction(id, img) {
      let Msg = confirm("確認刪除嗎？");
      if (Msg) {
        storageRef.child(`image/${img}`).delete();
        collection.doc(id).delete();
        this.MessageDialog("success", "刪除成功", true);
      } else {
        this.MessageDialog("error", "取消刪除", true);
      }
    },
  },
  mounted() {
    // 取得資料
    this.$bind("articleData", collection);
    // .then((res) => {
    //   // 每筆資料存在搜尋用的陣列
    //   this.matchAry.push(...res)
    // })
    // console.log(this.articleData)
  },
  mixins: [SearchMixin, GetTimeMixin],
  watch: {
    articleData(newValue, oldValue) {
      this.mixinAry = [...newValue];
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  // border: 1px solid;
}
</style>
