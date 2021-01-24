<template>
  <div class="login">
    <div class="login-form">
      <!-- <button @click="test">測試轉址</button> -->
      <!-- <button @click="SignOut">登出</button> -->
      <!-- <button @click="checkUser">登入資訊</button> -->
      <div class="login-form__header login-form--margin">
        <img
          class="login-form__header__img"
          src="../assets/image/logo-gif.gif"
          alt=""
        />
      </div>
      <validation-observer
        class="login-form__body login-form--margin"
        tag="form"
        ref="form"
        @submit.prevent="SubmitAction()"
      >
        <login-input
          v-model="email"
          :type="{ type: 'text', name: '帳號', rules: 'required|email' }"
        ></login-input>
        <login-input
          v-model="password"
          :type="{ type: 'password', name: '密碼', rules: 'required|password' }"
        ></login-input>
        <div class="login-form__body-group">
          <button type="submit" class="login-form__footer__button">登入</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import LoginInput from "@/components/login/LoginInput.vue";
import { User } from "@/db";

export default {
  name: "Login",
  components: {
    LoginInput,
  },
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
        if (!success) {
          this.email = this.password = "";
          return this.MessageDialog("error", "請輸入帳號或密碼！", true);
        }
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
          this.email = this.password = "";
          this.MessageDialog("error", "登入失敗，再試一次！", true);
        });
    },
  },
};
</script>

<style lang="scss">
.login {
  top: 0;
  left: 0;
  z-index: 10;
  position: fixed;
  // background: linear-gradient(120deg, #35495e, #41b883);
  background: url('~@/assets/image/vue.jpg') no-repeat center center;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  &-form {
    background-color: white;
    box-shadow: 0 0 17px #527C78;
    border: 5px solid #527C78;
    border-radius: 20px;
    margin: 0 auto;
    width: 350px;
    display: flex;
    align-items: center;
    flex-direction: column;

    // 共用
    &--margin {
      margin-bottom: 25px;
    }

    // header
    &__header {
      // border: 1px solid;
      margin: 15px auto;

      &__img {
        // border: 1px solid;
        object-fit: cover;
        width: 170px;
        height: 170px;
      }
    }

    // body
    &__body {
      width: 100%;

      // 輸入區域
      &-group {
        width: 100%;
        text-align: center;
        &:not(:last-child) {
          margin-bottom: 15px;
        }

        // 輸入名稱
        &__title {
          width: 30%;
          font-size: 1.125rem;
          font-weight: bold;
        }

        // 輸入框
        &__input {
          width: 70%;
          padding: 5px 0 5px 15px;
          border-radius: 20px;
          border: 0;
          box-shadow: 0 0 3px rgb(106, 103, 103);
          font-size: 1rem;
          transform: all 0.5s;
        }

        // 輸入框錯誤題時
        .error-input {
          border: 0;
          box-shadow: 0 0 3px red;
        }

        // 錯誤訊息
        &__error {
          text-align: left;
          margin-top: 5px;
          width: 180px;
          margin: 5px auto 0;
          // margin-left: -40px;
          color: rgb(228, 15, 15);
        }
      }
    }

    // footer
    &__footer {
      // 登入
      &__button {
        background-color: #41b883;
        box-shadow: 1px 1px 5px rgb(121, 119, 119);
        border: 0;
        border-radius: 5px;
        padding: 8px 16px;
        color: white;
        font-weight: bold;
        transition: all 0.3s;
        cursor: pointer;

        &:active {
          box-shadow: unset;
          transform: translateY(1px);
          background-color: #35495e;
        }
      }
    }
  }
}
</style>
