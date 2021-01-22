import Vue from 'vue'
import VueRouter from 'vue-router'

// 分頁
import Home from '@/views/Home.vue'
import Article from '@/views/Article.vue'
import Login from '@/views/Login.vue'

// firebase
import { db, repairsCollection, storageRef, login } from '@/db'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/Login',
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/Article',
    name: 'Article',
    component: Article,
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log()
    if (!login.currentUser) {
      console.log('沒登入 不可以進入')
      next('*')
      // next({ name: 'Login' })
    } else {
      // next({ name: 'Home' })
      next()
      console.log('有登入 可以進入')
    }
  }
})

export default router
