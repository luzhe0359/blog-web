<template>
  <div
    id="SideUserAvatar"
    class="full-width"
  >
    <div class="avatar relative-position">
      <q-avatar size="100px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      </q-avatar>
    </div>
    <div class="text-center name">足各路</div>
    <div class="text-center about ellipsis">这个人很懒，什么都没留下!!!</div>
  </div>
</template>

<script>

export default {
  name: 'SideUserAvatar',
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
#SideUserAvatar {
  background: #fff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 36px;
  overflow: hidden;
  .avatar {
    height: 158px;
    background: url("https://cdn.quasar.dev/img/boy-avatar.png") no-repeat 100%
      100%;
    .q-avatar {
      position: absolute;
      bottom: -50px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .name {
    margin-top: 60px;
    height: 26px;
    font-size: 18px;
    font-weight: 600;
    line-height: 26px;
  }
  .about {
    padding-bottom: 40px;
  }
}
</style>
