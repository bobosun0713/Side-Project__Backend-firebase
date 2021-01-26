import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export const GlobalElement = {
  methods: {
    /*
      type: 'success' / 'warning' /'error'
    */
    MessageDialog(type, Meg, action) {
      this.$message({
        showClose: action,
        message: Meg,
        type: type,
      })
    },
  },
}
Vue.mixin(GlobalElement)
