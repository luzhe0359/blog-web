<template>
  <q-card>
    <q-card-section class="column items-center ">
      <img class="q-mt-lg" src="~assets/not_found.png" width="350px">
      <div class="text-grey-8 q-mt-md text-subtitle1">{{title}}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    title: { type: String, default: '暂无数据' },
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

