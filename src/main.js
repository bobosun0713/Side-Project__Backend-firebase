import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入共用sass
import '@/assets/scss/main.scss'

// firebase
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

// 引用element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Main from '@/assets/js/element.js'

Vue.use(ElementUI)

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// editor
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入工具設定
// import editTool from '@/assets/js/edit.js'
// Vue.use(VueQuillEditor, { ...editTool })
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  Main,
  router,
  render: (h) => h(App),
}).$mount('#app')
