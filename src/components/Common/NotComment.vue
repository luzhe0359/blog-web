<template>
  <div class="column items-center">
    <img alt="not_comment" src="https://oss.zugelu.com/other/not_comment.png" style="max-width:350px;width:100%;">
    <div class="text-grey-8 q-mt-md text-subtitle1">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'NotComment',
  props: {
    title: { type: String, default: '暂无评论' },
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

