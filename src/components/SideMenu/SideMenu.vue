<template>
  <q-scroll-area :visible="false" :thumb-style="thumbStyle">
    <!-- 添加fixed，防止移动端向左滑动菜单留白 -->
    <q-card class="fixed fit">
      <!-- 用户菜单 -->
      <UserMenu />
      <!-- 菜单列表 -->
      <BaseMenu />
    </q-card>
  </q-scroll-area>
</template>

<script>
import BaseMenu from './BaseMenu'
import UserMenu from './UserMenu'

export default {
  name: 'SideMenu',
  components: {
    BaseMenu,
    UserMenu
  },
  data () {
    return {
      thumbStyle: {
        borderRadius: '6px',
        backgroundColor: 'grey-1',
        width: '6px'
      }
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
</style>
