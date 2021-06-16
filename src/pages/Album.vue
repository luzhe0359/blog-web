<template>
  <q-page id="Album">
    <div class="row max-width">
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-sm" v-for="item in list" :key="item._id">
        <q-img class="rounded-borders" :ratio="16/9" :src="item.photos[0].url | imgBaseUrl" spinner-color="white" img-class="blur-image">
          <div class="absolute-bottom text-subtitle1 text-center cursor-pointer" @click="toDetail(item._id)">
            {{item.album.name}}
          </div>
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
import { findPhotoList, findAlbumList } from 'src/api/photo.js'

export default {
  name: 'Album',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.findAlbumList()
  },
  methods: {
    // 获取相册列表
    findAlbumList () {
      findAlbumList().then(res => {
        this.list = res.data
      })
    },
    // 跳转照片列表
    toDetail (_id) {
      this.$router.push({
        path: `/photo/${_id}`
      })
    }
  },
}
</script>
<style lang="scss" scoped>
#Album {
  // height: calc(100vh - 50px);
  max-width: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  // background-image: url("~assets/bg_album.png");
  .max-width {
    max-width: 1200px;
    margin: 0 auto;
    .rounded-borders {
      border-radius: 36px;
    }
    /deep/ .blur-image {
      filter: blur(2px);
    }
  }
}

@media (max-width: $breakpoint-sm-max) {
  #Album {
    padding-top: 10px;
    .rounded-borders {
      border-radius: 4px !important;
    }
  }
}
</style>

