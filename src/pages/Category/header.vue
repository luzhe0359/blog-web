<template>
  <div class="page-header">
    <h1 class="text-h4 text-center q-mb-lg">文章分类</h1>
    <!-- 分类列表 -->
    <q-tabs v-model="activeTab" align="center" outside-arrows mobile-arrows narrow-indicator animated active-color="light-blue" indicator-color="light-blue">
      <q-tab :ripple="false" :name="tab._id" :label="tab.name" v-for="tab in categoryList" :key="tab._id" @click="changeTab(tab._id)" />
    </q-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      activeTab: 'zugelu'
    }
  },
  computed: {
    ...mapGetters([
      'categoryList'
    ]),
  },
  methods: {
    // 切换文章分类
    changeTab (tabId) {
      this.$emit('changeTab', tabId)
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
</style>