<template>
  <div class="q-ml-xl">
    <q-btn-group flat>
      <q-chip class="text-caption" color="transparent" text-color="grey-6">{{comment.createTime | dateFormat}}</q-chip>
      <!-- <q-btn class="text-caption" flat dense :label="comment.createTime | dateFormat" color="grey-6" /> -->
      <CommentLike v-if="!isMessage" :comment="comment" :parentComment="parentComment" />
      <q-chip v-if="commentLength > 0" class="text-caption" icon="message" color="transparent" text-color="grey-6">{{commentLength}}</q-chip>
      <!-- <q-btn size="1rem" v-if="commentLength > 0" flat dense icon="message" :label="commentLength" color="grey-6" /> -->
      <q-chip class="text-caption" color="transparent" text-color="grey-6" clickable @click="showComment">回复</q-chip>
      <!-- <q-btn class="text-caption" flat dense color="grey-6" label="回复" @click="showComment" /> -->
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