<template>
  <q-tabs align="left" narrow-indicator animated v-model="tab" active-color="white" indicator-color="white" style="height:30px;">
    <q-tab :ripple="false" :name="tab._id" :label="tab.name" v-for="tab in tabList" :key="tab._id" @click="changeTab(tab._id)" />
  </q-tabs>
</template>

<script>
export default {
  name: 'tabList',
  props: {
    tabList: { type: Array, default: () => [] },
  },
  data () {
    return {
      tab: 'zugelu'
    }
  },
  methods: {
    // 分类切换，自带参数
    changeTab (tabId) {
      this.$emit('changeTab', tabId)
    }
  }
}
</script>

<style lang="scss" scoped>
.q-tab {
  padding: 0 14px;
  height: 30px !important;
  min-height: 30px !important;
  color: #dcdcdc;
}
</style>
