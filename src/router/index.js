import Vue from 'vue'
import VueRouter from 'vue-router'

// 分頁
import Home from '@/views/Home.vue'
import Article from '@/views/Article.vue'
import Login from '@/views/Login.vue'

// firebase
import { db, repairsCollection, storageRef, User } from '@/db'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/article',
    name: 'article',
    component: Article,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '*',
    redirect: '/login',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!User.currentUser) {
      console.log('導入登入頁');
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
