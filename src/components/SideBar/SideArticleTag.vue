<template>
  <div id="SideArticleTag" class="full-width q-mt-lg ">
    <div class="text-h6 q-mb-sm">文章标签</div>
    <div>
      <q-btn outline color="grey-8" size="sm" type="a" :to="`/tag/${tag._id}`" padding="6px 12px" class="q-mr-sm q-ml-none q-mb-sm" v-for="tag in tagList" :key="tag.icon" :label="tag.name" />
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
    },
    handleTag (_id) {
      this.$router.push({
        path: `/tag/${_id}`
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
