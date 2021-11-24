<template>
  <q-card class="q-mb-lg">
    <q-card-section>
      <SideTitle title="标签" />
      <router-link :style="{'color': tag.color, 'fontSize':tag.size}" :to="`/tag/${tag._id}`" v-for="tag in tagList" :key="tag._id">
        {{tag.name}}
      </router-link>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'

import SideTitle from 'components/Common/SideTitle'

export default {
  name: 'SideArticleTag',
  components: {
    SideTitle
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'tagList'
    ])
  }
}
</script>

<style lang="scss" scoped>
.q-chip {
  border-radius: 4px;
}
</style>
