import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import { storageRef, collection } from '@/db.js'
export const GlobalMixin = {
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

    DeleteMsg(title, id, imgName) {
      this.$confirm(`刪除這篇『${title}』文章?`, '刪除通知', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          storageRef.child(`image/${imgName}`).delete()
          collection.doc(id).delete()
          this.$message({
            type: 'success',
            message: '刪除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消刪除',
          })
        })
    },
  },
}
Vue.mixin(GlobalMixin)