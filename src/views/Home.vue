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
      })
    },
  },
}
</script>

<style></style>
