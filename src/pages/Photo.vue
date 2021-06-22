<template>
  <q-page>
    <div class="text-center q-pt-xl q-pb-md" v-if="photoList[0]">
      <div class="text-h3 text-white" :class="{'focus-in-contract':$q.screen.gt.md}">{{photoList[0].album.name}}</div>
      <p class="text-subtitle1 text-grey q-pt-lg" :class="{'focus-in-contract':$q.screen.gt.md}">{{photoList[0].album.desc}}</p>
    </div>
    <div class="waterfall-width-column">
      <div class="image-box q-ma-xs" v-for="(img,index) in photoList" :key="index" @click="show(index)">
        <img v-lazy="$url +img.url" alt="" />
      </div>
    </div>
    <q-dialog :maximized="$q.screen.lt.md" v-model="swiperVisible">
      <div class="thumb-example" :class="{'max80':$q.screen.gt.sm}">
        <q-btn class="absolute-top-right z-max q-mt-xs q-mr-xs" color="white" flat round dense icon="close" v-close-popup />
        <!-- swiper Top -->
        <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
          <swiper-slide class="swiper-zoom-container" :style="{'background-image':'url('+$url+img.url+')'}" v-for="(img,index) in photoList" :key="index"></swiper-slide>
          <div class="swiper-button-next swiper-button-white gt-sm" slot="button-next"></div>
          <div class="swiper-button-prev swiper-button-white gt-sm" slot="button-prev"></div>
        </swiper>
        <!-- swiper Thumbs -->
        <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
          <swiper-slide class="row items-center justify-center" v-for="img in photoList" :key="img._id">
            <img height="100%" :src="img.url | imgBaseUrl" alt="">
          </swiper-slide>
          <!-- <swiper-slide :style="{'background-image':'url('+$url+img.url+')'}" v-for="(img,index) in photoList" :key="index"></swiper-slide> -->
        </swiper>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import { findPhotoList } from 'src/api/photo.js'

export default {
  name: 'Photo',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
      photoList: [],
      swiperVisible: false,
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observeParents: true,
        observer: true,
        zoom: true, //开启缩放功能
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
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
      })
    },
    show (index) {
      console.log(index);
      this.swiperVisible = true
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.$swiper
        const swiperThumbs = this.$refs.swiperThumbs.$swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
        swiperTop.slideTo(index, 50, false);
        swiperThumbs.slideTo(index, 0, false);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.focus-in-contract {
  animation: focus-in-contract 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.waterfall-width-column {
  column-count: 5;
  column-gap: 0;
  .image-box {
    img {
      display: block;
      width: 100%;
    }
  }
}

@media (max-width: $breakpoint-lg-max) {
  .waterfall-width-column {
    column-count: 4;
  }
}
@media (max-width: $breakpoint-md-max) {
  .waterfall-width-column {
    column-count: 3;
  }
}
@media (max-width: $breakpoint-xs-max) {
  .waterfall-width-column {
    column-count: 2;
  }
}

.q-dialog__inner--minimized > div {
  max-width: 100vw;
}

.thumb-example {
  position: relative;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  &.max80 {
    width: 80vw;
    height: 80vh;
  }
  > div {
    height: 100%;
  }
}
.swiper {
  height: 100%;
  .swiper-slide {
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .gallery-thumbs {
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  &.gallery-top {
    height: 80%;
    width: 100%;
  }
  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }
  &.gallery-thumbs .swiper-slide {
    width: auto;
    height: 100%;
    opacity: 0.4;
  }
  &.gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}
</style>