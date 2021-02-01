<template>
  <validation-observer
    ref="form"
    class="article-form"
    tag="form"
    @submit.prevent="submitAction"
  >
    <!-- 標題 -->
    <validation-provider
      v-slot="{ errors }"
      class="article-form-group"
      tag="div"
      rules="required"
      mode="lazy"
    >
      <label class="article-form-group__title" for="">文章標題</label>
      <input
        v-model="articleData.title"
        type="text"
        class="article-form-group__input bo-input"
      />
      <transition name="error">
        <p v-if="errors[0]" class="error__message">
          {{ errors[0] }}
        </p>
      </transition>
    </validation-provider>
    <!-- 圖片 -->
    <validation-provider
      v-slot="{ errors }"
      ref="img"
      class="article-form-group"
      tag="div"
      rules="image"
      mode="lazy"
    >
      <label class="article-form-group__title">圖片上傳</label>
      <div class="article-form-group__upload">
        <div
          v-for="(image, idx) in articleData.imgUrl"
          :key="idx"
          class="article-form-group__upload-item"
        >
          <img :src="image" class="article-form-group__upload-item__img" />
          <span
            class="article-form-group__upload-item__button"
            @click="deleteImg(image)"
          ></span>
        </div>

        <label
          v-if="articleData.imgUrl.length !== 10"
          class="article-form-group__upload__label"
          for="img_file"
        >
          <font-awesome-icon
            icon="images"
            class="icon-upload"
          ></font-awesome-icon
        ></label>
        <input
          id="img_file"
          type="file"
          class="article-form-group__upload__file"
          multiple="multiple"
          @change="getImageFile"
        />
        <input v-model="articleData.imgUrl" type="hidden" />
      </div>
      <transition name="error">
        <p v-if="errors[0]" class="error__message">
          {{ errors[0] }}
        </p>
      </transition>
    </validation-provider>
    <!-- 內容 -->
    <validation-provider
      v-slot="{ errors }"
      class="article-form-group"
      tag="div"
      rules="required"
      mode="lazy"
    >
      <label class="article-form-group__title" for="">文章標題</label>
      <editor v-model="articleData.content"></editor>
      <transition name="error">
        <p v-if="errors[0]" class="error__message">
          {{ errors[0] }}
        </p>
      </transition>
    </validation-provider>
    <!-- 按鈕 -->
    <button class="bo-button bo-button--dark-blue">送出</button>
  </validation-observer>
</template>

<script>
import Editor from '@/components/article/Editor.vue'
import { collection, storageRef, collectionOrder } from '@/db'
import IsLoading from '@/js/loading.js'
import MessageDialog from '@/js/message.js'

export default {
  name: 'ArticleAdd',
  components: {
    Editor,
  },
  mixins: [IsLoading, MessageDialog],
  data() {
    return {
      articleId: 0,
      deleteInfo: [],
      articleData: {
        title: '',
        time: +new Date(),
        content: '',
        imgUrl: [],
      },
    }
  },

  watch: {
    $route(newValue) {
      if (!newValue.params.id) return this.$router.go(0)
    },
  },
  mounted() {
    // 新增（創建id） 或 修改(讀取資料)
    !this.$route.params.id ? this.setArticleId() : this.editData()
  },

  methods: {
    submitAction() {
      this.$refs.form.validate().then((success) => {
        if (!success) return
        !this.$route.params.id ? this.addArticle() : this.editAction()
      })
    },

    // 新增
    async addArticle() {
      // loading
      this.IsLoading()
      // 上傳照片
      await this.upLoadImage()
      // 取得完圖片網址，並新增這筆資料
      collection.doc(this.articleId).set(this.articleData)
      // close-loading
      this.loading.close()
      this.MessageDialog('success', '新增成功', true)
      this.$router.push('/article/list')
    },

    // 取得照片數據
    getImageFile(e) {
      let imgFile = e.target.files
      imgFile.forEach((img) => {
        let file = new FileReader()
        file.readAsDataURL(img)
        file.onload = (e) => {
          this.articleData.imgUrl.push(e.target.result)
        }
      })
    },

    // 上傳圖片
    async upLoadImage() {
      for (let i = 0; i < this.articleData.imgUrl.length; i++) {
        let src = 'data:image'
        if (this.articleData.imgUrl[i].indexOf(src) !== -1) {
          console.log('進入')
          await storageRef
            .child('image/' + this.articleData.time + '-' + i)
            .putString(this.articleData.imgUrl[i].split(',')[1], 'base64', {
              contentType: 'image/jpg',
            })

          await storageRef
            .child('image/' + this.articleData.time + '-' + i)
            .getDownloadURL()
            .then((downloadUrl) => {
              this.articleData.imgUrl[i] = downloadUrl
            })
        }
      }
    },

    // 修改
    async editAction() {
      // loading
      this.IsLoading()
      await this.upLoadImage()

      collection.doc(this.$route.params.id).update(this.articleData)
      this.$router.push('/article/list')
      // close-loading
      this.loading.close()
      this.MessageDialog('success', '修改成功', true)
    },

    // 取得修改資料
    editData() {
      collection
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          this.articleData = { ...doc.data() }
        })
    },

    // 創建id
    setArticleId() {
      collectionOrder.get().then((doc) => {
        let maxId = Math.max(...doc.docs.map((val) => val.id))
        this.articleId = maxId <= 0 ? '1' : String(maxId + 1)
      })
    },

    deleteImg(data) {
      let deleteIndex = this.articleData.imgUrl.findIndex((img) => img === data)
      this.articleData.imgUrl.splice(deleteIndex, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.article-form {
  margin: 30px 35px;
  padding: 20px 25px;
  background-color: map-get($theme-colors, 'white');
  border-radius: 15px;

  &-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    position: relative;

    &__title {
      font-weight: 700;
      margin-bottom: 8px;
    }
    // 輸入框
    &__input {
      width: 100%;
    }

    // 圖片上傳
    &__upload {
      display: flex;
      flex-wrap: wrap;
      &-item {
        position: relative;

        &__img {
          border: 0.5px solid map-get($theme-colors, border);
          border-radius: 10px;
          width: 150px;
          height: 150px;
          margin: 5px;
        }

        &__button {
          cursor: pointer;
          top: 12px;
          right: 12px;
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          position: absolute;
          transition: transform 1s;

          &:hover {
            transform: rotate(360deg);
          }

          &::before,
          &::after {
            content: '';
            position: absolute;
            display: block;
            height: 3px;
            width: 80%;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            transform: rotate(45deg);
            background-color: black;
          }

          &::after {
            transform: rotate(-45deg);
          }
        }
      }

      &__label {
        border: 0.5px solid map-get($theme-colors, border);
        border-radius: 10px;
        display: inline-block;
        width: 150px;
        height: 150px;
        margin: 5px;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;
      }
      &__file {
        display: none;
      }
    }
  }
}
</style>
