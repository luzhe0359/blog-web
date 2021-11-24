<template>
  <q-page id="Category">
    <!-- header -->
    <div class="page-header">
      <div class="absolute-center text-white full-width">
        <h1 class="text-h4 text-center q-mb-lg">真心的世界 , 真我的展示 。</h1>
        <!-- 分类列表 -->
        <q-tabs v-model="currentId" align="center" dense outside-arrows mobile-arrows narrow-indicator animated active-color="light-blue" indicator-color="light-blue">
          <q-tab :name="tab._id" :label="tab.album.name" v-for="tab in albumList" :key="tab._id" @click="changeTab(tab._id)" />
        </q-tabs>
      </div>
    </div>
    <!-- inner -->
    <PageInner>
      <template v-slot:inner-left>
        <!-- 照片列表 -->
        <q-card v-if="photoList.length !== 0">
          <q-card-section>
            <div class="q-pa-md">
              <div class="fixed-full image-gallery__blinder" :class="indexZoomed !== void 0 ? 'image-gallery__blinder--active' : void 0" @click="zoomImage()" />
              <div class="image-box">
                <q-img v-for="(item, index) in photoList" :key="index" ref="refThumb" class="image image-gallery__image" :style="index === indexZoomed ? 'opacity: 0.3' : void 0" :src="item.url" @click="zoomImage(index)" />
              </div>
              <q-img ref="refFull" class="image-gallery__image-full fixed-center" :class="indexZoomed !== void 0 ? 'image-gallery__image-full--active' : void 0" :src="photoList[indexZoomed] && photoList[indexZoomed].url" @load="imgLoadedResolve" @error="imgLoadedReject" @click="zoomImage()" />
            </div>
          </q-card-section>
        </q-card>
        <NotFound v-else />
      </template>
      <template v-slot:inner-right>
        <!-- 右侧边栏 -->
        <SideBar />
      </template>
    </PageInner>
  </q-page>
</template>

<script>
import { morph } from 'quasar'
import { mapGetters } from 'vuex'
import { findAlbumList, findPhotoList } from 'src/api/photo.js'

import PageInner from 'components/common/PageInner'
import SideBar from 'components/SideBar/SideBar'
import NotFound from 'components/Common/NotFound'

let defaultParams = {
  state: 1, // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
  pageNum: 1,
  pageSize: 5
}
export default {
  components: {
    PageInner,
    SideBar,
    NotFound
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return Promise.all([
    ])
  },
  data () {
    return {
      photoList: [],
      albumList: [],
      pageNum: defaultParams.pageNum,
      pageSize: defaultParams.pageSize,
      currentId: '',
      indexZoomed: void 0,
      imgLoaded: {
        promise: Promise.resolve(),
        resolve: () => { },
        reject: () => { }
      },
    }
  },
  computed: {
    ...mapGetters([
    ]),
  },
  mounted () {
    this.findAlbumList()
    this.findPhotoList()
  },
  methods: {
    // 获取照片列表
    findPhotoList () {
      let params = {
        albumId: this.currentId,
        pageSize: 0, // 查询所有
        classify: 'album'
      }
      findPhotoList(params).then(res => {
        this.photoList = res.data
        for (let i = 0; i < this.photoList.length; i++) {
          let img = new Image()
          img.src = this.photoList[i].url
        }
      })
    },
    // 获取相册列表
    findAlbumList () {
      findAlbumList().then(res => {
        this.albumList = res.data
      })
    },
    // 切换分类
    changeTab (TabId) {
      if (this.currentId === TabId) return
      this.pageNum = 1
      this.currentId = TabId
      this.findPhotoList()
    },
    imgLoadedResolve () {
      this.imgLoaded.resolve()
    },

    imgLoadedReject () {
      this.imgLoaded.reject()
    },
    zoomImage (index) {
      const { indexZoomed } = this
      console.log(index, indexZoomed);

      this.imgLoaded.reject()

      const zoom = () => {
        console.log(2, index, indexZoomed);
        if (index !== void 0 && index !== indexZoomed) {
          this.imgLoaded.promise = new Promise((resolve, reject) => {
            this.imgLoaded.resolve = () => {
              this.imgLoaded.resolve = () => { }
              this.imgLoaded.reject = () => { }

              resolve()
            }
            this.imgLoaded.reject = () => {
              this.imgLoaded.resolve = () => { }
              this.imgLoaded.reject = () => { }

              reject()
            }
          })

          this.cancel = morph({
            from: this.$refs.refThumb[index].$el,
            to: this.$refs.refFull.$el,
            onToggle: () => {
              this.indexZoomed = index
            },
            waitFor: this.imgLoaded.promise,
            duration: 400,
            hideFromClone: true,
            onEnd: end => {
              if (end === 'from' && this.indexZoomed === index) {
                this.indexZoomed = void 0
              }
            }
          })
        }
      }

      if (
        indexZoomed !== void 0 &&
        (this.cancel === void 0 || this.cancel() === false)
      ) {
        morph({
          from: this.$refs.refFull.$el,
          to: this.$refs.refThumb[indexZoomed].$el,
          onToggle: () => {
            this.indexZoomed = void 0
          },
          duration: 200,
          keepToClone: true,
          onEnd: zoom
        })
      }
      else {
        zoom()
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.page-header {
  background-image: url("~assets/body-hand.jpg");
}
.image-box {
  column-count: 4; // 列数
  column-gap: 1rem; // 列间距
  .image {
    flex-basis: auto;
    break-inside: avoid; // 避免在元素内部断行并产生新列
    margin-bottom: 1rem;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

// 小于md
@media (max-width: $breakpoint-md-max) {
  .image-box {
    column-count: 3;
  }
}
// 小于sm
@media (max-width: $breakpoint-xs-max) {
  .image-box {
    column-count: 2;
  }
}

/* .image-gallery__image {
  border-radius: 3%/5%;
  width: 150px;
  max-width: 20vw;
  cursor: pointer;
} */
.image-gallery__image-full {
  width: 600px;
  max-width: 70vw;
  z-index: 2002;
  pointer-events: none;
}
.image-gallery__image-full--active {
  pointer-events: all;
}
.image-gallery__blinder {
  opacity: 0;
  z-index: 2000;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}
.image-gallery__blinder--active {
  opacity: 0.6;
  background-color: $grey-8;
  pointer-events: all;
  z-index: 2002;
  + div > .image-gallery__image {
    z-index: 2001;
  }
}
</style>

