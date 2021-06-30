<template>
  <div id="SideUserAvatar" class="full-width">
    <!-- 响应式容器 子元素height:100%-->
    <q-responsive :ratio="10/9">
      <div class="relative-position">
        <div class="bg-box overflow-hidden">
          <div class="avatar-bg fit"></div>
        </div>
        <div class="avatar cursor-pointer">
          <q-avatar class="avatar-logo" size="90px">
            <q-img basic src="~assets/logo.webp" spinner-color="white" />
          </q-avatar>
          <q-avatar class="avatar-user hidden" size="90px">
            <q-img basic src="~assets/auth_logo.webp" spinner-color="white" />
          </q-avatar>
        </div>
        <div class="title-box">
          <div class="text-center name">足各路</div>
          <!-- <div class="text-center about">一足一路一世界</div> -->
          <BallEffects />
        </div>
      </div>
    </q-responsive>
  </div>
</template>

<script>
import BallEffects from 'src/components/Common/BallEffects.vue'

export default {
  name: 'SideUserAvatar',
  components: {
    BallEffects,
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
#SideUserAvatar {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  overflow: hidden;
  .bg-box {
    height: 55%;
    .avatar-bg {
      background: url("~assets/bg_logo.webp") no-repeat;
      background-position: 90% 50%;
      background-size: cover;
      animation: kenburns-top-right 5s cubic-bezier(0.47, 0, 0.745, 0.715)
        reverse both;
    }
  }
  .avatar {
    width: 90px;
    height: 90px;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -60%);
    background-size: cover;
    background-repeat: no-repeat;
    .avatar-logo {
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
      animation: rotate-in-2-cw 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
    &:hover {
      .avatar-logo {
        animation: rotate-out-2-fwd 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
          both;
      }
      .avatar-user {
        position: relative;
        top: -100%;
        display: block !important;
        animation: rotate-in-2-cw 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }
    }
  }
  .title-box {
    height: 45%;
    position: relative;
  }
  .name {
    padding-top: 15%;
    font-size: 18px;
    font-weight: 600;
    line-height: 26px;
  }
}
</style>
