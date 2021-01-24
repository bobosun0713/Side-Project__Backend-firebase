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
    meta: {
      breadcrumb: [{
        name: '首頁',
      }]
    },
    children: [
      {
        path: '',
        name: 'welcome',
        component: Welcome,
        meta: {
          requiresAuth: true,
          breadcrumb: [{
            name: '首頁',
          }]
        },
      },
      {
        path: 'article',
        name: 'article',
        component: Article,
        meta: {
          requiresAuth: true,
          breadcrumb: [{
            name: '首頁',
            link: '/'
          },
          { name: '文章管理' },
          { name: '文章列表' }]
        },
      },
      {
        path: 'admin',
        name: 'admin',
        component: Admin,
        meta: {
          requiresAuth: true,
          breadcrumb: [{
            name: '首頁',
            link: '/'
          },
          { name: '管理員' }]
        },
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

// router.beforeEach((to, from, next) => {

//   let User = store.state.userUid || Cookies.get('UID');
//   if (to.meta.requiresAuth) {
//     if (!User) {
//       console.log('導入登入頁');
//       next('/login')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
