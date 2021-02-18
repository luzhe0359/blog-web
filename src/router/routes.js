
const routes = [
  // 首页
  {
    path: '/',
    name: 'Layout',
    redirect: 'home',
    meta: {
      title: '布局',
      icon: 'home',
      menu: true,
      keepAlive: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'home',
          menu: true,
          keepAlive: true
        },
        component: () => import('pages/Home.vue')
      },
      {
        path: 'article',
        name: 'Article',
        meta: {
          title: '文章',
          icon: 'home',
          menu: true,
          keepAlive: true
        },
        component: () => import('pages/Article/ArticleList.vue')
      },
      {
        path: 'articleDetail/:_id',
        name: 'ArticleDetail',
        meta: {
          title: '文章详情',
          icon: 'home',
          menu: false,
          keepAlive: true
        },
        component: () => import('pages/Article/ArticleDetail.vue')
      },
      {
        path: 'photo',
        name: 'Photo',
        meta: {
          title: '照片',
          icon: 'home',
          menu: true,
          keepAlive: true
        },
        component: () => import('pages/Home.vue')
      },
      {
        path: 'about',
        name: 'About',
        meta: {
          title: '关于',
          icon: 'home',
          menu: true,
          keepAlive: true
        },
        component: () => import('pages/Home.vue')
      },
      {
        path: 'link',
        name: 'Link',
        meta: {
          title: '友链',
          icon: 'home',
          menu: true,
          keepAlive: true
        },
        component: () => import('pages/Home.vue')
      },
      {
        path: 'user',
        name: 'User',
        meta: {
          title: '个人中心',
          icon: 'user',
          menu: false,
          keepAlive: true
        },
        component: () => import('pages/UserInfo.vue')
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      icon: 'home',
      menu: false,
      keepAlive: false
    },
    component: () => import('pages/Login.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/Error500',
    name: 'Error500',
    meta: {
      title: '500',
      icon: 'error',
      menu: false,
      keepAlive: false
    },
    component: () => import('pages/Error500.vue')
  },
  {
    path: '*',
    name: 'All',
    meta: {
      title: '404',
      icon: 'error',
      menu: false,
      keepAlive: false
    },
    component: () => import('pages/Error404.vue')
  }
]

// Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     name: 'all',
//     meta: {
//       title: '404',
//       icon: 'error',
//       menu: false
//     },
//     component: () => import('pages/Error404.vue')
//   })
// }

export default routes
