import Vue from 'vue'
import VueRouter from 'vue-router'

// 分頁
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

// firebase
import { db, repairsCollection, storageRef } from '@/db'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '*',
  //   redirect: 'Login',
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  // 看看 to 和 from 兩個 arguments 會吐回什麼訊息
  console.log('to: ', to)
  console.log('from: ', from)

  next()

})

export default router
