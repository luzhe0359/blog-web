<template>
  <q-page id="Album">
    <div class="text-center q-pt-xl q-pb-md">
      <div class="title text-h4 text-white" :class="{'focus-in-contract':$q.screen.gt.md}">真心的世界 , 真我的展示 。</div>
      <p class="text-subtitle1 text-grey q-pt-lg" :class="{'focus-in-contract':$q.screen.gt.md}">记忆 , 让生活更精彩 </p>
    </div>
    <div class="row">
      <q-intersection transition="scale" class="card-box overflow-hidden col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="item in list" :key="item._id">
        <div class="q-ma-sm overflow-hidden">
          <div class="card-item overflow-hidden relative-position">
            <q-img :ratio="16/9" :src="item.photos[0].url | imgBaseUrl" spinner-color="white" img-class="blur-image" placeholder-src="~assets/img_loading.gif"></q-img>
            <div class="absolute-bottom text-subtitle1 text-center cursor-pointer" @click="toDetail(item._id)">
              {{item.album.name}}
            </div>
          </div>
        </div>
      </q-intersection>
    </div>
  </q-page>
</template>

<script>
import { findAlbumList } from 'src/api/photo.js'

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
  box-sizing: border-box;
  .card-box {
    height: 100%;
    min-height: 120px;
    min-width: 25%;
    .card-item {
      z-index: 0; // 手机端 radius触摸失效
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
  }
  .q-img {
    transition: 0.8s;
  }
}

@media (max-width: $breakpoint-xs-max) {
  #Album {
    padding-top: 10px;
    .card-box {
      border-radius: 10px !important;
      .card-item {
        border-radius: 10px !important;
      }
    }
  }
}
</style>

