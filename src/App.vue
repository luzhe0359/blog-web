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
      title: '足各路的个人博客'
    }
  },
  watch: {
    $route (newVal) {
      this.title = newVal.meta.title
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
      titleTemplate: title => `${title} | 足各路`,

      // meta标记
      meta: {
        description: { name: 'description', content: '足各路的个人博客,基于express+quasar开发,记录学习生活中的点滴。' },
        keywords: { name: 'keywords', content: '足各路，个人博客，技术分享，记录生活' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
        // 注意：对于opengraph类型的metadata，您需要使用SSR，以确保页面由服务器渲染
        ogTitle: {
          name: 'og:title',
          // 可选；类似于titleTemplate，但允许使用其他meta属性进行模板化
          template (ogTitle) {
            return `${ogTitle} - My Website`
          }
        }
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
            "@context": "http://zugelu.icu",
            "name": "足各路の个人博客",
            "url": "http://zugelu.icu",
            "author": {
              "@type": "Person",
              "name": "足各路"
            },
          }`
        }
      },

      // <html>属性
      htmlAttr: {
        'xmlns:cc': 'http://zugelu.icu:3000/home', // 生成<html xmlns:cc="http://creativecommons.org/ns#">,
        empty: undefined // 生成<html empty>
      },

      // <body> attributes
      bodyAttr: {
        'action-scope': 'xyz', // 生成<body action-scope="xyz">
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