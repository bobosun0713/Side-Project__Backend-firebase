<template>
  <div class="login">
    <div class="login-wrapper">
      <img class="login-image" src="../assets/image/login.gif" alt="" />
      <validation-observer
        ref="form"
        class="login-form"
        tag="form"
        @submit.prevent="submitAction"
      >
        <h2 class="login-form-title">BoBo</h2>
        <validation-provider
          v-slot="{ errors }"
          class="login-form-group"
          tag="div"
          rules="required|email"
          mode="lazy"
        >
          <input
            v-model.trim="email"
            class="login-form-group__input"
            type="text"
            placeholder="帳號"
          />
          <transition name="error">
            <p v-if="errors[0]" class="error__message login-form-group__error">
              {{ errors[0] }}
            </p>
          </transition>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          class="login-form-group"
          tag="div"
          rules="required|password"
          mode="lazy"
        >
          <input
            v-model.trim="password"
            class="login-form-group__input"
            type="password"
            placeholder="密碼"
          />
          <transition name="error">
            <p v-if="errors[0]" class="error__message login-form-group__error">
              {{ errors[0] }}
            </p>
          </transition>
        </validation-provider>

        <button class="bo-button--login bo-button--blue">LOGIN</button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import MessageDialog from '@/js/message.js'
import { User } from '@/db'
export default {
  name: 'Login',
  mixins: [MessageDialog],
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    // 送出
    submitAction() {
      this.$refs.form.validate().then((success) => {
        if (!success) return
        this.signIn()
      })
    },

    // 登入函式
    signIn() {
      User.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.dispatch('signIn', User.currentUser.uid)
          this.$router.push({ path: '/' })
          this.MessageDialog('success', '登入成功', false)
        })
        .catch(() => {
          this.MessageDialog('error', '登入失敗，再試一次！', false)
        })
    },
  },
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background-color: map-get($theme-colors, light-white);
  display: flex;
  align-items: center;
  justify-content: center;

  &-wrapper {
    width: 700px;
    display: flex;
    justify-content: center;
    background-color: map-get($theme-colors, 'white');
    padding: 25px;
    border-radius: 15px;
    box-shadow: 5px 5px 8px map-get($theme-colors, shadow);
  }

  // 圖片
  &-image {
    width: 300px;
  }

  // 表單
  &-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // 標題
    &-title {
      font-size: 2.5rem;
      background: linear-gradient(to right, #41b883, #708fb1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
    }

    &-group {
      width: 230px;
      position: relative;
      margin-bottom: 30px;

      // 輸入框
      &__input {
        width: 100%;
        background-color: #f0f0f0;
        border: 0;
        padding: 12px 25px;
        border-radius: 25px;
        font-size: 14px;
      }

      // 錯誤訊息
      &__error {
        padding-left: 15px;
      }
    }

    // 按鈕
    &-button {
      cursor: pointer;
      padding: 9px 20px;
      border: 0;
      border-radius: 20px;
      box-shadow: 1.5px 1.5px 3px map-get($theme-colors, shadow);
      background-color: map-get($theme-colors, light-blue);
      color: map-get($theme-colors, 'white');
      transition: all 0.5s;
      &:active {
        transform: translateY(1.5px);
        box-shadow: unset;
      }
    }
  }
}
</style>
