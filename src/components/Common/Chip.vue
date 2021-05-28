<template>
  <q-chip class="q-pl-none" :icon="icon" :size="size" :color="color" text-color="white">{{name}}</q-chip>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    size: { type: String, default: 'md' },
    icon: { type: String, default: 'none' },
    color: { type: String, default: 'transparent' },
    name: { type: Number | String, default: 0 },
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 32px;
}
</style>

