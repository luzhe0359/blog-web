<template>
  <div class="q-ml-xl">
    <q-btn-group class="q-gutter-x-md" flat>
      <q-btn flat dense :label="comment.createTime | dateFormat" size="sm" color="grey" />
      <CommentLike v-if="!isMessage" :comment="comment" :parentComment="parentComment" />
      <q-btn v-if="commentLength > 0" flat dense icon="message" :label="commentLength" size="sm" color="grey" />
      <q-btn flat dense size="sm" color="grey" label="回复" @click="showComment" />
    </q-btn-group>
  </div>
</template>

<script>
import CommentLike from 'components/Comment/CommentLike.vue'
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
    },
    isMessage: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CommentLike
  },
  data () {
    return {
    };
  },
  computed: {
    // 2级评论长度
    commentLength () {
      if (this.comment.otherComments) {
        return this.comment.otherComments.length
      }
    }
  },
  methods: {
    showComment () {
      this.$emit('showComment')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>