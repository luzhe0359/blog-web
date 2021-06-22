<template>
  <q-page id="Album">
    <div class="row max-width">
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-sm" v-for="item in list" :key="item._id">
        <div class="rounded-borders overflow-hidden relative-position">
          <q-img :ratio="16/9" :src="item.photos[0].url | imgBaseUrl" spinner-color="white" img-class="blur-image"></q-img>
          <div class="absolute-bottom text-subtitle1 text-center cursor-pointer" @click="toDetail(item._id)">
            {{item.album.name}}
          </div>
        </div>
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
      > div {
        line-height: 40px;
        background: rgba(0, 0, 0, 0.47);
        color: #fff;
      }
      /deep/ .blur-image {
        filter: blur(3px);
      }
      &:hover {
        /deep/ .blur-image {
          filter: blur(0px);
        }
        .q-img {
          transform: scale(1.2);
        }
      }
    }
    .q-img {
      transition: 0.8s;
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

