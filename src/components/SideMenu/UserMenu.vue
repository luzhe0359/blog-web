<template>
  <!-- 个人信息 -->
  <q-card
    :bordered="false"
    class="no-border-radius no-box-shadow"
  >
    <q-card-section>
      <!-- <div class="now-time absolute-right q-pa-md text-subtitle1 text-grey-5">{{nowDate}}</div> -->
      <!-- 头像 -->
      <q-avatar
        round
        size="48px"
        class="cursor-pointer"
        @click="$router.push('/userInfo')"
      >
        <img :src="userAvatar | imgBaseUrl" />
      </q-avatar>
      <!-- 昵称 -->
      <div class="text-h6 q-mt-sm text-grey-9">
        {{ nickname }}
      </div>
      <!-- 个签 -->
      <div class="text-subtitle2 ellipsis text-grey-6">
        {{ about }}
        <q-tooltip
          anchor="center right"
          self="center left"
          transition-show="jump-right"
          transition-hide="jump-left"
        >
          {{ about }}
        </q-tooltip>
      </div>
    </q-card-section>
    <q-separator color="grey-3" />
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'UserMenu',
  data () {
    return {
      timer: null,
      nowDate: date.formatDate(new Date(), 'hh:mm:ss A'),
      userAvatar: '',
    }
  },
  computed: {
    ...mapGetters([
      'about',
      'avatar',
      'nickname'
    ]),
  },
  mounted () {
    this.userAvatar = this.avatar
    this.timer = setInterval(() => {
      this.nowDate = date.formatDate(new Date(), 'hh:mm:ss A')
    }, 1000)
  },
  beforeDestroy () {
    this.timer && clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.no-border-radius {
  background-color: inherit;
}
</style>