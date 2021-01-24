import Vue from 'vue'
import Vuex, { Store } from 'vuex';

import '@/assets/js/element.js'
import Cookies from 'js-cookie'
import { User } from "@/db";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userUid: '',
  },
  mutations: {
    loginSuccess(state, UID) {
      state.userUid = UID;
      Cookies.set('UID', state.userUid)
      console.log('state.userUid =>', state.userUid);
      console.log('cookie =>', Cookies.get('UID'));
    },
    logout(state) {
      state.userUid = '';
      Cookies.remove('UID')
    }


  },
  // 登入邏輯之後，更新頁面會員註冊時，再次重構把傳送會來資料由vuex來傳送
  actions: {
    loginAction({ commit }, UID) {
      commit('loginSuccess', UID)
    },
    removeUid({ commit }) {
      commit('logout')
    }
  }
})

export default store