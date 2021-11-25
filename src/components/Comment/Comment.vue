<template>
  <!-- 二级评论 -->
  <div class="full-width q-mb-md" ref="main">
    <q-chat-message class="q-mb-none" bg-color="grey-3">
      <!-- <q-chat-message class="q-mb-none" name-sanitize text-sanitize :name="comment.from.nickname" :avatar="comment.from.avatar" :text="[comment.content]" :stamp="comment.createTime | dateDiff" bg-color="grey-3"> -->
      <template v-slot:avatar>
        <q-avatar class="q-mr-sm" size="3rem">
          <q-img native-context-menu :src="comment.from.avatar" :placeholder-src="$BASE_IMG_URL" />
        </q-avatar>
      </template>
      <template v-slot:name>
        <div class="text-subtitle1">{{comment.from.nickname}}</div>
      </template>
      <div class="text-body2">{{comment.content}}</div>
    </q-chat-message>
    <CommentBtns :comment="comment" :isMessage="isMessage" @showComment="changeCurrent(comment._id)" />
    <CommentAdd v-if="currentComment === comment._id" @comment="addComment($event, comment._id, comment.from._id)" @cancelComment="currentComment = null" />
    <!-- 三级评论 -->
    <div class="q-pl-xl q-mt-sm" v-for="child in comment.otherComments" :key="child._id">
      <q-chat-message :name="child.level === 2?`${child.from.nickname}`:`${child.from.nickname} <span class='text-orange'>回复</span> ${child.to.nickname}`" :avatar="child.from.avatar" :text="[child.content]" :stamp="child.createTime | dateDiff" bg-color="grey-3">
        <template v-slot:avatar>
          <q-avatar class="q-mr-sm" size="2rem">
            <q-img native-context-menu :src="comment.from.avatar" :placeholder-src="$BASE_IMG_URL" />
          </q-avatar>
        </template>
        <template v-slot:name>
          <div v-if="child.level === 2">{{comment.from.nickname}}</div>
          <div v-else>
            {{child.from.nickname}} <span class='text-orange'>回复</span> {{child.to.nickname}}
          </div>
        </template>
      </q-chat-message>
      <CommentBtns :comment="child" :isMessage="isMessage" :parentComment="comment" @showComment="changeCurrent(child._id)" />
      <CommentAdd v-if="currentComment === child._id" @comment="addComment($event, comment._id, child.from._id, 3)" @cancelComment="currentComment = null" />
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
    isMessage: { // 是否为留言
      type: Boolean,
      default: false
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
      document.addEventListener('click', this.hideCommentInput, false)
    },
    // 点击空白处隐藏评论输入框
    hideCommentInput (e) {
      if (!this.$refs.main.contains(e.target)) {
        this.currentComment = null
        document.removeEventListener('click', this.hideCommentInput, false)
      }
    },
  },
  beforeDestroy () {
    document.removeEventListener('click', this.hideCommentInput, false)
  }
}
</script>

