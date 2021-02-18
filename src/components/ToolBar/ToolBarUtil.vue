<template>
  <div class="q-gutter-sm q-ml-xl">
    <!-- 登录按钮 -->
    <q-no-ssr>
      <q-btn
        dense
        size="md"
        icon="person_outline"
        label="登录"
        to="/login"
        class="login"
        v-show="!name"
      />
    </q-no-ssr>
    <!-- 头像菜单 -->
    <q-btn
      flat
      round
      size="sm"
      v-show="name"
    >
      <!-- 头像 -->
      <q-avatar
        size="28px"
        class="cursor-pointer"
      >
        <q-img
          no-default-spinner
          transition="slide-down"
          :src="avatar | imgBaseUrl"
          :placeholder-src="'/images/default_avatar.jpeg' | imgBaseUrl"
        />
      </q-avatar>
      <!-- 菜单 -->
      <q-menu
        transition-show="jump-down"
        transition-hide="jump-up"
        anchor="bottom middle"
        self="top middle"
      >
        <q-list>
          <q-item
            clickable
            v-close-popup
          >
            <q-item-section @click="$router.push('/user')">个人中心</q-item-section>
          </q-item>
          <q-separator />
          <q-item
            clickable
            v-close-popup
            @click='logout'
          >
            <q-item-section>退出系统</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ToolBarUtil',
  data () {
    return {
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
      this.$store.dispatch("user/Logout").then(() => {
        this.$q.notify({
          message: '退出成功',
          color: 'primary'
        })
      }).catch(err => { })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 66px;
  height: 32px;
  font-size: 16px !important;
  /deep/ .q-btn__wrapper {
    min-height: 100%;
    padding: 0;
  }
  /deep/ .q-icon {
    font-size: 22px;
    margin-right: 0 !important;
  }
}
</style>