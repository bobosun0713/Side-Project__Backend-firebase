<template>
  <div class="article-form">
    <validation-observer
      class="article-form__content"
      tag="form"
      ref="form"
      @submit.prevent="SubmitAction"
    >
      <!-- 標題 -->
      <validation-provider
        class="article-form__group"
        v-slot="{ failed, errors }"
        tag="div"
        rules="required"
        mode="lazy"
      >
        <label class="article-form__group__title" for="">文章標題</label>
        <input
          type="text"
          class="article-form__group__input"
          v-model="articleData.title"
        />
        <p class="article-form__error">{{ errors[0] }}</p>
      </validation-provider>
      <!-- 圖片 -->
      <validation-provider
        class="article-form__group"
        v-slot="{ failed, errors }"
        tag="div"
        rules="required"
        mode="lazy"
      >
        <label class="article-form__group__title">圖片上傳</label>
        <div class="article-form__group__upload">
          <label
            class="article-form__group__upload__label"
            :class="{}"
            for="img_file"
          >
            <img
              v-show="articleData.imgUrl"
              class="article-form__group__upload__img"
              :src="articleData.imgUrl"
              v-model="articleData.imgUrl" />
            <font-awesome-icon icon="images" class="icon-upload"
          /></label>

          <input
            type="file"
            id="img_file"
            class="article-form__group__file"
            @change="getImageFile"
          />
        </div>
        <p class="article-form__error">{{ errors[0] }}</p>
      </validation-provider>
      <!-- 內容 -->
      <validation-provider
        class="article-form__group"
        tag="div"
        v-slot="{ failed, errors }"
        rules="required"
        mode="lazy"
      >
        <label class="article-form__group__title" for="">文章標題</label>
        <editor v-model="articleData.content"></editor>
        <p class="article-form__error">{{ errors[0] }}</p>
      </validation-provider>
      <!-- 按鈕 -->
      <button class="bo-button">送出</button>
    </validation-observer>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue";
import { db, collection, storageRef, collectionOrder } from "@/db";
import { isLoading } from "@/assets/js/function.js";

export default {
  name: "ArticleAdd",
  components: {
    Editor,
  },
  data() {
    return {
      action: "",
      articleId: 0,
      articleData: {
        title: "",
        time: +new Date(),
        content: "",
        imgUrl: "",
      },
    };
  },
  methods: {
    async SubmitAction() {
      this.action === "add" ? this.addArticle() : this.editAction();
    },

    // 新增
    async addArticle() {
      this.$refs.form.validate().then((success) => {
        if (!success) return;
      });
      // loading
      this.isLoading();
      // 上傳照片
      await this.upLoadImage();
      // 取得完圖片網址，並新增這筆資料
      await collection.doc(this.articleId).set(this.articleData);
      // close-loading
      this.loading.close();
      this.MessageDialog("success", "新增成功", true);
      this.$router.push("/article/list");
    },
    // 上傳圖片
    async upLoadImage() {
      // 上傳到storage
      await storageRef
        .child("image/" + this.articleData.time)
        .putString(this.articleData.imgUrl.split(",")[1], "base64", {
          contentType: "image/jpg",
        });

      // 獲取到的url塞回資料裡
      await storageRef
        .child("image/" + this.articleData.time)
        .getDownloadURL()
        .then((downloadUrl) => {
          this.articleData.imgUrl = downloadUrl;
        });
    },
    // 取得照片數據
    getImageFile(e) {
      if (!e.target.files[0]) return;
      let imgFile = e.target.files[0];
      let file = new FileReader();
      file.readAsDataURL(imgFile);
      file.onload = (e) => {
        this.articleData.imgUrl = e.target.result;
      };
    },

    // 取得修改資料
    editData() {
      collection
        .doc(this.$route.path.split("/")[3])
        .get()
        .then((doc) => {
          this.articleData = { ...doc.data() };
          console.log("修改", this.articleData);
        });
    },

    // 修改
    async editAction() {
      // loading
      this.isLoading();
      await this.upLoadImage();
      // close-loading
      this.loading.close();
      collection.doc(this.$route.path.split("/")[3]).update(this.articleData);
      this.MessageDialog("success", "修改成功", true);
      this.$router.push("/article/list");
    },

    // 設定id
    setArticleId() {
      collectionOrder.get().then((doc) => {
        let maxId = Math.max(...doc.docs.map((val) => val.id));
        this.articleId = maxId <= 0 ? "1" : String(maxId + 1);
      });
    },
  },
  mixins: [isLoading],
  mounted() {
    this.action = this.$route.path.split("/")[2];
    this.action === "add" ? this.setArticleId() : this.editData();
  },
};
</script>

<style lang="scss" scoped>
.article-form {
  padding: 30px 35px;

  &__content {
    padding: 20px 25px;
    background-color: white;
    border-radius: 15px;
  }
  &__group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    &__title {
      font-weight: 700;
      margin-bottom: 8px;
    }

    // 輸入框
    &__input {
      border: 0.5px solid rgba(185, 183, 183, 0.533);
      padding: 10px 15px;
      border-radius: 5px;
    }

    // 圖片ˇ
    &__file {
      display: none;
    }

    &__upload {
      border: 0.5px solid rgba(185, 183, 183, 0.533);
      border-radius: 10px;
      width: 150px;
      height: 150px;
      position: relative;

      &__label {
        top: 0;
        left: 0;
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &__img {
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }

  // 錯誤訊息
  &__error {
    height: 20px;
    font-size: 12px;
    color: red;
  }
}

.icon-upload {
  color: #888;
  font-size: 2.5rem;
}
</style>
