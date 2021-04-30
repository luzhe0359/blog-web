<template>
  <div id="SideArticleTag" class="full-width q-mt-lg ">
    <div class="text-h6 q-mb-md">文章标签</div>
    <div>
      <q-chip outline v-for="tag in tagList" :key="tag.icon" class="q-mr-md q-ml-none q-mb-sm">{{tag.name}}</q-chip>
    </div>
  </div>
</template>

<script>
import { findTagList } from 'src/api/tag.js'

export default {
  name: 'SideArticleTag',
  data () {
    return {
      tagList: []
    }
  },
  mounted () {
    this.findArticleTagList()
  },
  methods: {
    findArticleTagList () {
      findTagList().then(res => {
        this.tagList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
