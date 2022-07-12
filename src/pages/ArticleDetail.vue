<template>
  <q-page id="ArticleDetail">
    <q-scroll-observer @scroll="handlerScroll" :debounce="200" />
    <!-- header -->
    <div class="page-header" :style="{backgroundImage: `url(${article.imgCover || $BASE_IMG_URL})`}">
      <div class="absolute-center text-white full-width">
        <h1 class="text-h4 text-center q-mb-lg"> {{article.title}}</h1>
        <div class="text-caption text-white q-pb-sm row max-width flex-center">
          <q-chip class="text-caption" icon="loyalty" color="transparent" text-color="grey-3">{{article.type | articleType}}</q-chip>
          <q-chip class="text-caption" icon="category" color="transparent" text-color="grey-3">{{article.category.name}}</q-chip>
          <q-chip class="text-caption" icon="date_range" color="transparent" text-color="grey-3"> 发表于{{article.createTime | yearFormat}}</q-chip>
          <div v-if="article.meta">
            <q-chip class="text-caption" icon="remove_red_eye" color="transparent" text-color="grey-3">{{article.meta.views}}</q-chip>
            <q-chip class="text-caption" icon="source" color="transparent" text-color="grey-3"> {{article.meta.comments}}</q-chip>
            <q-chip class="like-box text-caption" color="transparent" text-color="grey-3">
              <q-icon class="like q-mr-xs" name="favorite" :color="isLike ? 'red-5': ''" @click="like"></q-icon>
              {{article.meta.likes}}
            </q-chip>
            <q-chip class="text-caption" color="transparent" text-color="grey-3">
              <q-icon class="like q-mr-xs" name="tag"></q-icon>
              <span class="q-mr-sm" v-for="tag in article.tags" :key="tag._id">{{tag.name}}</span>
            </q-chip>
          </div>
        </div>
      </div>
    </div>
    <!-- inner -->
    <PageInner>
      <template v-slot:inner-left>
        <q-card class="q-mb-lg">
          <!-- md -->
          <q-card-section class="md-content">
            <v-md-preview class="md-preview overflow-hidden" ref="preview" :text="article.mdContent" @copy-code-success="handleCopyCodeSuccess"></v-md-preview>
          </q-card-section>
          <!-- <q-card-section class="row justify-end">
            <q-btn round flat color="grey-8" @click="share" icon="iconfont icon-qq-share" />
            <q-btn round flat color="grey-8" icon="iconfont icon-weixin-share" />
            <q-btn round flat color="grey-8" icon="iconfont icon-weibo-share" />
          </q-card-section> -->
          <!-- 评论 -->
          <q-separator inset class="q-mt-lg" />
          <q-card-section ref="comment">
            <div class="text-h5 q-mb-md">评论</div>
            <CommentAdd :hideCancel="true" @comment="comment" />
            <Comment v-for="item in commentList" :key="item._id" :comment="item" @comment="comment" />
            <NotComment v-if="commentList.length === 0" />
            <q-no-ssr v-if="commentPageCount > 1">
              <q-pagination class="q-mb-sm" color="grey-7" v-model="pageNum" :max="commentPageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
            </q-no-ssr>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:inner-right>
        <!-- 右侧边栏 -->
        <SideBar>
          <template v-slot:catalog>
            <!-- 目录 -->
            <q-card class="q-mb-lg" v-show="titles.length !== 0">
              <q-card-section>
                <SideTitle title="目录" />
                <div class="q-pl-md overflow-hidden catalog relative-position">
                  <div class="active-ball absolute-left" :style="{top:activeBallTop}"></div>
                  <div ref="catalog">
                    <div class="text-subtitle1 row no-wrap" v-for=" (anchor,index) in titles" :key="index" :style="{ padding: `6px 0 0 ${anchor.indent * 20}px` }" @click="handleAnchorClick(anchor,index)">
                      <div class="ellipsis cursor-pointer text-subtitle1" :class="{'active-anchor':activeIndex === index}">{{ anchor.title }}</div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </template>
        </SideBar>
      </template>
    </PageInner>
  </q-page>
</template>
<script>
import { scroll, dom, date } from 'quasar'
const { height } = dom
const { getScrollTarget, setScrollPosition } = scroll
import { mapGetters } from 'vuex'

import PageInner from 'components/common/PageInner'
import SideBar from 'components/SideBar/SideBar'
import SideTitle from 'components/Common/SideTitle'
import Comment from 'components/Comment/Comment.vue'
import CommentAdd from 'components/Comment/CommentAdd.vue'
import NotComment from 'components/Common/NotComment'

let defaultParams = {
  pageNum: 1,
  pageSize: 5,
  state: -1, // 违规评论过滤
  type: 1
}
export default {
  name: 'ArticleDetail',
  components: {
    PageInner,
    SideBar,
    SideTitle,
    Comment,
    CommentAdd,
    NotComment
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    const articleId = currentRoute.params._id
    return Promise.all([
      store.dispatch('article/LoadArtitcleDetail', articleId),
      store.dispatch('comment/LoadCommentList', { articleId, ...defaultParams })
    ])
  },
  meta () {
    return {
      title: this.article.title,
      meta: {
        description: { name: 'description', content: this.article.desc },
        ogTitle: { name: 'og:title', content: this.article.title + ' | ZUGELU-专注前端开发' },
        ogDescription: { name: 'og:description', content: this.article.desc },
        ogType: { name: 'og:type', content: this.article.category.name + '文章' },
        ogImageUrl: { name: 'og:image:url', content: this.article.imgCover },
        ogUrl: { name: 'og:url', content: 'https://zugelu.com' + this.$route.path },
        articlePublishTime: { name: 'article:publish_time', content: date.formatDate(this.article.createTime, 'YYYY-MM-DD HH:mm:ss') },
        articleUpdateTime: { name: 'article:update_time', content: date.formatDate(this.article.updateTime, 'YYYY-MM-DD HH:mm:ss') },
        articleSection: { name: 'article:section', content: this.article.tags.map(tag => tag.name).join(',') }
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
      const { catalog } = this.$refs;
      if (this.titles.length <= 0) return 0
      let firstCatalog = catalog.firstElementChild // 第一个目录的高度
      let firstCatalogHeight = firstCatalog ? height(firstCatalog) : 0
      return (this.activeIndex + 0.5) * firstCatalogHeight + 'px'
    }
  },
  watch: {
    likeArticles: {
      handler (n, o) {
        this.isLike = this.likeArticles.some(item => item === this.articleId)
      },
      immediate: true,
    }
  },
  mounted () {
    // 初始化目录
    this.$nextTick(() => {
      this.handleAnchorInit()
    })
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

      // 滚动md，目录跟随  
      let clientHeight = document.documentElement.clientHeight // 屏幕高
      let bodyHeight = height(document.documentElement) // html高
      if (clientHeight + position >= bodyHeight - 2) return // 到底部
      const { preview, comment } = this.$refs;
      if (this.titles.length <= 0) return
      let firstHead = preview.$el.querySelector(`[data-v-md-line="${this.titles[0].lineIndex}"]`);
      let lastHead = comment.$el

      this.titles.forEach((item, index) => {
        const { lineIndex } = item;
        const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
        let headingTop = heading.offsetTop
        // 未到/超出md
        // console.log(position < firstHead.offsetTop);
        // console.log(position > lastHead.offsetTop);
        // console.log(lastHead.offsetTop);
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
    // 复制代码
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
        type: 1,
        articleId: this.article._id
      }
      this.$store.dispatch('comment/AddComment', params).then(res => {
        // 一级评论，切换至第一页
        this.$msg.success('评论成功')
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
        state: -1,
        type: 1
      }
      this.$store.dispatch('comment/LoadCommentList', params)
    },
    // 分享
    share () {
      var param = {
        url: "https://zugelu.com/detail/612792bcb71daa6623014b2c" || 'www.baidu.com',
        /*分享地址*/
        desc: '',
        /*分享理由(可选)*/
        title: this.article.title || '',
        /*分享标题(可选)*/
        summary: this.article.desc,
        /*分享描述(可选)*/
        pics: this.article.imgCover || '',
        /*分享图片(可选)*/
        flash: '',
        /*视频地址(可选)*/
        site: '' /*分享来源 (可选) */
      };
      var s = [];
      for (var i in param) {
        s.push(i + '=' + encodeURIComponent(param[i] || ''));
      }
      var targetUrl = "https://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
      window.open(targetUrl, '_blank', 'height=520, width=720');
    }
  },
}
</script>
<style lang="scss" scoped>
#ArticleDetail {
  .page-header {
    background-position: center center;
  }
  .md-content {
    box-sizing: border-box;
    .md-preview {
      /deep/ .vuepress-markdown-body:not(.custom) {
        padding: 0;
        max-width: 100% !important;
      }
      /* /deep/ .vuepress-markdown-body div[class*="v-md-pre-wrapper-"] {
        margin: 0;
      } */
    }
  }
  /deep/ .vuepress-markdown-body {
    font-size: 1rem;
    color: inherit;
    background-color: inherit;
    ul,
    ol {
      padding-left: 1.5em;
    }
  }
  .catalog {
    transition: all 0.2s;
    .active-ball {
      width: 8px;
      height: 8px;
      background-color: #fff;
      border: 2px solid #1890ff;
      border-radius: 8px;
      transition: top 0.3s ease-in-out;
    }
    .active-anchor {
      transition: all 0.2s;
      color: #1890ff;
    }
  }

  .q-chip {
    &.like-box {
      .like {
        font-size: 1.5em !important;
        transition: all 0.2s;
        cursor: pointer;
        &:hover {
          color: $red-5;
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>

