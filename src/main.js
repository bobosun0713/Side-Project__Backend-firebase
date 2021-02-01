import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/vuex/store'

// 引入共用sass
import '@/assets/scss/main.scss'

// firebase 資料庫
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

// 引用element ui
import '@/js/element.js'

// editor 編輯器
import '@/js/editor.js'

// fontawesome
import '@/js/fontawesome.js'

// veeValidate 驗證表單
import '@/js/vee-validation.js'

// moment
import '@/js/moment.js'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
