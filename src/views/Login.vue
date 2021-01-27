<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form__header">
        <img
          class="login-form__header__img"
          src="../assets/image/login-2.gif"
          alt=""
        />
      </div>
      <validation-observer
        class="login-form__body"
        tag="form"
        ref="form"
        @submit.prevent="SubmitAction"
      >
        <div class="login-form__item login-form__margin">
          <h2 class="login-form__title">BoBo</h2>
        </div>
        <login-input
          v-model="email"
          :type="{ type: 'text', name: '帳號', rules: 'required|email' }"
        ></login-input>
        <login-input
          v-model="password"
          :type="{ type: 'password', name: '密碼', rules: 'required|password' }"
        ></login-input>
        <div class="login-form__item">
          <button class="long-form__button">Sing In</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import LoginInput from '@/components/login/LoginInput.vue'
import { User } from '@/db'

export default {
  name: 'Login',
  components: {
    LoginInput,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    // 送出
    SubmitAction() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          this.email = this.password = ''
          return this.MessageDialog('error', '請輸入帳號或密碼！', true)
        }
        this.SingIn()
      })
    },
    // 登入函式
    SingIn() {
      User.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // 成功登入 並傳入至vuex 存UID來當作登入判斷
          let UID = User.currentUser.uid
          this.$store.dispatch('loginAction', UID)
          this.$router.push({ path: '/' })
          this.MessageDialog('success', '登入成功', true)
        })
        .catch(() => {
          this.email = this.password = ''
          this.MessageDialog('error', '登入失敗，再試一次！', true)
        })
    },
  },
}
</script>

<style lang="scss">
.login {
  //   border: 1px solid;
  width: 100%;
  height: 100vh;
  background-color: $main-color-bg;
  display: flex;
  align-items: center;
  justify-content: center;

  &-form {
    width: 700px;
    display: flex;
    justify-content: space-around;
    background-color: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 5px 5px 8px rgb(223, 219, 219);

    // 圖片
    &__header {
      width: 100%;
      &__img {
        width: 300px;
      }
    }

    // 內容
    &__body {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}

// 標題
.login-form__title {
  font-size: 2.5rem;
  background: linear-gradient(to right, #41b883, #708fb1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

// 輸入框
.login-form__input {
  width: 100%;
  border: 0.5px solid #888;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 14px;

  // Error
  &__error {
    text-align: left;
    margin-top: 2.5px;
    padding-left: 15px;
    font-size: 12px;
    height: 15px;
    color: red;
  }
}

// 按鈕
.long-form__button {
  cursor: pointer;
  padding: 9px 20px;
  border: 0;

  border-radius: 20px;
  box-shadow: 1.5px 1.5px 3px rgb(163, 160, 160);
  background-color: $sub-color-blue;
  color: white;
  transition: all 0.5s;

  &:active {
    transform: translateY(1.5px);
    box-shadow: 0 0 0;
  }
}

//寬度
.login-form__item {
  width: 230px;
  text-align: center;
}

// 間距
.login-form__margin {
  margin-bottom: 10px;
  &:first-child {
    margin-bottom: 25px;
  }
}
</style>
