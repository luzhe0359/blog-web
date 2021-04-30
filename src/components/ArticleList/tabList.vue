<template>
  <q-tabs align="left" v-model="tabId" narrow-indicator animated class="text-grey" active-color="white" indicator-color="white" @input="changeTab" style="height:30px;">
    <q-tab style="height:30px;" :ripple="false" :name="tab._id" :label="tab.name" v-for="tab in tabList" :key="tab._id" />
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
      tabId: 'zugelu' // 当前分类Id
    }
  },
  methods: {
    // 分类切换，自带参数
    changeTab (value) {
      this.$emit('changeTab', value)
    }
  }
}
</script>

