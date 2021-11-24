<template>
  <q-page>
    <!-- header -->
    <div class="page-header">
      <div class="absolute-center full-width">
        <div class="slogan text-center q-pt-xl q-pb-md">
          <h1 class="title text-h4 text-white">
            <p>来都来了，留点什么吧！</p>
          </h1>
          <p class="text-subtitle1 text-grey q-pt-lg">如您遇到问题，或对本站有任何建议，请予留言反馈，小路感激不尽 </p>
        </div>
      </div>
    </div>
    <!-- inner -->
    <PageInner>
      <template v-slot:inner-left>
        <q-card>
          <q-card-section class="q-pa-md">
            <CommentAdd :hideCancel="true" @comment="comment" />
            <div ref="comment" class="text-h5 q-mt-lg q-mb-md">
              <q-spinner-comment color="grey" size="md" />
            </div>
            <Comment v-for="item in commentList" :key="item._id" :comment="item" :isMessage="true" @comment="comment" @loadComment="changePage" />
            <q-no-ssr v-if="commentPageCount > 1">
              <q-pagination class="q-mb-sm" color="grey-7" v-model="pageNum" :max="commentPageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
            </q-no-ssr>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:inner-right>
        <!-- 右侧边栏 -->
        <SideBar />
      </template>
    </PageInner>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import Ship from 'src/components/Animation/Ship.vue'
import PageInner from 'components/common/PageInner'
import SideBar from 'src/components/SideBar/SideBar'
import Comment from 'src/components/Comment/Comment.vue'
import CommentAdd from 'src/components/Comment/CommentAdd.vue'

let defaultParams = {
  pageNum: 1,
  pageSize: 10,
  state: -1, // 违规留言过滤
  type: 2 // | 1:文章 | 2:留言 | 3:相册
}
export default {
  name: 'Message',
  components: {
    PageInner,
    SideBar,
    Comment,
    CommentAdd,
    Ship
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return Promise.all([
      store.dispatch('comment/LoadCommentList', defaultParams)
    ])
  },
  data () {
    return {
      pageNum: defaultParams.pageNum, // 当前页
      pageSize: defaultParams.pageSize,
      message: ''
    }
  },
  computed: {
    ...mapGetters([
      'commentList',
      'commentPageCount'
    ]),
  },
  mounted () {
  },
  methods: {
    addMessage () {
      // 判断用户是否登录
      let user = this.$q.localStorage.getItem("user")
      if (!user) {
        return this.$msg.warning('请先登录')
      }
      this.addMessageHandler(this.message)
    },
    // 添加留言
    comment (content, commentId, to, level) {
      let params = {
        content,
        commentId,
        to,
        level,
        type: 2
      }

      this.$store.dispatch('comment/AddComment', params).then(res => {
        this.message = ''
        this.$msg.success('留言成功')
        // 一级评论，切换至第一页
        if (!level) {
          this.pageNum = 1
        }
        this.changePage()
      })
    },
    // 切换页码
    changePage (current) {
      let params = {
        pageNum: current || this.pageNum,
        pageSize: this.pageSize,
        state: -1,
        type: 2
      }
      this.$store.dispatch('comment/LoadCommentList', params)
    }
  },
}
</script>
<style lang="scss" scoped>
</style>