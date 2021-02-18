<template>
  <q-page>
    <div class="text-h5 q-mt-md">评论区</div>
    <!-- 一级评论 -->
    <BaseComment
      :hideCancel="true"
      @comment="addComment"
      @cancelComment="currentComment = null"
    />
    <!-- 评论列表 -->
    <div class="q-pa-y-md row justify-around">
      <!-- 二级评论 -->
      <div
        style="width: 100%;"
        v-for="item in commnetsList"
        :key="item._id"
      >
        <q-chat-message
          name-sanitize
          text-sanitize
          :name="item.user.nickname"
          :avatar="item.user.avatar | imgBaseUrl"
          :text="[item.content]"
          text-color="white"
          bg-color="primary"
        />
        <BtnsComment
          :createTime="item.createTime"
          :likes="item.likes"
          :comments="item.otherComments.length"
          @likeComment="like(item)"
          @showComment="changeCurrent(item._id)"
        />
        <BaseComment
          v-show="currentComment === item._id"
          @comment="addChildComment($event, item._id, item.user._id)"
          @cancelComment="currentComment = null"
        />
        <!-- 三级评论 -->
        <div
          class="q-pl-xl"
          v-for="child in item.otherComments"
          :key="child._id"
        >
          <q-chat-message
            :name="child.level === 2?`${child.from.nickname}`:`${child.from.nickname} <span class='text-primary'>回复</span> ${child.to.nickname}`"
            :avatar="child.from.avatar | imgBaseUrl"
            :text="[child.content]"
            :stamp="child.createTime | dateDiff"
            text-color="white"
            bg-color="primary"
          />
          <BtnsComment
            :createTime="child.createTime"
            :likes="child.likes"
            :comments="-1"
            @likeComment="like(child, item._id)"
            @showComment="changeCurrent(child._id)"
          />
          <BaseComment
            v-show="currentComment === child._id"
            @comment="addChildComment($event, item._id, child.from._id, 3)"
            @cancelComment="currentComment = null"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.vue'
import BtnsComment from 'components/Comment/BtnsComment.vue'
import BaseComment from 'components/Comment/BaseComment.vue'
import ArticleSelect from 'components/Article/ArticleSelect.vue'

import { addComment, addChildComment, findCommentList, likeComment } from 'src/api/comment.js'
import { getToken, setUser } from 'src/utils/auth.js'

export default {
  name: "Comment",
  props: {
    articleId: {
      type: String,
      default: "",
    }
  },
  components: {
    Breadcrumbs,
    BtnsComment, // 评论 时间、点赞数、评论数、回复按钮
    BaseComment, // 评论 回复框
    ArticleSelect // 文章选择
  },
  data () {
    return {
      post: {
        content: '',
      },
      postChild: {
        commentId: '',
        to: '',
        level: 2, // 2:1级评论的回复内容, 3:2级评论的回复内容
        content: '',
      },
      commnetsList: [],
      currentComment: null, // 当前展示的评论框
      // articleId: null, // 文章_id
      pageSize: 1, // 每页条数
      nextPage: 1, // 当前页码
      lastPage: 1, // 最后一页
    }
  },
  mounted () {
    this.findCommentList()
  },
  methods: {
    // 添加父评论
    addComment (content) {
      this.post.content = content
      this.post.articleId = this.articleId
      addComment(this.post).then(res => {
        this.findCommentList()
        this.$emit('addCommentNum')
        // this.refreshPost()
        this.currentComment = null // 隐藏评论框，防止出现错位
      }).catch(err => {
        // this.refreshPost()
      })
    },
    // 添加子评论
    addChildComment (content, parentCommentId, toUserId, level = 2) {
      this.postChild.commentId = parentCommentId
      this.postChild.to = toUserId
      this.postChild.content = content
      this.postChild.level = level
      addChildComment(this.postChild).then(res => {
        this.findCommentList()
        this.refreshpostChild()
      }).catch(err => {
        this.refreshpostChild()
      })
    },
    // 评论列表
    findCommentList () {
      let params = {
        articleId: this.articleId
      }
      findCommentList(params).then(res => {
        this.commnetsList = res.data
      })
    },
    // 展示/隐藏 评论输入框
    changeCurrent (i) {
      this.currentComment = i === this.currentComment ? null : i  // 多次点击, 切换展示
    },
    // 重置 
    refreshPost () {
      this.post.content = ""
    },
    refreshpostChild () {
      this.postChild.commentId = ""
      this.postChild.to = ""
      this.postChild.content = ""
      this.postChild.level = 2
      this.currentComment = null
    },
    // 文章选择 
    getArticleId (_id) {
      this.articleId = _id
      this.findCommentList()
    },
    // 评论点赞
    like (comment, parentCommentId) {
      let params = {
        userId: this.$q.localStorage.getItem("user")._id,
      }
      // 是否存在参数 父评论id
      if (parentCommentId) { // 存在父评论id，则为子评论
        params.commentId = parentCommentId
        params.otherCommentId = comment._id
      } else {
        params.commentId = comment._id
      }
      // 提交/取消 点赞
      likeComment(params).then(res => {
        this.$q.notify({
          message: res.msg,
          color: 'primary'
        })

        if (!parentCommentId) { // 父评论，parentCommentId 存在于comment中
          return this.$set(comment, 'likes', res.data.likes)
        }
        let otherComment = res.data.otherComments.filter(item => item._id === comment._id)
        this.$set(comment, 'likes', otherComment[0].likes)
      })
    }
  }
}
</script>

