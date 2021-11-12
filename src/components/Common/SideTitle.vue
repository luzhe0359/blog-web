<template>
  <div class="row justify-center items-center no-wrap q-mb-sm">
    <q-separator inset class="col" />
    <div class="text-h6 text-center side-title">{{title}}</div>
    <q-separator inset class="col" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.side-title {
  min-width: 60px;
}
</style>
