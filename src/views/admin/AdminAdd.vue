<template>
  <div class="admin-form">
    <validation-observer
      class="admin-form__content"
      tag="form"
      ref="form"
      @submit.prevent="addAdmin"
    >
      <validation-provider
        class="admin-form__group"
        v-slot="{ errors }"
        tag="div"
        rules="required"
        mode="lazy"
      >
        <label for="" class="admin-form__group__title">管理員名稱</label>
        <input
          type="text"
          class="admin-form__group__input bo-input"
          placeholder="請輸入名稱"
          v-model="adminData.name"
        />
        <p class="admin-form__error">{{ errors[0] }}</p>
      </validation-provider>
      <validation-provider
        class="admin-form__group"
        v-slot="{ errors }"
        tag="div"
        rules="required|email"
        mode="lazy"
      >
        <label for="" class="admin-form__group__title">管理員帳號</label>
        <input
          type="text"
          class="admin-form__group__input bo-input"
          placeholder="請輸入Email"
          v-model="adminData.email"
        />
        <p class="admin-form__error">{{ errors[0] }}</p>
      </validation-provider>
      <validation-provider
        class="admin-form__group"
        v-slot="{ errors }"
        tag="div"
        rules="required|password"
        mode="lazy"
      >
        <label for="" class="admin-form__group__title">管理員密碼</label>
        <input
          type="text"
          class="admin-form__group__input bo-input"
          placeholder="請輸入密碼"
          v-model="adminData.password"
        />
        <p class="admin-form__error">{{ errors[0] }}</p>
      </validation-provider>
      <!-- 按鈕 -->
      <button class="bo-button">新增</button>
    </validation-observer>
  </div>
</template>

<script>
import { isLoading } from '@/assets/js/function.js'
import { User } from '@/db'
export default {
  name: 'adminAdd',
  data() {
    return {
      adminData: {
        name: '',
        email: '',
        password: '',
        time: +new Date(),
      },
    }
  },
  methods: {
    addAdmin() {
      this.$refs.form.validate().then((success) => {
        if (!success) return
        User.createUserWithEmailAndPassword(
          this.adminData.email,
          this.adminData.password
        )
          .then(() => {
            this.MessageDialog('success', '帳號新增成成功', true)
          })
          .catch((error) => {
            this.MessageDialog('error', error.message, true)
          })
      })
    },
  },
  mixins: [isLoading],
}
</script>

<style lang="scss" scoped>
.admin-form {
  padding: 30px 35px;

  &__content {
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.548);
    box-shadow: 0 0 7px rgb(206, 201, 201);
    border-radius: 15px;

    .admin-form__group {
      // border: 1px solid red;
      margin-bottom: 10px;

      &__title {
        display: inline-block;
        margin-bottom: 10px;
      }

      &__input {
        width: 100%;
      }
    }
  }

  //錯誤訊息
  &__error {
    height: 20px;
    font-size: 12px;
    color: $sub-color-red;
  }
}
</style>
