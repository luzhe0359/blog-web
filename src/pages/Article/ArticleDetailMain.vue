<template>
  <div id="ArticleDetail">
    <div class="text-h2 q-pb-sm text-white">
      {{article.title}}
    </div>
    <div class="text-white q-pb-sm row">
      <q-chip
        class="q-pl-none"
        icon="bookmark"
        color="transparent"
        text-color="white"
      >{{article.type | articleType}}
      </q-chip>
      <q-chip
        icon="event"
        color="transparent"
        text-color="white"
      >
        {{article.createTime | dateFormat}}
      </q-chip>
      <q-chip
        icon="iconfont icon-fangwenliang"
        color="transparent"
        text-color="white"
      >
        {{article.meta.views}}
      </q-chip>
      <q-chip
        icon="iconfont icon-pinglun"
        color="transparent"
        text-color="white"
      >
        {{article.meta.comments}}
      </q-chip>
      <q-chip
        class="like-box"
        color="transparent"
        text-color="white"
      >
        <q-icon
          class="like q-mr-xs"
          name="iconfont icon-xin"
          :color="isLike ? 'red': 'grey'"
          size="21px"
          @click="like"
        ></q-icon>
        {{article.meta.likes}}
      </q-chip>
      <q-space />
      <q-chip
        color="grey-6"
        v-for="tag in article.tags"
        :key="tag._id"
      >
        {{tag.name}}
      </q-chip>
    </div>
    <div id="editor">
      <q-no-ssr>
        <mavon-editor
          :value="article.mdContent"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :ishljs="true"
          :boxShadow="false"
          :tabSize='4'
          codeStyle="vs2015"
          style="background: transparent"
        ></mavon-editor>
      </q-no-ssr>
    </div>
    <!-- <div
      ref="scrollBox"
      class='text-h1'
    >滚动到这里</div> -->
    <Comment
      :articleId="$route.params._id"
      @addCommentNum="addCommentNum"
    />
  </div>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import Comment from 'src/pages/Comment/Comment.vue'
import { findArticleById, likeArticle, nolikeArticle } from 'src/api/article.js'

export default {
  name: 'ArticleDetailMain',
  components: {
    mavonEditor,
    Comment
  },
  data () {
    return {
      article: { meta: '', tags: '' },
      isLike: false, // 是否点赞
      actions: true, // 操作
      isView: false, // 是否浏览
    }
  },
  mounted () {
    this.initDetail()
  },
  methods: {
    initDetail () {
      let view = this.$q.sessionStorage.getItem(this.$route.fullPath)
      // 判断是否浏览过此文章
      if (view !== null) { // sessionStorage 不为空，即看过
        this.isView = true
      }
      this.findArticleByIdFn()
    },
    // 滚动到指定元素
    scrollToElement (el) {
      let target = getScrollTarget(el)
      let offset = el.offsetTop - el.scrollHeight
      let duration = 1000
      setScrollPosition(target, offset, duration)
    },
    // 根据_id查 文章
    findArticleByIdFn () {
      let params = {
        view: this.isView
      }
      // console.log('this.$route.fullPath');
      // console.log(this.$route);
      findArticleById(this.$route.params._id, params).then(res => {
        this.article = res.data
        this.isLike = this.article.isLike
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
        return this.$q.notify({
          message: '请先登录',
          color: 'primary'
        })
      }
      if (this.isLike) { // 取消点赞
        nolikeArticle({
          articleId: this.$route.params._id,
        }).then(res => {
          // 消赞成功
          this.isLike = false
          this.article.meta.likes--
          this.$q.notify({
            message: res.msg,
            color: 'primary'
          })
        }).catch(err => { })
      } else { // 文章点赞
        likeArticle({
          articleId: this.$route.params._id,
        }).then(res => {
          // 点赞成功
          this.isLike = true
          this.article.meta.likes++
          this.$q.notify({
            message: res.msg,
            color: 'primary'
          })
        }).catch(err => { })
      }
    },
    addCommentNum () {
      console.log('addCommentNum');
      this.$set(this.article, 'meta.comments', this.article.meta.comments++)
    }
  },

}
</script>

<style lang="scss" scoped>
#ArticleDetail {
  .q-chip {
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  img {
    width: 50px !important;
  }
  // /deep/.markdown-body pre {
  //   padding: 0 !important;
  // }
  .like-box {
    :hover {
      .like {
        cursor: pointer;
        color: blue;
        transform: scale(1.2, 1.2);
      }
    }
  }
}
</style>