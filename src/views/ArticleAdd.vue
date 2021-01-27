<template>
  <div class="article-form">
    <div class="article-form__content">
      <div class="article-form__group">
        <label class="article-form__group__label" for="img_file">
          <img :src="imgUrl" alt="" />
        </label>
        <input
          class="article-form__group__file"
          type="file"
          name=""
          id="img_file"
          @change="uploadImg"
        />
      </div>
      <div class="article-form__group">
        <input type="text" class="article-form__group__input" />
        <editor></editor>
        <button class=" bo-button--logout">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
export default {
  name: 'ArticleAdd',
  components: {
    Editor,
    data() {
      return {
        imgUrl: '',
      }
    },
  },
  methods: {
    uploadImg(e) {
      let imgFile = e.target.files[0]
      console.log(imgFile)
      let file = new FileReader()
      file.readAsDataURL(imgFile)
      file.onload = (e) => {
        console.log(e.target.result)
        this.imgUrl = e.target.result
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.article-form {
  padding: 30px 35px;

  &__content {
    padding: 15px;
    height: 500px;
    background-color: white;
    border-radius: 15px;
    display: flex;
  }
  &__group {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &:first-child {
      margin-right: 15px;
    }

    // 圖片
    &__label {
      width: 100%;
      height: 100%;
      border: 0.5px solid #888;
      border-radius: 5px;
    }

    &__file {
      display: none;
    }

    // 標題
    &__input {
      padding: 8px;
    }
  }
}
</style>
