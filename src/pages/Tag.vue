<template>
  <q-page id="tag">
    <div class="word-cloud">
      <vue-word-cloud :words="words" :color="colors">
        <template slot-scope=" {text, weight, word}">
          <div class="tag" :class="{'active':currentId === word[2]}" :title="weight" @click="changeTag( word[2])">
            {{ text }}
          </div>
        </template>
      </vue-word-cloud>
    </div>
    <!-- 文章列表 -->
    <ArticleCardList :articleList="articleList" />
    <!-- 文章分页 -->
    <q-no-ssr v-if="articlePageCount > 1">
      <q-pagination color="grey" class="q-mb-sm justify-center" v-model="pageNum" :max="articlePageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
    </q-no-ssr>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import VueWordCloud from 'vuewordcloud';
import Chance from 'chance'

import ArticleCardList from 'src/components/ArticleList/ArticleCardList'

const chance = new Chance()
let defaultParams = {
  state: 1, // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
  pageNum: 1,
  pageSize: 10
}
export default {
  name: 'Tag',
  components: {
    [VueWordCloud.name]: VueWordCloud,
    ArticleCardList,
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return Promise.all([
      store.dispatch('article/LoadArticleList', defaultParams),
      store.dispatch('article/LoadTagList'),
    ])
  },
  data () {
    return {
      pageNum: defaultParams.pageNum, // 当前页
      pageSize: defaultParams.pageSize,
      colors: () => chance.color(),
      words: [],
      currentId: null // 当前标签
    }
  },
  computed: {
    ...mapGetters([
      'tagList',
      'articleList',
      'articlePageCount',
    ]),
  },
  watch: {
    tagList: {
      handler: function (n, o) {
        this.words = [...n.map(tag => {
          return [tag.name, chance.natural({ min: 1, max: 10 }), tag._id]
        })]
      },
      deep: true,
      immediate: true,
    }
  },
  mounted () {
    this.currentId = this.$route.params._id
    this.currentId && this.changePage()
  },
  methods: {
    // 切换文章标签
    changeTag (_id) {
      if (this.currentId === _id) { // 切换
        return this.currentId = null
      }
      this.currentId = _id
      this.pageNum = 1
      // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
      let params = {
        pageNum: 1, // 切换Tag重置页码
        pageSize: this.pageSize,
        state: 1,
        tag: _id
      }
      this.$store.dispatch('article/LoadArticleList', params)
    },
    // 切换页码
    changePage (current) {
      let params = {
        pageNum: current,
        pageSize: this.pageSize,
        state: 1,
        tag: this.currentId
      }
      this.$store.dispatch('article/LoadArticleList', params)
    },
  },
}
</script>
<style lang="scss" scoped>
#tag {
  padding-top: 50px;
}
.word-cloud {
  width: 100%;
  height: 380px;
  padding: 20px;
  /* background-color: rgba(255, 255, 255, 0.48); */
  border-radius: 12px;
}
.tag {
  padding: 0 5px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.05);
  }
}
.active {
  background-color: #fff;
}

@media (max-width: $breakpoint-sm-max) {
  #tag {
    padding-top: 20px;
  }
  .word-cloud {
    height: 300px;
  }
}
</style>

