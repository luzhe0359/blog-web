<template>
  <div id="q-app" v-cloak>
    <router-view />
    <!-- 防止刷新闪屏 -->
    <!-- <div v-if="$q.screen.width <= 0" class="window-height window-width bg-loading column items-center justify-center">
      <q-spinner-gears color="red" size="5.5em" />
      <div>加载中 . . .</div>
    </div> -->
    <!-- <q-no-ssr v-show="$q.screen.width <= 0"> -->
    <!-- <div v-show="$q.screen.width <= 0" :class="{'bg-cover':$q.screen.lt.md}" class="q-loading fullscreen column flex-center z-max text-#000">
      <svg focusable="false" width="80" height="80" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg" class="q-spinner text-red">
        <g transform="translate(-20,-20)">
          <path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor">
            <animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"></animateTransform>
          </path>
        </g>
        <g transform="translate(20,20) rotate(15 50 50)">
          <path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform>
          </path>
        </g>
      </svg>
      <div class="text-grey-2" style="margin-bottom:-46px;">loading . . .</div>
    </div> -->
    <!-- </q-no-ssr> -->
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      title: '足各路的个人博客',
      isRouterAlive: true,
    }
  },
  watch: {
    $route (newVal) {
      this.title = newVal.meta.title
    },
  },
  mounted () {
    console.log('app mounted');
  },
  meta () {
    return {
      // 设置文件标题
      title: this.title,
      // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
      titleTemplate: title => `${title} - 足各路`,

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

.q-overlay {
  // position: fixed;
  // z-index: 99999;
  // top: 0;
  // left: 0;
  // background-color: red;
  background-image: url("~assets/bg_body.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.bg-cover {
  background-size: cover;
}
</style>