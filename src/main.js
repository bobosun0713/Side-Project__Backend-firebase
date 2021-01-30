import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入共用sass
import '@/assets/scss/main.scss'

// 共用method / computed
import '@/assets/js/function.js'

// firebase 資料庫
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

// 引用element ui
import '@/assets/js/element.js'

// editor 編輯器
import '@/assets/js/editor.js'

// fontawesome
import '@/assets/js/fontawesome.js'

// veeValidate 驗證表單
import '@/assets/js/vee-validation.js'

// moment
import '@/assets/js/moment.js'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
