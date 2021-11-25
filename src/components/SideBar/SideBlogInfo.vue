<template>
  <q-card class="q-mb-lg">
    <q-card-section>
      <SideTitle title="网站" />
      <div class="text-subtitle1">
        <div class="row justify-between" v-for="(item,index) in countList">
          <span>{{item.name}}</span>
          <countTo :startVal='0' :endVal='item.count' :duration='3000' :suffix="index ===0 ? '天' :''"></countTo>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import countTo from 'vue-count-to';
import SideTitle from 'components/Common/SideTitle'
import { countArticle } from 'src/api/article.js'

export default {
  name: 'SideBlogInfo',
  components: {
    countTo,
    SideTitle
  },
  data () {
    return {
      countList: [
        { name: '运行时长', count: 0, icon: 'iconfont icon-yunhang' },
        { name: '访问总数', count: 0, icon: 'iconfont icon-fangwenliang' },
        { name: '点赞总数', count: 0, icon: 'favorite_border' },
        { name: '评论总数', count: 0, icon: 'iconfont icon-wenzhang' },
      ],
      runTime: '',
      creatTime: '2021-7-1 00:00:00',
      timmer: null
    }
  },
  created () {
    this.initCount()
  },
  methods: {
    // 初始化统计信息
    initCount () {
      let endDate = new Date()
      let startDate = new Date(this.creatTime)
      let unit = 'days'
      let diff = date.getDateDiff(endDate, startDate, unit)
      this.countList[0].count = diff

      countArticle().then((res) => {
        let { views, likes, comments } = res.data
        this.countList[1].count = views || 0
        this.countList[2].count = likes || 0
        this.countList[3].count = comments || 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
