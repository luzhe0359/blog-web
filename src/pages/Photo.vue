<template>
  <q-page>
    <div class="row waterfall-height-css">
      <q-intersection transition="scale" class="image-box photo col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm" v-for="item in photoList" :key="item._id">
        <q-img class="rounded-borders" @click="show(item._id)" :ratio="16/9" :src="item.url | imgBaseUrl" spinner-color="white"> </q-img>
      </q-intersection>
    </div>
    <q-dialog v-model="carouselVisible">
      <div class="q-pa-md fit" :class="{'md-box':$q.screen.lt.md}">
        <q-carousel :transition-prev="$q.screen.gt.md?'slide-down':'slide-right'" :transition-next="$q.screen.gt.md?'slide-up':'slide-left'" dark swipeable animated :vertical="$q.screen.gt.md" v-model="slide" thumbnails infinite :fullscreen.sync="fullscreen">
          <q-carousel-slide :name="item._id" v-for="item in photoList" :key="item._id" :img-src="item.url | imgBaseUrl" />
          <template v-slot:control>
            <q-carousel-control class="column" position="top-right" :offset="[12, 12]">
              <q-btn flat round dense outline color="grey-9" text-color="grey" icon="close" @click="carouselVisible = false" />
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import BaseContainer from 'src/components/Container/BaseContainer'
import { findPhotoList } from 'src/api/photo.js'

export default {
  name: 'About',
  components: {
    BaseContainer,
  },
  data () {
    return {
      photoList: [],
      slide: 1,
      fullscreen: true,
      carouselVisible: false,
    }
  },
  mounted () {
    this.findPhotoList()
  },
  methods: {
    findPhotoList () {
      let params = {
        albumId: this.$route.params._id,
        pageSize: 0, // 查询所有
      }
      findPhotoList(params).then(res => {
        this.photoList = res.data
      })
    },
    show (_id) {
      this.slide = _id
      this.carouselVisible = true
    }
  },
}
</script>
<style lang="scss" scoped>
// 在大多数情况下，要求将CSS应用于QIntersection元素，以便在不渲染内部内容时将其用作必要的填充符。 这将提供平滑的滚动体验，因为不这样的话滚动将会不规律地跳跃。
// 需要CSS的此类示例将是，例如，固定高度或至少最小高度
.photo {
  height: 100%;
  min-height: 180px;
  min-width: 25%;
}

.q-carousel {
  .q-carousel__slide {
    background-repeat: no-repeat;
    background-size: contain;
  }
  /deep/ .q-carousel__thumbnail--active {
    transition: 0.2s;
    transform: translateY(-2px);
  }
}

// 默认滚动条 样式 --------------------------------------------------------------------------------
// 滚动条整体部分
/deep/ ::-webkit-scrollbar {
  background-color: rgba(97, 97, 97, 0.5);
}
</style>