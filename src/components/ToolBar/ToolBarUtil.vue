<template>
  <div class="q-ml-lg">
    <!-- 登录按钮 -->
    <q-no-ssr>
      <q-btn class="text-subtitle1 login" flat padding="5px 16px" icon="person" label="登录" @click="showLogin = true" v-show="!name" />
    </q-no-ssr>
    <!-- 头像菜单 -->
    <q-btn flat round size="sm" v-show="name">
      <!-- 头像 -->
      <q-avatar size="28px" class="cursor-pointer">
        <q-img transition="slide-down" :src="avatar" :placeholder-src="$BASE_IMG_URL" spinner-color="grey" />
      </q-avatar>
      <!-- 菜单 -->
      <q-menu transition-show="jump-down" transition-hide="jump-up" anchor="bottom middle" self="top middle">
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section @click="openUserInfo">个人中心</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup @click='logout'>
            <q-item-section>退出系统</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <Logon :show="showLogin" @close="close" />
    <UserInfo :show="showUserInfo" @close="closeUserInfo" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Logon from 'components/logon/Logon'
import UserInfo from 'components/UserInfo/UserInfo'

export default {
  name: 'ToolBarUtil',
  components: {
    Logon,
    UserInfo
  },
  data () {
    return {
      showLogin: false,
      showUserInfo: false,
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name'
    ]),
  },
  methods: {
    logout () {
      const user = this.$q.localStorage.getItem('user')
      this.$store.dispatch("user/Logout", { _id: user._id || '' }).then(() => {
        this.$msg.success('退出成功')
      }).catch(err => { })
    },
    close () {
      this.showLogin = false
    },
    openUserInfo () {
      this.showUserInfo = true
    },
    closeUserInfo () {
      this.showUserInfo = false
    },
  }
}
</script>
<style lang="scss" scoped>
.login {
  /deep/ .q-icon {
    font-size: 1.2rem;
    margin-top: 0.2rem;
    margin-right: 4px;
  }
}
</style>