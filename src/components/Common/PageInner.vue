<template>
  <div class="page-inner row justify-center">
    <div class="col-sm-12 col-md-9" :class="{'col-md-10':column === 'single'}">
      <slot name="inner-left"></slot>
    </div>
    <div class="col q-pl-lg gt-sm" v-show="column === 'double'">
      <slot name="inner-right"></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'column'
    ])
  }
}
</script>
<style lang="scss" scoped>
</style>