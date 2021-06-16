<template>
  <div class="gt-xs">
    <q-btn :flat="currentMenu !== ('/' + menu.path)" rounded color="grey-9" text-color="white" :label="menu.meta.title" v-for="menu in menuList" :key="menu.meta.title" :to="'/' + menu.path" @click="switchMenu(menu.path)" />
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
  created () {
    // 刷新时，同步选中菜单按钮
    this.currentMenu = this.$route.path
    this.getMenuList()
  },
  watch: {
    $route (newVal) {
      this.currentMenu = newVal.path
    }
  },
  methods: {
    // 获取顶部菜单
    getMenuList () {
      this.menuList = routes[0].children.filter(item => {
        return item.meta.menu
      })
    },
    // 切换菜单
    switchMenu (val) {
      this.currentMenu = '/' + val
    },
  }
}
</script>
<style lang="scss" scoped>
.q-btn {
  width: 60px;
  height: 32px;
  font-size: 16px;
  /deep/ .q-btn__wrapper {
    min-height: 100%;
    padding: 0;
  }
}
</style>