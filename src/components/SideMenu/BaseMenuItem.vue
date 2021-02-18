<template>
  <q-item
    class="menu-item q-pl-md"
    exact
    clickable
    v-ripple
    tag="a"
    :to="path"
    :active="path === currentMenu"
    :active-class="'bg-grey-4'"
    @click="switchMenu()"
  >
    <q-item-section
      v-if="meta.icon"
      avatar
    >
      <q-icon :name="meta.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ meta.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters } from 'vuex'

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
    }
  },
  computed: {
    ...mapGetters([
      'currentMenu',
    ]),
  },
  methods: {
    logout () {
      this.$store.dispatch("user/Logout").then(() => {
        this.$q.notify({
          message: '退出成功',
          color: 'primary'
        })
        this.$router.replace('/login')
      }).catch(err => { })
    },
    switchMenu () {
      this.$store.dispatch("user/SetCurrentMenu", {
        path: '/' + this.path,
      }).then(() => {
      }).catch(err => {
        this.loading = false
      })
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
  // .q-item__label {
  //   height: 32px;
  //   line-height: 32px !important;
  // }
}
</style>