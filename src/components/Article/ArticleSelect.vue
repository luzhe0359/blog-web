<template>
  <div>
    <q-select
      filled
      clearable
      color="teal"
      label="文章选择"
      options-selected-class="text-deep-orange"
      v-model="articleId"
      :options="options"
      :loading="loading"
      @virtual-scroll="onScroll"
      @input="selectArticle"
      option-value="_id"
      option-label="title"
      emit-value
      map-options
    >
      <template v-slot:option="scope">
        <q-item
          v-bind="scope.itemProps"
          v-on="scope.itemEvents"
        >
          <q-item-section>
            <q-item-label v-html="scope.opt.title" />
            <q-item-label caption>{{scope.opt.createTime | dateFormat }} &nbsp;@{{ scope.opt.author.nickname }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { findArticleList } from 'src/api/article.js'

export default {
  name: 'BtnsComment',
  data () {
    return {
      articleId: null, // 文章_id
      options: [],
      loading: false,
      pageSize: 50, // 每页条数
      nextPage: 1, // 当前页码
      lastPage: 1, // 最后一页
      lastIndex: 0
    };
  },
  created () {
    this.findArticleList()
  },
  methods: {
    // 文章选择 
    async findArticleList () {
      let params = {
        pageNum: this.nextPage,
        pageSize: this.pageSize,
      }
      await findArticleList(params).then(res => {
        this.options = [...this.options, ...res.data]
        this.lastPage = Math.ceil(res.total / this.pageSize)
      }).catch(err => {
        throw new Error(err)
      })
    },
    async onScroll ({ from, to, ref }) {
      const lastIndex = this.options.length - 1
      // 最大索引 = to 则搜索完毕
      if (this.loading !== true && this.nextPage < this.lastPage && to === lastIndex) {
        this.loading = true

        this.nextPage++ // 自增后，等于最大页码，则为最后一页数据
        await this.findArticleList()
        this.$nextTick(() => {
          ref.refresh()
          this.loading = false
        })
      }
    },
    selectArticle () {
      this.$emit("selectChange", this.articleId)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>