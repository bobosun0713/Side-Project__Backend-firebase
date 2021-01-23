import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import { storageRef, collection, User } from '@/db.js'
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
        customClass: "test"

      })
    },

    DeleteMsg(title, id, imgName) {
      this.$confirm(`刪除這篇『${title}』文章?`, '刪除通知', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          storageRef.child(`image/${imgName}`).delete();
          collection.doc(id).delete();
          this.MessageDialog('success', '刪除成功!', false);
        })
        .catch(() => this.MessageDialog('info', '取消刪除!', false))
    },


    SignOut() {
      this.$confirm(`確定登出?`, '登出', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          User.signOut().then(() => {
            this.$store.dispatch("removeUid");
            this.MessageDialog('success', '已登出', false)
            this.$router.push({ path: "/" });
          });
        })
        .catch(() => {
          this.MessageDialog('error', '無預期錯誤，再試一次!', false);
        })
    }
  },
}
Vue.mixin(GlobalElement)