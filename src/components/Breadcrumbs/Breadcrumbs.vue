<template>
  <!-- 面包屑 -->
  <q-breadcrumbs
    class="text-grey-6"
    active-color="grey-7"
  >
    <q-breadcrumbs-el
      :label="item.meta.title"
      :icon="item.meta.icon"
      :to="item.path"
      v-for="(item, index) in breadList"
      :key="index + item.title"
    />
  </q-breadcrumbs>
</template>

<script>
export default {
  data () {
    return {
      breadList: [] // 路由集合
    };
  },
  watch: {
    $route () {
      this.getBreadcrumb();
    }
  },
  created () {
    this.getBreadcrumb();
  },
  methods: {
    isHome (route) {
      return route.name === "home";
    },
    getBreadcrumb () {
      let matched = this.$route.matched;
      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/home", meta: { title: "首页", icon: 'home' } }].concat(matched);
      }
      this.breadList = matched;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>