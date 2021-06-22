<template>
  <div>
    <q-btn flat dense icon="thumb_up" :label="comment.likes.length" size="sm" :color="isLikeColor" :disable="isLike" @click.stop="like" />
  </div>
</template>

<script>
import { likeComment } from 'src/api/comment.js'
import { getUserId } from 'src/utils/auth.js'

export default {
  name: "CommentLike",
  props: {
    comment: { // 评论
      type: Object,
      default: () => { },
    },
    parentComment: {
      type: Object,
      default: () => { },
    }
  },
  data () {
    return {
    }
  },
  computed: {
    // 是否点赞
    isLike () {
      const userId = getUserId()
      if (!userId || !this.comment.likes.some(u => u === userId)) return false
      return true
    },
    // 点赞状态
    isLikeColor () {
      return this.isLike ? 'deep-orange' : 'grey-5'
    }
  },
  methods: {
    // 评论点赞
    like () {
      const userId = getUserId()
      // 判断用户是否登录
      if (!userId) {
        return this.$msg.warning('请先登录')
      }
      let params = {
        userId
      }

      // 是否存在父评论
      if (this.parentComment) { // 存在, 当前为子评论
        params.commentId = this.parentComment._id
        params.otherCommentId = this.comment._id
      } else { // 不存在, 当前为父评论
        params.commentId = this.comment._id
      }

      // 提交/取消 点赞
      likeComment(params).then(res => {
        this.$msg.success(res.msg)
        this.$emit('loadComment')
      })
    },
  }
}
</script>

