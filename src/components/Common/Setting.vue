<template>
  <q-page-sticky position="bottom-right" :offset="[0, 100]" v-show="showSetting">
    <div class="column q-gutter-y-xs">
      <q-btn padding="xs" color="light-blue" :icon="$q.fullscreen.isActive?'fullscreen_exit':'fullscreen'" v-if="$q.screen.gt.sm" @click="$q.fullscreen.toggle()">
        <q-tooltip anchor="center left" self="center right" :offset="[5, 5]" transition-show="jump-left" transition-hide="jump-right">{{ $q.fullscreen.isActive? '退出全屏': '全屏' }}</q-tooltip>
      </q-btn>
      <q-btn padding="xs" color="light-blue" :icon="$q.dark.mode ? 'brightness_5' : 'brightness_4'" @click="changeThem">
        <q-tooltip anchor="center left" self="center right" :offset="[5, 5]" transition-show="jump-left" transition-hide="jump-right">{{ $q.dark.isActive? '高亮模式': '黑暗模式' }}</q-tooltip>
      </q-btn>
      <q-btn class="setting-column" padding="xs" color="light-blue" :icon="column === 'double'? 'unfold_less': 'unfold_more'" @click="changeColumn">
        <q-tooltip anchor="center left" self="center right" :offset="[5, 5]" transition-show="jump-left" transition-hide="jump-right">{{ column === 'double'? '切换单栏': '切换双栏' }}</q-tooltip>
      </q-btn>
    </div>
  </q-page-sticky>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    showSetting: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'column'
    ]),
  },
  methods: {
    // 切换主题
    changeThem () {
      this.$q.dark.toggle()
      this.$q.sessionStorage.set('them-dark', this.$q.dark.mode)
    },
    // 切换单双栏
    changeColumn () {
      this.$store.commit('user/SET_COLUMN', this.column === 'double' ? 'single' : 'double')
    },
  }
}
</script>

<style lang="scss" scoped>
.setting-column {
  ::v-deep i {
    transform: rotate(90deg);
  }
}
</style>