import Vue from 'vue'
import VueRouter from 'vue-router'

// 分頁
import Home from '@/views/Home'
import Article from '@/views/Article'
import ArticleAdd from '@/views/ArticleAdd'
import Welcome from '@/views/Welcome'
import Login from '@/views/Login'
import Admin from '@/views/Admin'

Vue.use(VueRouter)

// 原定路由
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首頁',
      breadcrumb: [
        {
          name: '首頁',
        },
      ],
    },
    children: [
      {
        path: '',
        name: 'welcome',
        component: Welcome,
        meta: {
          title: '首頁',
          requiresAuth: true,
          breadcrumb: [
            {
              name: '首頁',
            },
          ],
        },
      },
      {
        path: 'article',
        name: 'article',
        component: Article,
        meta: {
          requiresAuth: true,
          title: '文章列表',
          breadcrumb: [
            {
              name: '首頁',
              link: '/',
            },
            { name: '文章管理' },
            { name: '文章列表' },
          ],
        },
      },
      {
        path: 'articleadd',
        name: 'articleadd',
        component: ArticleAdd,
        meta: {
          requiresAuth: true,
          title: '文章新增',
          breadcrumb: [
            {
              name: '首頁',
              link: '/',
            },
            { name: '文章管理' },
            { name: '新增文章' },
          ],
        },
      },
      {
        path: 'admin',
        name: 'admin',
        component: Admin,
        meta: {
          requiresAuth: true,
          title: '管理員專區',
          breadcrumb: [
            {
              name: '首頁',
              link: '/',
            },
            { name: '管理員' },
          ],
        },
      },
    ],
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

// router.beforeEach((to, from, next) => {
//   window.document.title = to.meta.title
//   let User = store.state.userUid || Cookies.get('UID')
//   if (to.meta.requiresAuth) {
//     if (!User) {
//       console.log('導入登入頁')
//       next('/login')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
