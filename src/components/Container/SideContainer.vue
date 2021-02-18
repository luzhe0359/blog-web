<template>
  <div
    :class="$q.screen.lt.md?'q-pl-lg':'q-pl-xl'"
    id="SideContainer"
  >
    <div
      id="container"
      :class="$q.screen.lt.md?'q-pa-lg':' pa-xl'"
    >
      <SideUserAvatar />
      <SideUserTag />
      <SideBlogInfo />
      <SideArticleInfo />
      <SideArticleTag />
    </div>
  </div>
</template>

<script>
import SideUserAvatar from './SideUserAvatar'
import SideUserTag from './SideUserTag'
import SideBlogInfo from './SideBlogInfo'
import SideArticleInfo from './SideArticleInfo'
import SideArticleTag from './SideArticleTag'
export default {
  name: 'SideContainer',
  components: {
    SideUserAvatar,
    SideUserTag,
    SideBlogInfo,
    SideArticleInfo,
    SideArticleTag
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
#SideContainer {
  margin-top: 130px;

  #container {
    position: sticky;
    top: 0;
    background: #ebecec;
    border-radius: 50px;
    box-sizing: border-box;
  }
}
.pa-xl {
  padding: 35px;
}
</style>