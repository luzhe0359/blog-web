
const routes = [
  // 首页
  {
    path: '/',
    name: 'Layout',
    redirect: 'article',
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
          icon: 'icon-home',
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
          icon: 'icon-wenzhang',
          menu: true,
          keepAlive: true
        },
        component: () => import('pages/ArticleList.vue')
      },
      {
        path: 'articleDetail/:_id?',
        name: 'ArticleDetail',
        meta: {
          title: '文章详情',
          icon: 'home',
          menu: false,
          keepAlive: false
        },
        component: () => import('pages/ArticleDetail.vue')
      },
      {
        path: 'album',
        name: 'Album',
        meta: {
          title: '相册',
          icon: 'icon-xiangce',
          menu: true,
          keepAlive: true
        },
        component: () => import('src/pages/Album.vue')
      },
      {
        path: 'photo/:_id?',
        name: 'Photo',
        meta: {
          title: '照片',
          icon: 'home',
          menu: false,
          keepAlive: true
        },
        component: () => import('src/pages/Photo.vue')
      },
      {
        path: 'about',
        name: 'About',
        meta: {
          title: '关于',
          icon: 'icon-iconset0142',
          menu: true,
          keepAlive: true
        },
        component: () => import('pages/About.vue')
      },
      {
        path: 'link',
        name: 'Link',
        meta: {
          title: '友链',
          icon: 'icon-youlianguanliicon',
          menu: true,
          keepAlive: true
        },
        component: () => import('pages/Link.vue')
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
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/error500',
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
