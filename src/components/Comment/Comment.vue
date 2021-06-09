<template>
  <!-- 二级评论 -->
  <div class="full-width q-mb-md">
    <q-chat-message name-sanitize text-sanitize :name="comment.from.nickname" :avatar="comment.from.avatar | imgBaseUrl" :text="[comment.content]" bg-color="primary" ref="scrollBox" />
    <CommentBtns :comment="comment" @showComment="changeCurrent(comment._id)" />
    <CommentAdd v-show="currentComment === comment._id" @comment="addComment($event, comment._id, comment.from._id)" @cancelComment="currentComment = null" />
    <!-- 三级评论 -->
    <div class="q-pl-xl" v-for="child in comment.otherComments" :key="child._id">
      <q-chat-message :name="child.level === 2?`${child.from.nickname}`:`${child.from.nickname} <span class='text-primary'>回复</span> ${child.to.nickname}`" :avatar="child.from.avatar | imgBaseUrl" :text="[child.content]" :stamp="child.createTime | dateDiff" bg-color="primary" />
      <CommentBtns :comment="child" :parentComment="comment" @showComment="changeCurrent(child._id)" />
      <CommentAdd v-show="currentComment === child._id" @comment="addComment($event, comment._id, child.from._id, 3)" @cancelComment="currentComment = null" />
    </div>
  </div>
</template>

<script>
import CommentBtns from 'components/Comment/CommentBtns.vue'
import CommentAdd from 'components/Comment/CommentAdd.vue'

export default {
  name: "Comments",
  props: {
    comment: { // 父/子评论
      type: Object,
      default: () => { },
    },
    level: { // 评论层级
      type: Number,
      default: 2
    }
  },
  components: {
    CommentBtns, // 评论 时间、点赞数、评论数、回复按钮
    CommentAdd, // 评论 回复框
  },
  data () {
    return {
      currentComment: null, // 当前展示的评论框
    }
  },
  methods: {
    // 添加子评论
    addComment (content, commentId, to, level = 2) {
      this.$emit('comment', content, commentId, to, level);
      this.currentComment = null
    },
    // 展示/隐藏 评论输入框
    changeCurrent (i) {
      this.currentComment = i === this.currentComment ? null : i  // 多次点击, 切换展示
    },
  }
}
</script>

