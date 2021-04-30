<template>
  <div>
    <q-btn flat dense icon="thumb_up" :label="comment.likes.length" size="sm" :color="isLike" @click.stop="like" />
  </div>
</template>

<script>
import { likeComment } from 'src/api/comment.js'

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
    // 判断用户是否点赞
    isLike () {
      // likes.some(u => u=== $q.localStorage.getItem('user')._id)?'primary':'grey-5'
      let user = this.$q.localStorage.getItem('user')
      if (this.comment.likes.some(u => u === user._id)) {
        return 'primary'
      } else {
        return 'grey-5'
      }
    },
  },
  methods: {
    // 评论点赞
    like () {
      this.$q.loading.show()
      let params = {
        userId: this.$q.localStorage.getItem("user")._id,
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
        this.$q.loading.hide()
        this.$q.notify({
          message: res.msg,
          color: 'primary'
        })
        if (!this.parentComment) {
          return this.$set(this.comment, 'likes', res.data.likes)
        }
        let otherComment = res.data.otherComments.filter(item => item._id === this.comment._id)
        this.$set(this.comment, 'likes', otherComment[0].likes)
      })
    }
  }
}
</script>

