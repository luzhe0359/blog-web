<template>
  <div class="icon row q-ml-none items-center justify-center">
    <q-icon :size="size" class="q-mr-xs" :name="icon"></q-icon>
    <div>{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    size: { type: String, default: '20px' },
    icon: { type: String, default: 'none' },
    name: { type: Number | String, default: 0 },
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
/* .icon {
  margin-right: 32px;
} */

/* @media screen and (max-width: 600px) {
  .icon {
    margin-right: 10px;
  }
} */
</style>

