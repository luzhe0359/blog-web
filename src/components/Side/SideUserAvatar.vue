<template>
  <div id="SideUserAvatar" class="full-width">
    <!-- 响应式容器 子元素height:100%-->
    <q-responsive :ratio="10/9">
      <div>
        <div class="avatar relative-position">
          <q-avatar size="90px">
            <q-img basic src="~assets/logo.jpg" />
          </q-avatar>
        </div>
        <div class="text-center name">足各路</div>
        <div class="text-center about ">这个人很懒，什么都没留下!!!</div>
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
  border-radius: 36px;
  overflow: hidden;
  .avatar {
    height: 50%;
    background: url("http://127.0.0.1:3000/images/file-1619610591166.jpg")
      no-repeat 100% 100%;
    background-size: cover;
    .q-avatar {
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
