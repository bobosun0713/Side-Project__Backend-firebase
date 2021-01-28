<template>
  <div class="login">
    <div class="login-wrapper">
      <img class="login-image" src="../assets/image/login-2.gif" alt="" />
      <validation-observer
        class="login-form"
        tag="form"
        ref="form"
        @submit.prevent="SubmitAction"
      >
        <h2 class="login-form-title">BoBo</h2>
        <validation-provider
          class="login-form-group"
          v-slot="{ failed, errors }"
          tag="div"
          rules="required|email"
          mode="lazy"
        >
          <input
            class="login-form-group__input"
            type="text"
            placeholder="帳號"
            v-model="email"
          />
          <span class="login-form-group__error">{{ errors[0] }}</span>
        </validation-provider>

        <validation-provider
          class="login-form-group"
          v-slot="{ failed, errors }"
          tag="div"
          rules="required|password"
          mode="lazy"
        >
          <input
            class="login-form-group__input"
            type="text"
            placeholder="密碼"
            v-model="password"
          />
          <span class="login-form-group__error">{{ errors[0] }}</span>
        </validation-provider>

        <button class="login-form-button">LOGIN</button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { User } from "@/db";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    // 送出
    SubmitAction() {
      this.$refs.form.validate().then((success) => {
        if (!success) return;
        this.SingIn();
      });
    },
    // 登入函式
    SingIn() {
      User.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // 成功登入 並傳入至vuex 存UID來當作登入判斷
          let UID = User.currentUser.uid;
          this.$store.dispatch("loginAction", UID);
          this.$router.push({ path: "/" });
          this.MessageDialog("success", "登入成功", true);
        })
        .catch(() => {
          this.MessageDialog("error", "登入失敗，再試一次！", true);
        });
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background-color: $main-color-bg;
  display: flex;
  align-items: center;
  justify-content: center;

  &-wrapper {
    width: 700px;
    display: flex;
    justify-content: center;
    background-color: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 5px 5px 8px rgb(223, 219, 219);
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
      margin-bottom: 10px;

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
        display: inline-block;
        padding-left: 15px;
        font-size: 12px;
        color: $sub-color-red;
      }
    }

    // 按鈕
    &-button {
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
        box-shadow: unset;
      }
    }
  }
}
</style>
