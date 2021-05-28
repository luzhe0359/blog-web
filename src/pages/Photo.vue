<template>
  <q-page>
    <div class="row">
      <q-intersection transition="scale" class="photo col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-sm" v-for="item in photoList" :key="item._id">
        <!-- <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-sm" v-for="item in photoList" :key="item._id"> -->
        <q-img class="rounded-borders" :ratio="16/9" :src="item.url | imgBaseUrl" spinner-color="white">
          <!-- <div class="absolute-bottom text-subtitle1 text-center">
            {{item.name}}
          </div> -->
        </q-img>
        <!-- </div> -->
      </q-intersection>
    </div>
  </q-page>
</template>

<script>
import BaseContainer from 'src/components/Container/BaseContainer'
import { findPhotoList } from 'src/api/photo.js'

export default {
  name: 'About',
  components: {
    BaseContainer
  },
  data () {
    return {
      photoList: []
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
</style>

