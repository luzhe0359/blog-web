<template>
  <div class="icon row q-ml-none items-center justify-center">
    <q-icon class="q-mr-xs" size="xs" :name="icon"></q-icon>
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
.q-icon {
  font-size: 0.875rem !important;
  margin-top: 0.1rem;
  /* line-height: 1.1 !important; */
}

/* @media screen and (max-width: 600px) {
  .icon {
    margin-right: 10px;
  }
} */
</style>

