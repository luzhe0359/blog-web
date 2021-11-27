<template>
  <q-card class="q-mb-lg">
    <q-card-section>
      <SideTitle title="公告" />
      <div class="text-subtitle1">
        📢 温馨提示：2.0版本上线啦！
        全新的界面，全新的体验。右下角工具栏有惊喜🎉🎉。
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import SideTitle from 'components/Common/SideTitle'

export default {
  name: 'SideNotice',
  components: {
    SideTitle
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
