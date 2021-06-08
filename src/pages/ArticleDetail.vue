<template>
  <q-page id="ArticleDetail">
    <q-scroll-observer @scroll="handlerScroll" :debounce="200" />
    <div class="title text-h4 q-py-md text-white overflow-hidden"> {{article.title}} </div>
    <div class="text-white q-pb-sm row">
      <q-chip icon="iconfont icon-biaoqian" color="transparent" text-color="white">{{article.type | articleType}}</q-chip>
      <q-chip icon="iconfont icon-qiepian" color="transparent" text-color="white"> {{article.createTime | dateFormat}}</q-chip>
      <div v-if="article.meta">
        <q-chip icon="iconfont icon-fangwenliang" color="transparent" text-color="white">{{article.meta.views}}</q-chip>
        <q-chip icon="iconfont icon-pinglun" color="transparent" text-color="white"> {{article.meta.comments}}</q-chip>
        <q-chip class="like-box" color="transparent" text-color="white">
          <q-icon class="like q-mr-xs" name="iconfont icon-xin" :color="isLike ? 'red': ''" size="21px" @click="like"></q-icon>
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
        <v-md-preview class="md-preview rounded-borders overflow-hidden" ref="preview" :text="article.mdContent"></v-md-preview>
        <div>
          <div ref="comment" class="text-h5 q-mt-lg q-mb-md">评论</div>
          <CommentAdd :hideCancel="true" @comment="comment" />
          <Comment v-for="item in commentList" :key="item._id" :comment="item" @comment="comment" />
        </div>
      </div>
      <!-- 目录 -->
      <div class="gt-sm col-md-3 q-pl-md q-gutter-y-md">
        <div class="bg-white q-px-md q-pb-md rounded-borders catalog overflow-hidden" ref="catalog">
          <q-separator vertical inset color='grey-5' size='2px' class="absolute-left q-ml-xs" />
          <!-- <div><span class="ant-anchor-ink-ball visible" style="top: 9px;"></span></div> -->
          <div class="active-ball absolute-left" :style="{top: (activeBallTop + 16) + 'px',left:'1px'}"></div>
          <!-- 目录 -->
          <div>
            <!-- 骨架 -->
            <div class="q-pt-sm" v-if="titles.length === 0">
              <q-skeleton class="q-pt-sm" type="text" v-for=" (anchor,index) in 5" :key="index" />
            </div>
            <div class="row no-wrap" v-for=" (anchor,index) in titles" :key="index" :style="{ padding: `10px 0 0 ${anchor.indent * 20}px` }" @click="handleAnchorClick(anchor,index)">
              <div class="ellipsis cursor-pointer text-subtitle2" :class="{'active-anchor':activeIndex === index}">{{ anchor.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { scroll, dom, } from 'quasar'
const { css, height, offset } = dom
const { getScrollTarget, setScrollPosition, getScrollPosition } = scroll
import { mapGetters } from 'vuex'

import BaseContainer from 'src/components/Container/BaseContainer'
import Comment from 'src/components/Comment/Comment.vue'
import CommentAdd from 'src/components/Comment/CommentAdd.vue'
import { findArticleById, likeArticle, nolikeArticle } from 'src/api/article.js'
import { addComment, findCommentList } from 'src/api/comment.js'

export default {
  name: 'ArticleDetail',
  components: {
    BaseContainer,
    Comment,
    CommentAdd,
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    const articleId = currentRoute.params._id
    // const promise1 = store.dispatch('article/GetArtitcleDetail', articleId)
    // const promise2 = store.dispatch('article/GetArtitcleDetail', articleId)
    return store.dispatch('article/GetArtitcleDetail', articleId)
    // return Promise.all([promise1, promise2])
  },
  data () {
    return {
      titles: [],
      isLike: false, // 是否点赞
      commentList: [], // 评论列表
      toc: [],
      activeIndex: -1,
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
    ]),
    activeBallTop () {
      return 32 * this.activeIndex
    }
  },
  watch: {
    likeArticles: {
      handler (n, o) {
        this.isLike = this.likeArticles.some(item => item === this.articleId)
        console.log('this.isLike');
        console.log(this.isLike);
      },
      immediate: true,
    },
    // 用户登录后，刷新页面
    // "$store.state.user.nickname": function (n, o) {
    //   this.commentList = [] // 清空,强制子组件重新渲染（自动高亮点赞）
    //   this.initDetail()
    // },
  },
  mounted () {
    // this.initDetail()
    // 初始化目录
    this.$nextTick(() => {
      this.handleAnchorInit()
    })
    this.getCommentList()
  },
  methods: {
    onToc (toc) {
      this.toc = toc
    },
    initDetail () {
      this.getCommentList()
      this.findArticleByIdFn()
    },
    // 评论列表
    getCommentList () {
      let params = {
        articleId: this.articleId,
        state: -1
      }
      findCommentList(params).then(res => {
        this.commentList = res.data
      })
    },
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
    // 根据_id查 文章
    findArticleByIdFn () {
      let params = {
        view: this.isView
      }
      findArticleById(this.$route.params._id, params).then(res => {
        this.article = res.data

        this.md = res.data.mdContent

        // this.isLike = this.article.isLike
        this.$store.dispatch("count/AddView")
        // this.$nextTick(() => {
        //   this.scrollToElement(this.$refs.scrollBox)
        // })
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
        this.$store.dispatch("count/AddLike")
        // this.$store.commit('user/SET_LIKES_ARTICLE', res)
        this.$msg.success('点赞成功')
      })

      return
      if (this.isLike) { // 取消点赞
        nolikeArticle({
          articleId: this.$route.params._id,
        }).then(res => {
          // 消赞成功
          this.isLike = false
          this.article.meta.likes--
          this.$msg.success(res.msg)
        }).catch(err => { })
      } else { // 文章点赞
        likeArticle({
          articleId: this.$route.params._id,
        }).then(res => {
          // 点赞成功
          this.isLike = true
          this.article.meta.likes++
          // 统计 点赞总数+1
          this.$store.dispatch("count/AddLike")
          this.$msg.success(res.msg)
        }).catch(err => { })
      }
    },
    // 添加评论
    comment (content, commentId, to, level) {
      let params = {
        content,
        commentId,
        to,
        level,
        articleId: this.article._id
      }
      addComment(params).then(res => {
        this.getCommentList()
        // this.article.meta.comments++
      })
    },
    // 自定义锚点 滚动
    handleAnchorClick (anchor, index) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;

      // this.activeIndex = index
      const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

      this.activeIndex = index;
      console.log(this.activeIndex);
      heading && this.scrollToElement(heading);
    },
    scrollTo (id) {
      this.scrollToElement(document.getElementById(id));
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

  // .catalog {
  //   position: sticky;
  //   left: 0;
  //   top: 50px;
  //   transition: all 0.2s ease-out;
  // }

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

