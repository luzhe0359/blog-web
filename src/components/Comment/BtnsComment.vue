<template>
  <div class="q-ml-xl">
    <q-btn-group
      class="q-gutter-x-md"
      flat
    >
      <q-btn
        flat
        dense
        icon="star_border"
        :label="createTime | dateFormat"
        size="sm"
        color="grey-5"
      />
      <q-btn
        flat
        dense
        icon="thumb_up"
        :label="likes.length"
        size="sm"
        :color="likes.some(u => u=== $q.localStorage.getItem('user')._id)?'primary':'grey-5'"
        @click="addLikes"
      />
      <!-- comments === -1 为回复评论、不计数  -->
      <q-btn
        v-if="comments !== -1"
        flat
        dense
        icon="message"
        :label="comments"
        size="sm"
        color="grey-5"
      />
      <q-btn
        flat
        dense
        size="sm"
        color="primary"
        label="回复"
        @click="showComment"
      />
    </q-btn-group>
  </div>
</template>

<script>
export default {
  name: 'BtnsComment',
  data () {
    return {
    };
  },
  props: {
    createTime: { type: Number, default: new Date() },
    likes: { type: Array, default: () => [] },
    comments: { type: Number, default: 0 },
  },
  methods: {
    showComment () {
      this.$emit('showComment')
    },
    addLikes () {
      this.$emit('likeComment')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>