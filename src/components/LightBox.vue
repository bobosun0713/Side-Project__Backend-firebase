<template>
  <transition name="opacity">
    <div class="dialog">
      <div class="dialog-form">
        <div class="dialog-form__header">
          <p class="dialog-form__header__title">上傳文章</p>
          <div class="dialog-form__header__cancel" @click="closeDialog"></div>
        </div>
        <div class="dialog-form__body">
          <validation-provider>
            <div class="dialog-form__group">
              <label for="">文章標題</label>
              <input id="" v-model="propsChoose.title" type="text" name="" />
            </div>
          </validation-provider>
          <div class="dialog-form__group">
            <editor v-model="propsChoose.content"></editor>
          </div>
          <div class="dialog-form__group">
            <label for="">上傳圖片</label>
            <input ref="imgFile" type="file" @change="getImageFile" />
          </div>
        </div>
        <div class="dialog-form__footer">
          <button class="dialog-form__footer__button" @click="TypeAction">
            送出
          </button>
          <button class="dialog-form__footer__button" @click="closeDialog">
            取消
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { collection, storageRef } from '@/db'
import Editor from '@/components/Editor.vue'

export default {
  name: 'LightBox',
  components: {
    Editor,
  },

  props: {
    boxDate: {
      type: Object,
      default() {
        return {}
      },
    },
    articleData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      // 新增時使用
      dialogData: {
        title: '',
        time: +new Date(),
        content: '',
        imgName: '',
        imgUrl: '',
      },
      // 修改照片時時判斷，
      editBeforeImg: false,
    }
  },
  computed: {
    // 判斷是否新增或修改，調用不同的資料
    propsChoose() {
      return Object.keys(this.boxDate).length === 0
        ? this.dialogData
        : this.boxDate
    },

    // 自定義ID
    getMaxId() {
      let maxId = Math.max(...this.articleData.map((val) => val.id))
      return maxId <= 0 ? '1' : String(maxId + 1)
    },
  },
  methods: {
    // 關閉跳窗
    closeDialog() {
      this.$emit('close-dialog')
    },

    // 送出動作
    TypeAction() {
      Object.keys(this.boxDate).length === 0
        ? this.addAction()
        : this.editAction()
    },

    // 新增
    async addAction() {
      if (
        this.propsChoose.title === '' ||
        this.propsChoose.content === '' ||
        this.propsChoose.imgName === ''
      ) {
        return this.MessageDialog('error', '請完整填寫內容喔!', true)
      }
      this.closeDialog()

      // 先上傳圖片
      await this.upLoadImage()

      // 取得完圖片網址，並新增這筆資料
      collection.doc(this.getMaxId).set(this.propsChoose)
      this.MessageDialog('success', '新增成功', true)
    },

    // 修改
    async editAction() {
      // 再次點擊上傳照片時變 ture 所以執行上傳照片。
      if (this.editBeforeImg) {
        // console.log("更新照片");
        await this.upLoadImage()
      }

      // 用上層傳來的props，IDKey來修改值
      // console.log("上傳");
      collection.doc(this.propsChoose.id).update(this.propsChoose)
      this.MessageDialog('success', '修改成功', true)
      this.closeDialog()
    },

    // 取得照片資訊
    getImageFile() {
      let imgFile = this.$refs.imgFile.files[0]
      this.editBeforeImg = true
      this.propsChoose.imgName = this.propsChoose.time
      this.propsChoose.imgUrl = imgFile
    },

    // 上傳照片處理
    async upLoadImage() {
      // 先上傳圖片
      await storageRef
        .child('image/' + this.propsChoose.imgName)
        .put(this.propsChoose.imgUrl)

      // 上傳完畢,取得圖片網址
      await storageRef
        .child('image/' + this.propsChoose.imgName)
        .getDownloadURL()
        .then((downloadUrl) => {
          this.propsChoose.imgUrl = downloadUrl
        })
    },
  },
  // mixins: [MessagePlugin],
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.39);

  // display: none;
  display: flex;
  align-items: center;

  &-form {
    margin: 0 auto;
    background-color: #fff;
    width: 800px;
    // height: 600px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgb(80, 77, 77);

    display: flex;
    flex-direction: column;

    &__header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid;
      padding: 15px;

      &__title {
        font-size: 1.25rem;
      }

      &__cancel {
        width: 30px;
        height: 30px;
        position: relative;
        cursor: pointer;

        &::before,
        &::after {
          content: '';
          position: absolute;
          display: block;
          width: 20px;
          height: 3px;
          background-color: black;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }

        &::before {
          transform: rotate(45deg);
        }
        &::after {
          transform: rotate(135deg);
        }
      }
    }

    &__body {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      // justify-content: space-around;

      .dialog-form__group {
        margin-bottom: 20px;
        // border: 1px solid red;

        > label {
          display: block;
          width: 100px;
          margin-bottom: 8px;
        }

        > input {
          width: 100%;
          padding: 10px;
        }

        > textarea {
          width: 100%;
          max-width: 100%;
          height: 200px;
          padding: 10px;
        }
      }
    }

    &__footer {
      border-top: 1px solid;
      text-align: center;
      padding: 10px 0;

      &__button {
        border: 0;
        border-radius: 5px;
        margin: 0 5px;
        padding: 8px 16px;
        background-color: #35495e;
        color: white;
        cursor: pointer;

        &:nth-of-type(2) {
          background-color: rgb(231, 116, 116);
        }
      }
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
