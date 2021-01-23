import Vue from 'vue'
import VueRouter from 'vue-router'

// 分頁
import Home from '@/views/Home'
import Article from '@/views/Article'
import Welcome from '@/views/Welcome'
import Login from '@/views/Login'
import Admin from '@/views/Admin'


// firebase
import store from '@/store'
import Cookies from 'js-cookie'


Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'welcome',
        component: Welcome,
        meta: { requiresAuth: true },
      },
      {
        path: 'article',
        name: 'article',
        component: Article,
        meta: { requiresAuth: true },
      },
      {
        path: 'admin',
        name: 'admin',
        component: Admin,
        meta: { requiresAuth: true },
      },
    ]
  },
  {
    path: '/login',
    name: "login",
    component: Login,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  let User = store.state.userUid || Cookies.get('UID');

  if (to.meta.requiresAuth) {
    if (!User) {
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
