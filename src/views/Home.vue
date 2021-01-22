<template>
  <div class="home">
    <h1>這是首頁</h1>
    <button @click="backLogin">登出</button>
  </div>
</template>

<script>
import { User } from '@/db'

export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    backLogin() {
      User.signOut().then(() => {
        console.log('登出')
        this.MessageDialog('success', '已登出成功！', true)
        this.$router.push('/login')
      })
    },
  },
}
</script>

<style></style>
