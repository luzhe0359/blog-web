<template>
  <div id="SideUserAvatar" class="full-width">
    <!-- 响应式容器 子元素height:100%-->
    <q-responsive :ratio="10/9">
      <div>
        <div class="avatar relative-position">
          <q-avatar size="90px">
            <q-img basic src="~assets/logo.png" />
          </q-avatar>
        </div>
        <div class="text-center name">足各路</div>
        <div class="text-center about ">一路一足一世界。</div>
      </div>
    </q-responsive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SideUserAvatar',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
    ]),
  },
}
</script>

<style lang="scss" scoped>
#SideUserAvatar {
  background: #fff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  overflow: hidden;
  .avatar {
    height: 50%;
    background: url("/bg/code0.png") no-repeat 100% 100%;
    background-size: cover;
    .q-avatar {
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .name {
    margin-top: 15%;
    font-size: 18px;
    font-weight: 600;
    line-height: 26px;
  }
  .about {
    padding-bottom: 40px;
  }
}
</style>
