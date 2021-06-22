<template>
  <div class="q-ml-xl">
    <q-btn-group class="q-gutter-x-md" flat>
      <q-btn flat dense icon="star_border" :label="comment.createTime | dateFormat" size="sm" color="grey" />
      <CommentLike :comment="comment" :parentComment="parentComment" @loadComment="loadComment" />
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
    },
    loadComment () {
      this.$emit('loadComment')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>