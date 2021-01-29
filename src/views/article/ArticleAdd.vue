<template>
  <validation-observer
    ref="form"
    class="article-form"
    tag="form"
    @submit.prevent="SubmitAction"
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
      <p class="article-form-group__error">{{ errors[0] }}</p>
    </validation-provider>
    <!-- 圖片 -->
    <validation-provider
      v-slot="{ errors }"
      ref="img"
      class="article-form-group"
      tag="div"
      rules="required"
      mode="lazy"
    >
      <label class="article-form-group__title">圖片上傳</label>
      <div class="article-form-group__upload">
        <label class="article-form-group__upload__label" for="img_file">
          <img
            v-show="articleData.imgUrl"
            class="article-form-group__upload__img"
            :src="articleData.imgUrl"/>
          <font-awesome-icon
            icon="images"
            class="icon-upload"
          ></font-awesome-icon
        ></label>

        <input
          id="img_file"
          type="file"
          class="article-form-group__upload__file"
          @change="getImageFile"
        />
      </div>
      <p class="article-form-group__error">{{ errors[0] }}</p>
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
      <p class="article-form-group__error">{{ errors[0] }}</p>
    </validation-provider>
    <!-- 按鈕 -->
    <button class="bo-button">送出</button>
  </validation-observer>
</template>

<script>
import Editor from '@/components/article/Editor.vue'
import { collection, storageRef, collectionOrder } from '@/db'
import { isLoading } from '@/assets/js/function.js'

export default {
  name: 'ArticleAdd',
  components: {
    Editor,
  },
  mixins: [isLoading],
  data() {
    return {
      action: '',
      articleId: 0,
      articleData: {
        title: '',
        time: +new Date(),
        content: '',
        imgUrl: '',
      },
    }
  },
  mounted() {
    this.action = this.$route.path.split('/')[2]
    // 新增（創建id） 或 修改(讀取資料)
    this.action === 'add' ? this.setArticleId() : this.editData()
  },
  methods: {
    SubmitAction() {
      this.$refs.form.validate().then((success) => {
        if (!success) return
        this.action === 'add' ? this.addArticle() : this.editAction()
      })
    },

    // 新增
    addArticle() {
      // loading
      this.isLoading()
      // 上傳照片
      this.upLoadImage()

      // 取得完圖片網址，並新增這筆資料
      collection.doc(this.articleId).set(this.articleData)
      // close-loading
      this.loading.close()
      this.MessageDialog('success', '新增成功', true)
      this.$router.push('/article/list')
    },

    // 上傳圖片
    async upLoadImage() {
      // 上傳到storage
      await storageRef
        .child('image/' + this.articleData.time)
        .putString(this.articleData.imgUrl.split(',')[1], 'base64', {
          contentType: 'image/jpg',
        })

      // 獲取到的url塞回資料裡
      await storageRef
        .child('image/' + this.articleData.time)
        .getDownloadURL()
        .then((downloadUrl) => {
          this.articleData.imgUrl = downloadUrl
        })
    },

    // 取得照片數據
    getImageFile(e) {
      this.$refs.img.validate(e)
      let imgFile = e.target.files[0]
      let file = new FileReader()
      file.readAsDataURL(imgFile)
      file.onload = (e) => {
        this.articleData.imgUrl = e.target.result
      }
    },

    // 修改
    editAction() {
      // loading
      this.isLoading()
      this.upLoadImage()
      // close-loading
      this.loading.close()
      collection.doc(this.$route.path.split('/')[3]).update(this.articleData)
      this.MessageDialog('success', '修改成功', true)
      this.$router.push('/article/list')
    },

    // 取得修改資料
    editData() {
      collection
        .doc(this.$route.path.split('/')[3])
        .get()
        .then((doc) => {
          this.articleData = { ...doc.data() }
          // console.log('修改', this.articleData)
        })
    },
    // 創建id
    setArticleId() {
      collectionOrder.get().then((doc) => {
        let maxId = Math.max(...doc.docs.map((val) => val.id))
        this.articleId = maxId <= 0 ? '1' : String(maxId + 1)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.article-form {
  margin: 30px 35px;
  padding: 20px 25px;
  background-color: white;
  border-radius: 15px;

  &-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

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
      &__file {
        display: none;
      }
    }

    // 錯誤訊息
    &__error {
      height: 20px;
      font-size: 12px;
      color: $sub-color-red;
    }
  }
}
</style>
