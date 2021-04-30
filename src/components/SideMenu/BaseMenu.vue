<template>
  <q-list>
    <BaseMenuItem v-for="menu in menuList" :key="menu.meta.title" v-bind="menu" />
  </q-list>
</template>

<script>
import BaseMenuItem from './BaseMenuItem.vue'
import routes from 'src/router/routes.js'

export default {
  name: 'BaseMenu',
  components: {
    BaseMenuItem
  },
  data () {
    return {
      menuList: []
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    // 获取左侧菜单
    getMenuList () {
      this.menuList = routes[0].children.filter(item => {
        return item.meta.menu
      })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>