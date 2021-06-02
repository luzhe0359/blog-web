<template>
  <q-page id="ArticleDetail" class="max-width">
    <div class="title text-h4 q-py-md text-white overflow-hidden">
      {{article.title}}
    </div>
    <div class="text-white q-pb-sm row">
      <q-chip icon="iconfont icon-biaoqian" color="transparent" text-color="white">{{article.type | articleType}}</q-chip>
      <q-chip icon="iconfont icon-qiepian" color="transparent" text-color="white"> {{article.createTime | dateFormat}}</q-chip>
      <!-- 套一个div，小屏幕 换行 -->
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
      <v-md-preview class="col-sm-12 col-md-9 md-preview" ref="preview" :text="md"></v-md-preview>
      <div class="gt-sm col-md-3 q-px-md">
        <div class="bg-white q-px-md">
          <div class="column" v-for=" (anchor,index) in titles" :key="index" :style="{ padding: `10px 0 0 ${anchor.indent * 20}px` }" @click="handleAnchorClick(anchor)">
            <a style="cursor: pointer">{{ anchor.title }}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <div ref="scrollBox" class='text-h6'>滚动到这里</div> -->
    <div class="text-h5 q-mt-lg">评论区</div>
    <CommentAdd :hideCancel="true" @comment="comment" />
    <Comment v-for="item in commentList" :key="item._id" :comment="item" @comment="comment" />
  </q-page>
</template>

<script>
import BaseContainer from 'src/components/Container/BaseContainer'

import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

import Comment from 'src/components/Comment/Comment.vue'
import CommentAdd from 'src/components/Comment/CommentAdd.vue'
import { findArticleById, likeArticle, nolikeArticle } from 'src/api/article.js'
import { addComment, findCommentList } from 'src/api/comment.js'

export default {
  name: 'ArticleDetail',
  components: {
    BaseContainer,
    Comment,
    CommentAdd
  },
  data () {
    return {
      article: {},
      md: '',
      titles: [],
      isLike: false, // 是否点赞
      commentList: [], // 评论列表
    }
  },
  created () {
    // this.initDetail()
  },
  mounted () {
    this.initDetail()
    // this.$nextTick(() => {
    //   this.handleAnchorInit()
    // })
  },
  watch: {
    // 用户登录后，刷新页面
    "$store.state.user.nickname": function (n, o) {
      this.initDetail()
    }
  },
  methods: {
    initDetail () {
      this.getCommentList()
      this.findArticleByIdFn()
    },
    // 评论列表
    getCommentList () {
      this.commentList = [] // 清空,强制子组件重新渲染（自动高亮点赞）
      let params = {
        articleId: this.$route.params._id,
        state: -1
      }
      findCommentList(params).then(res => {
        this.commentList = res.data
      })
    },
    // 滚动到指定元素
    scrollToElement (el) {
      let target = getScrollTarget(el)
      let offset = el.offsetTop - el.scrollHeight + 60
      let duration = 1000
      setScrollPosition(target, offset, duration)
    },
    // 根据_id查 文章
    findArticleByIdFn () {
      let params = {
        view: this.isView
      }
      findArticleById(this.$route.params._id, params).then(res => {
        this.article = res.data

        this.md = res.data.mdContent

        this.$nextTick(() => {
          setTimeout(() => {
            this.handleAnchorInit()
          }, 200)
        })
        this.isLike = this.article.isLike
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
        this.findCommentList()
        this.article.meta.comments++
      }).catch(err => {
      })
    },
    // 自定义锚点
    handleAnchorClick (anchor) {
      console.log(anchor);
      const { preview } = this.$refs;
      const { lineIndex } = anchor;

      const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },
    // 自定义锚点 初始化
    handleAnchorInit () {
      const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
      const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
      console.log(titles);
      if (!titles.length) {
        this.titles = [];
        return;
      }

      const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

      // titles.map((el) => {
      //   console.log(el);
      //   console.log(el.children[0].data);
      // })

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
    .md-preview {
      border-radius: 4px;
      overflow: hidden;
      /deep/ .vuepress-markdown-body:not(.custom) {
        padding: 16px;
        max-width: 100% !important;
      }
      /deep/ .vuepress-markdown-body div[class*="v-md-pre-wrapper-"] {
        margin: 0;
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
  }
  img {
    width: 50px !important;
  }

  .like-box {
    :hover {
      .like {
        cursor: pointer;
        color: red;
        transform: scale(1.2, 1.2);
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

