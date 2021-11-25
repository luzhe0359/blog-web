<template>
  <div class="gt-xs">
    <q-btn class="text-subtitle1 q-mr-xs" padding="5px 16px" flat :text-color="currentMenu === menu.name ? 'light-blue': ''" :label="menu.meta.title" v-for="menu in menuList" :key="menu.meta.title" :to="{ name: menu.name }" @click="currentMenu = menu.name" />
  </div>
</template>

<script>
import routes from 'src/router/routes.js'

export default {
  name: 'ToolBarMenu',
  data () {
    return {
      currentMenu: null,
      menuList: [],
    }
  },
  watch: {
    $route (n) {
      this.currentMenu = n.name
    }
  },
  created () {
    // 刷新时，同步选中菜单按钮
    this.currentMenu = this.$route.name
    this.getMenuList()
  },
  methods: {
    // 获取顶部菜单
    getMenuList () {
      this.menuList = routes[0].children.filter(item => {
        return item.meta.menu
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// title字体
@media (max-width: 888px) {
  .q-btn {
    margin-right: 0;
    /deep/ .q-btn__wrapper {
      padding: 5px 10px !important;
    }
  }
}
</style>