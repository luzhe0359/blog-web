<template>
  <!-- 一级评论 -->
  <div class="q-mb-lg" :class="{'q-ml-xl':!hideCancel}">
    <q-input type="textarea" outlined v-model="content" maxlength='200' placeholder="欢迎发表评论" lazy-rules />
    <div class="q-gutter-x-sm q-mt-xs row justify-end ">
      <q-btn v-if="!hideCancel" size="sm" color="primary" label="取消评论" @click="cancelComment" />
      <q-btn color="grey-7" padding="xs md" label="发表评论" @click="addComment" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddComment',
  props: {
    hideCancel: { type: Boolean, default: false },
  },
  data () {
    return {
      content: ""
    };
  },
  methods: {
    addComment () {
      // 判断用户是否登录
      let user = this.$q.localStorage.getItem("user")
      if (!user) {
        return this.$msg.warning('请先登录')
      }
      this.$emit("comment", this.content)
      this.content = ""
    },
    cancelComment () {
      this.$emit("cancelComment")
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .q-field--focused {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}
</style>