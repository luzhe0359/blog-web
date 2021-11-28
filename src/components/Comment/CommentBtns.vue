<template>
  <div :class="comment.level ? 'second-comment': 'first-comment'">
    <q-chip class="text-caption" color="transparent" text-color="grey-6">
      {{comment.createTime | dateFormat}}
      <q-tooltip :delay="1000" :offset="[0, 10]">
        {{comment.createTime | dateDiff}}
      </q-tooltip>
    </q-chip>
    <q-chip class="like-box text-caption" color="transparent" text-color="grey-6">
      <q-icon class="like q-mr-xs" name="thumb_up" :color="isLikeColor" @click.stop="handleLike"></q-icon>
      {{likeCount}}
    </q-chip>
    <q-btn class="text-caption" flat dense color="grey-6" label="回复" @click="showComment" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { likeComment } from 'src/api/comment.js'
import { getUserId } from 'src/utils/auth.js'

export default {
  name: 'BtnsComment',
  props: {
    comment: { // 当前评论
      type: Object,
      default: () => { },
    },
    parentComment: { // 父评论
      type: Object,
      default: () => { },
    }
  },
  data () {
    return {
      likeCount: 0,
      isLike: false
    }
  },
  computed: {
    // 点赞状态
    isLikeColor () {
      return this.isLike ? 'red-5' : 'grey-6'
    },
    ...mapGetters([
      'token'
    ])
  },
  watch: {
    // token变化，用户登录状态更改，改变点赞状态
    token: {
      handler (n, o) {
        this.isLike = this.handleIsLike()
      },
      immediate: true
    }
  },
  created () {
    this.likeCount = this.comment.likes.length
    this.isLike = this.handleIsLike()
  },
  methods: {
    showComment () {
      this.$emit('showComment')
    },
    // 评论点赞
    handleLike () {
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
        if (this.isLike) {
          this.likeCount--
        } else {
          this.likeCount++
        }
        this.isLike = !this.isLike
      })
    },
    // 判断是否点赞
    handleIsLike () {
      const userId = getUserId()
      if (!userId || !this.comment.likes.some(u => u === userId)) return false
      return true
    }
  }
};
</script>
<style lang="scss" scoped>
.q-chip {
  &.like-box {
    .like {
      font-size: 1.5em !important;
      transition: all 0.2s;
      cursor: pointer;
      &:hover {
        color: red !important;
        transform: scale(1.1);
      }
    }
  }
}
.first-comment {
  margin-left: 2.5rem;
}
.second-comment {
  margin-left: 1.5rem;
}
</style>