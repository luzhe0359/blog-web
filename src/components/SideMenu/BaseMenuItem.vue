<template>
  <q-item class="menu-item q-pl-md text-weight-medium" exact clickable v-ripple tag="a" :to="{ name }" :active="name === currentMenu" :active-class="'item-active'">
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
    name: {
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
        this.$msg.success('退出成功')
      }).catch(err => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  &.item-active {
    color: $primary;
  }
  .q-item__section--avatar {
    color: inherit;
    min-width: 40px;
  }
}
</style>