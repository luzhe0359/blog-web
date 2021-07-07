<template>
  <q-page id="ArticleDetail">
    <q-scroll-observer @scroll="handlerScroll" :debounce="200" />
    <div class="title text-h4 q-py-md text-white"> {{article.title}} </div>
    <div class="text-white q-pb-sm row">
      <q-chip icon="iconfont icon-biaoqian" color="transparent" text-color="white">{{article.type | articleType}}</q-chip>
      <q-chip icon="iconfont icon-qiepian" color="transparent" text-color="white"> {{article.createTime | dateFormat}}</q-chip>
      <div v-if="article.meta">
        <q-chip icon="iconfont icon-fangwenliang" color="transparent" text-color="white">{{article.meta.views}}</q-chip>
        <q-chip icon="iconfont icon-pinglun" color="transparent" text-color="white"> {{article.meta.comments}}</q-chip>
        <q-chip class="like-box" color="transparent" text-color="white">
          <q-icon class="like q-mr-xs" :name="isLike ? 'iconfont icon-xin1': 'iconfont icon-xin'" :color="isLike ? 'red-5': ''" size="21px" @click="like"></q-icon>
          {{article.meta.likes}}
        </q-chip>
      </div>
      <q-space />
      <q-chip color="grey-6" v-for="tag in article.tags" :key="tag._id">{{tag.name}}</q-chip>
    </div>
    <!-- md -->
    <div class="md-content row">
      <!-- 文章 -->
      <div class="col-xs-12 col-md-9">
        <v-md-preview class="md-preview rounded-borders overflow-hidden" ref="preview" :text="article.mdContent" @copy-code-success="handleCopyCodeSuccess"></v-md-preview>
      </div>
      <!-- 目录 -->
      <div class="gt-sm col-md-3 q-pl-md q-gutter-y-md">
        <div v-show="titles.length !== 0" class="bg-white q-px-md q-pb-md rounded-borders catalog overflow-hidden" ref="catalog">
          <q-separator vertical inset color='grey-3' size='2px' class="absolute-left q-ml-xs" />
          <div class="active-ball absolute-left" :style="{top:activeBallTop  + 'px',left:'1px'}"></div>
          <div>
            <div class="row no-wrap" v-for=" (anchor,index) in titles" :key="index" :style="{ padding: `10px 0 0 ${anchor.indent * 20}px` }" @click="handleAnchorClick(anchor,index)">
              <div class="ellipsis cursor-pointer text-subtitle2" :class="{'active-anchor':activeIndex === index}">{{ anchor.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="row">
      <div class="col-xs-12 col-md-9">
        <div ref="comment" class="text-h5 q-mt-lg q-mb-md">评论</div>
        <CommentAdd :hideCancel="true" @comment="comment" />
        <Comment v-for="item in commentList" :key="item._id" :comment="item" @comment="comment" @loadComment="changePage" />
        <q-no-ssr v-if="commentPageCount > 1">
          <q-pagination class="q-mb-sm" color="grey-7" v-model="pageNum" :max="commentPageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
        </q-no-ssr>
      </div>
    </div>
  </q-page>
</template>
<script>
import { scroll, dom, date } from 'quasar'
const { css, height } = dom
const { getScrollTarget, setScrollPosition } = scroll
import { mapGetters } from 'vuex'

import Comment from 'src/components/Comment/Comment.vue'
import CommentAdd from 'src/components/Comment/CommentAdd.vue'

let defaultParams = {
  pageNum: 1,
  pageSize: 5,
  state: -1 // 违规评论过滤
}
export default {
  name: 'ArticleDetail',
  components: {
    Comment,
    CommentAdd,
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    const articleId = currentRoute.params._id
    return Promise.all([
      store.dispatch('article/LoadArtitcleDetail', articleId),
      store.dispatch('article/LoadCommentList', { articleId, ...defaultParams })
    ])
  },
  meta () {
    return {
      title: this.article.title + ' | ZUGELU-足各路的个人博客',
      meta: {
        description: { name: 'description', content: this.article.desc },
        ogTitle: { name: 'og:title', content: this.article.title + ' | ZUGELU-足各路的个人博客' },
        ogDescription: { name: 'og:description', content: this.article.desc },
        ogType: { name: 'og:type', content: '文章' },
        ogImage: { name: 'og:image', content: this.article.imgCover },
        // ogImageUrl: { name: 'og:image:url', content: this.article.imgUrl },
        ogUrl: { name: 'og:url', content: 'https://zugelu.com' + this.$route.path },
        articlePublishTime: { name: 'article:published_time', content: date.formatDate(this.article.createTime, 'YYYY-MM-DD HH:mm:ss') },
        articleUpdateTime: { name: 'article:update_time', content: date.formatDate(this.article.updateTime, 'YYYY-MM-DD HH:mm:ss') },
        articleSection: { name: 'article:section', content: '编码技术' }
      }
    }
  },
  data () {
    return {
      titles: [], // 目录列表
      isLike: false, // 是否点赞
      activeIndex: -1, // 高亮目录索引
      pageNum: defaultParams.pageNum, // 当前页
      pageSize: defaultParams.pageSize,
    }
  },
  computed: {
    articleId () {
      return this.$route.params._id
    },
    article () {
      return this.$store.state.article.articleDetail[this.articleId]
    },
    ...mapGetters([
      'likeArticles',
      'commentList',
      'commentPageCount'
    ]),
    // 目录小球top
    activeBallTop () {
      return 32 * this.activeIndex + 16
    }
  },
  watch: {
    likeArticles: {
      handler (n, o) {
        this.isLike = this.likeArticles.some(item => item === this.articleId)
      },
      immediate: true,
    },
  },
  mounted () {
    // 初始化目录
    this.$nextTick(() => {
      this.handleAnchorInit()
    })
    // 评论点赞 
    this.$root.$on('loadComment', this.changePage)
  },
  methods: {
    // 滚动到指定元素
    scrollToElement (el) {
      // 页面滚动距离
      let target = getScrollTarget(el)
      let downOrUp = dom.offset(el).top
      let duration = 200
      let offsetTop = el.offsetTop
      if (offsetTop > 500 && downOrUp >= 0) {
        offsetTop += 50
      }
      setScrollPosition(target, offsetTop, duration)
    },
    // 监听滚动
    handlerScroll (info) {
      const { direction, position } = info // 滚动信息
      let catalog = this.$refs.catalog // 滚动元素

      // 滚动页面，目录fixed  
      let top = "50px"
      if (direction === 'down' && position > 500) { // 下滑,且超过500
        top = '0px'
      }
      css(catalog, {
        top
      })

      // 滚动md，目录跟随  
      let clientHeight = document.documentElement.clientHeight // 屏幕高
      let bodyHeight = height(document.documentElement) // html高
      if (clientHeight + position >= bodyHeight - 2) return // 到底部
      const { preview, comment } = this.$refs;
      if (this.titles.length <= 0) return
      let firstHead = preview.$el.querySelector(`[data-v-md-line="${this.titles[0].lineIndex}"]`);
      let lastHead = comment

      this.titles.forEach((item, index) => {
        const { lineIndex } = item;
        const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
        let headingTop = heading.offsetTop
        // 未到/超出md
        if (position < firstHead.offsetTop) { // 未到达第一个目录
          this.activeIndex = -1
          return
        } else if (position > lastHead.offsetTop) { // 超出最后一个目录(评论top)
          this.activeIndex = this.titles.length + 1
          return
        }
        // 下滑,且超过500,减去头部
        if (direction === 'up' && position > 500) {
          headingTop -= 30
        }
        if (position >= headingTop) {
          this.activeIndex = index
        }
      })
    },
    // 点赞/消赞
    like () {
      // 判断用户是否登录
      let user = this.$q.localStorage.getItem("user")
      if (!user) {
        return this.$msg.warning('请先登录')
      }

      if (this.isLike) {
        return this.$msg.warning('暂不支持取消点赞')
      }

      this.$store.dispatch('article/UserLikeArtitcle', this.articleId).then((res) => {
        this.$msg.success('点赞成功')
      })
    },

    // 自定义锚点 滚动
    handleAnchorClick (anchor, index) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;

      const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

      this.activeIndex = index;
      heading && this.scrollToElement(heading);
    },
    // 自定义锚点 初始化
    handleAnchorInit () {
      const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
      const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
      if (!titles.length) {
        this.titles = [];
        return;
      }

      const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

      this.titles = titles.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
      }));
    },
    handleCopyCodeSuccess () {
      this.$msg.success('复制成功')
    },
    // 评论 --------------------------------
    // 添加评论
    comment (content, commentId, to, level) {
      let params = {
        content,
        commentId,
        to,
        level,
        articleId: this.article._id
      }
      this.$store.dispatch('article/AddComment', params).then(res => {
        // 一级评论，切换至第一页
        if (!level) {
          this.pageNum = 1
        }
        this.changePage()
      })
    },
    // 切换页码
    changePage (current) {
      let params = {
        articleId: this.articleId,
        pageNum: current || this.pageNum,
        pageSize: this.pageSize,
        state: -1
      }
      this.$store.dispatch('article/LoadCommentList', params)
    }
  },
}
</script>
<style lang="scss" scoped>
#ArticleDetail {
  .md-content {
    box-sizing: border-box;
    .md-preview {
      /deep/ .vuepress-markdown-body:not(.custom) {
        padding: 16px;
        max-width: 100% !important;
      }
      /deep/ .vuepress-markdown-body div[class*="v-md-pre-wrapper-"] {
        margin: 0;
      }
    }
    .catalog {
      position: sticky;
      left: 0;
      top: 50px;
      transition: all 0.2s ease-out;
      .active-ball {
        width: 8px;
        height: 8px;
        background-color: #fff;
        border: 2px solid #1890ff;
        border-radius: 8px;
        transition: top 0.3s ease-in-out;
      }
      .active-anchor {
        color: #1890ff;
      }
    }
  }

  .q-chip {
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    .q-icon {
      margin-right: 5px;
    }
    &.like-box {
      &:hover {
        .like {
          cursor: pointer;
          color: red;
          transform: scale(1.2, 1.2);
        }
      }
    }
  }
}

@media (max-width: $breakpoint-xs-max) {
  .title {
    font-size: 1.6rem;
    line-height: 2.2rem;
    padding-bottom: 2px;
    word-break: break-all;
  }
}
</style>

