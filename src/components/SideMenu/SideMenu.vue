<template>
  <q-scroll-area
    :visible="false"
    :thumb-style="thumbStyle"
  >
    <!-- 添加fixed，防止移动端向左滑动菜单留白 -->
    <div class="fixed full-width full-height">
      <!-- 用户菜单 -->
      <UserMenu />
      <!-- 菜单列表 -->
      <BaseMenu />
    </div>
  </q-scroll-area>
</template>

<script>
import { thumbStyle } from 'src/utils/thumbStyle'
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
      thumbStyle,
    }
  },
  mounted () {

  }
}
</script>
