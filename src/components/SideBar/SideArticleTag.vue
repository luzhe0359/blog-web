<template>
  <div id="SideArticleTag" class="full-width q-mt-lg ">
    <div class="text-h6 q-mb-sm">文章标签</div>
    <div>
      <q-chip outline color="grey-8" class="q-mr-md q-ml-none q-mb-sm" v-for="tag in tagList" :key="tag.icon">{{tag.name}}</q-chip>
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
    // 判断是否获取过 标签
    let tagList = this.$q.sessionStorage.getItem('tagList')
    if (tagList) {
      this.tagList = tagList
      return
    }
    this.findArticleTagList()
  },
  methods: {
    findArticleTagList () {
      findTagList().then(res => {
        this.$q.sessionStorage.set('tagList', res.data)
        this.tagList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.q-chip {
  border-radius: 4px;
}
</style>
