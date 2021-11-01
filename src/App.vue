<template>
  <div id="q-app" v-cloak>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      title: ''
    }
  },
  watch: {
    $route: {
      handler (newVal) {
        this.title = newVal.meta.title
      },
      immediate: true
    }
  },
  created () {
    // 判断是否为客户端
    if (!process.env.CLIENT) return
    this.$nextTick(() => {
      document.body.removeChild(document.getElementById('app-loading'))
    })
  },
  mounted () {
  },
  meta () {
    return {
      // 设置文件标题
      title: this.title,
      // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
      titleTemplate: title => `${title} | ZUGELU-专注前端开发`,

      // meta标记
      meta: {
        description: { name: 'description', content: '足各路的个人博客,专注前端开发,记录学习生活中的点滴。' },
        keywords: { name: 'keywords', content: '足各路,个人博客,专注前端开发,技术分享,记录生活,学习笔记。' },
        ogTitle: { name: 'og:title', content: this.title + ' | ZUGELU-专注前端开发' }, // !标题
        ogType: { name: 'og:type', content: 'article' }, // !类型
        ogUrl: { name: 'og:url', content: process.env.URL + this.$route.path }, // !网站地址
        ogImage: { name: 'og:image', content: 'null' }, // !略缩图地址
        ogSiteName: { name: 'og:site_name', content: '足各路的个人博客' }, // 网站名
        ogDescription: { name: 'og:description', content: '足各路的个人博客,专注前端开发,记录学习生活中的点滴。' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
        robots: { name: 'robots', content: 'index,follow' },
      },

      // CSS标记
      link: {
        // material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      },

      // JS标记
      script: {
        ldJson: {
          type: 'application/ld+json',
          innerHTML: `{ 
            "@type": "WebSite",
            "@context": "http://schema.org",
            "title": "足各路の个人博客 | 专注前端开发",
            "name": "足各路の个人博客", 
            "url": "https://zugelu.com",
            "author": {
              "@type": "Person",
              "name": "足各路"
            },
            "description": "足各路的个人博客,专注前端开发,记录学习生活中的点滴。"
          }`
        }
      },

      // <html>属性
      htmlAttr: {
        'xmlns:cc': 'https://zugelu.com', // 生成<html xmlns:cc="http://creativecommons.org/ns#">,
        empty: undefined // 生成<html empty>
      },

      // <body> attributes
      bodyAttr: {
        'action-scope': 'zugelu', // 生成<body action-scope="xyz">
        empty: undefined // 生成<body empty>
      },

      // <noscript>标记
      noscript: {
        default: 'This is content for browsers with no JS (or disabled JS)'
      }
    }
  },
}
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}
</style>