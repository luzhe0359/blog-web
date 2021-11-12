<template>
  <q-card class="q-mb-lg">
    <q-card-section>
      <div class="row justify-center items-center no-wrap q-mb-sm">
        <q-separator inset />
        <div class="col-3 text-h6 text-center">标签</div>
        <q-separator inset />
      </div>
      <router-link :to="`/tag/${tag._id}`" v-for="tag in tagList" :key="tag._id">
        {{tag.name}}
        {{tag.name}}
      </router-link>
      <div @click="$q.dark.toggle()">点击切换黑暗模式</div>
      <!-- <q-button @click="$q.dark.toggle()">点击切换黑暗模式</q-button> -->
    </q-card-section>
  </q-card>
</template>

<script>
import { findTagCount } from 'src/api/tag.js'

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
      findTagCount().then(res => {
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
