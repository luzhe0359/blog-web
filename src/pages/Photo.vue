<template>
  <q-page>
    <div class="text-center q-pt-xl q-pb-md" v-if="photoList[0]">
      <div class="text-h3 text-white title" :class="{'focus-in-contract':$q.screen.gt.md}">{{photoList[0].album.name}}</div>
      <p class="text-subtitle1 text-grey q-pt-lg" :class="{'focus-in-contract':$q.screen.gt.md}">{{photoList[0].album.desc}}</p>
    </div>
    <div v-if="$q.screen.gt.xs" class="waterfall-width-column waterfall" v-viewer>
      <div class="image-box" v-for="(item,index) in photoList" :key="index">
        <img :src="$url +item.url" alt="">
        <!-- <q-img height="200px" class="image" native-context-menu :src="item.url | imgBaseUrl" spinner-color="white"> </q-img> -->
      </div>
    </div>
    <div v-else class="row wrap" v-viewer>
      <div class="phone-image-box col-6 q-pa-sm" v-for="(item,index) in photoList" :key="index">
        <q-img class="image" native-context-menu :ratio="16/9" :src="item.url | imgBaseUrl" spinner-color="white"> </q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
import { findPhotoList } from 'src/api/photo.js'

export default {
  name: 'Photo',
  data () {
    return {
      photoList: [],
      currentIndex: 0,
      swiperOptionTop: {
        spaceBetween: 10,
        initialSlide: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observeParents: true,
        observer: true,
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        observeParents: true,
        observer: true,
      }
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
        for (let i = 0; i < this.photoList.length; i++) {
          let img = new Image()
          img.src = this.photoList[i].url
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.focus-in-contract {
  animation: focus-in-contract 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.waterfall {
  display: flex;
  flex-wrap: wrap;
  &:after {
    content: "";
    display: block;
    flex-grow: 99999;
  }
  .image-box {
    margin: 5px;
    flex-grow: 1;
    overflow: hidden;
    img {
      display: block;
      min-width: 100%;
      height: 200px !important;
      object-fit: cover;
    }
  }
}
// 手机端
.phone-image-box {
  height: 100%;
  min-height: 102px;
  min-width: 25%;
}
</style>
