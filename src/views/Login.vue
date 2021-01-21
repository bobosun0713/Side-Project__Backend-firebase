<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form__header login-form--margin">
        <img
          class="login-form__header__img"
          src="../assets/logo-gif.gif"
          alt=""
        />
      </div>
      <div class="login-form__body login-form--margin">
        <div class="login-form__body-group">
          <label class="login-form__body-group__title" for="">帳號: </label>
          <input
            class="login-form__body-group__input"
            type="text"
            v-model="email"
            placeholder="請輸入email"
          />
        </div>
        <div class="login-form__body-group">
          <label class="login-form__body-group__title" for="">密碼: </label>
          <input
            class="login-form__body-group__input"
            type="text"
            v-model="password"
            placeholder="請輸入密碼"
          />
        </div>
      </div>
      <div class="login-form__footer login-form--margin">
        <button class="login-form__footer__button" @click="singIn">登入</button>
      </div>
    </div>
  </div>
</template>

<script>
import MessagePlugin from "@/assets/js/element.js";
import VueRouter from "vue-router";

import { login } from "@/db";
export default {
  name: "Login",
  datr() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    singIn() {
      login
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("登入成功");
          $route.push({ path: "/" });
          this.MessageDialog("success", "登入成功", true);
        })
        .catch(() => {
          this.MessageDialog("error", "登入失敗", true);

          // this.$router.push({ path: "home" });

          console.log("登入失敗");
        });
    },
    checkUser() {
      let a = login.currentUser;
      if (a) {
        // User is signed in.
        console.log(a);
      } else {
        // No user is signed in.
        console.log(a);
      }
    },
    SignOut() {
      login.signOut().then(() => {
        console.log("登出");
        this.checkUser();
      });
    },
  },
  mixins: [MessagePlugin],
};
</script>

<style lang="scss" scoped>
.login {
  top: 0;
  left: 0;
  z-index: 10;
  position: fixed;
  background: linear-gradient(120deg, #35495e, #41b883);
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  &-form {
    background-color: white;
    box-shadow: 0 0 10px black;
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

      // 輸入框
      &-group {
        width: 100%;
        text-align: center;
        &:first-child {
          margin-bottom: 10px;
        }

        &__title {
          width: 30%;
          font-size: 1.125rem;
          font-weight: bold;
        }
        &__input {
          width: 70%;
          padding: 5px 0 5px 15px;
          border-radius: 20px;
          border: 1px solid #888;
          font-size: 1rem;
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