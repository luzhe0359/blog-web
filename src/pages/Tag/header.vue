<template>
  <div class="page-header">
    <h1 class="text-h4 text-center q-mb-lg">文章标签</h1>
    <!-- 标签列表 -->
    <div class="q-gutter-md max-width row">
      <div :class="{'active':currentId === tag._id}" @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
        {{tag.name}}
      </div>
      <!-- <q-chip :class="{'active':currentId === tag._id}" text-color="dark" clickable @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
        <q-avatar class="small-shadow" :color="currentId === tag._id?'light-blue':'grey-5'" text-color="grey-8">{{tag.count}}</q-avatar>
        {{tag.name}}
      </q-chip> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      currentId: ''
    }
  },
  computed: {
    ...mapGetters([
      'tagList'
    ]),
  },
  mounted () {
    this.currentId = this.$route.params._id
    // this.currentId && this.changeTag()
  },
  methods: {
    // 切换文章分类
    changeTag (tabId) {
      this.currentId = tabId
      this.$emit('changeTag', tabId)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  background-image: url("~assets/body-hand.jpg");
}
.q-tab {
  padding: 0 14px;
  height: 30px !important;
  min-height: 30px !important;
}
.active {
  background-color: #03a9f4;
}
</style>