<template>
  <!-- 个人信息 -->
  <q-card :bordered="false" class="no-border-radius no-box-shadow">
    <q-card-section>
      <!-- 头像 -->
      <q-avatar round size="60px" class="cursor-pointer shadow-6">
        <q-img no-default-spinner transition="slide-down" :src="avatar | imgBaseUrl" placeholder-src="~assets/logo.webp" />
      </q-avatar>
      <!-- 昵称 -->
      <div class="text-h6 q-mt-sm text-grey-10">
        {{ nickname }}
      </div>
      <!-- 个签 -->
      <div class="text-subtitle2 ellipsis text-grey-8">
        {{ about }}
        <q-tooltip anchor="bottom middle" transition-show="jump-right" transition-hide="jump-left">
          {{ about }}
        </q-tooltip>
      </div>
    </q-card-section>
    <q-separator color="grey-5" />
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  data () {
    return {
      timer: null,
    }
  },
  computed: {
    ...mapGetters([
      'about',
      'avatar',
      'nickname'
    ]),
  }
}
</script>
<style lang="scss" scoped>
.no-border-radius {
  background-color: inherit;
}
</style>