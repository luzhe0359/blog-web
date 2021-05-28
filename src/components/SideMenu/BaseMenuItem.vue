<template>
  <q-item class="menu-item q-pl-md" exact clickable v-ripple tag="a" :to="'/'+path" :active="path === currentMenu" :active-class="'bg-grey-4'">
    <q-item-section v-if="meta.icon" avatar>
      <q-icon :name="meta.icon + ' iconfont'" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ meta.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>

export default {
  name: 'BaseMenuItem',
  props: {
    meta: {
      type: Object,
    },
    path: {
      type: String,
      default: '#'
    },
    event: {
      type: String,
      default: ''
    },
    currentMenu: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    logout () {
      const user = this.$q.localStorage.getItem('user')
      this.$store.dispatch("user/Logout", { _id: user._id || '' }).then(() => {
        this.$q.notify({
          message: '退出成功',
          color: 'primary'
        })
        this.$router.replace('/login')
      }).catch(err => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  .q-item__section--avatar {
    color: inherit;
    min-width: 40px;
  }
}
</style>