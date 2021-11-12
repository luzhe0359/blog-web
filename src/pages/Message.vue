<template>
  <q-page id="message">
    <div class="mess-box row">
      <div class="mess-left col">
        <div class="mess-title">
          <h1>留言须知</h1>
          <p> Note for message</p>
        </div>
        <div class="mess-desc">
          <p>支持交换链接，留言即可</p>
          <p>不接受广告推销等任何商业类网站的留言</p>
          <p>本站会不定期在后台对留言内容进行过滤处理</p>
          <p>对于严重违规者将进行封号处理</p>
        </div>
        <div class="mess-desc">
          <p>如您遇到问题，或对本站有任何建议</p>
          <p>请予留言反馈，小路感激不尽</p>
        </div>
      </div>
      <div class="mess-right">
        <div class="ipt">
          <q-input outlined autogrow v-model="message" type="textarea" maxlength='100' placeholder="说点什么..." />
        </div>
        <q-btn class="gt-xs" size="lg" padding="12px 80px" unelevated rounded color="dark" label="发 送" :disable="!message.length" @click="addMessage" />
        <q-btn class="full-width lt-sm" unelevated rounded color="dark" label="发 送" :disable="!message.length" @click="addMessage" />
      </div>
    </div>
    <div class="column full-width">
      <div ref="comment" class="text-h5 q-mt-lg q-mb-md">
        <q-spinner-comment color="grey" size="md" />
      </div>
      <Comment v-for="item in messageList" :key="item._id" :comment="item" :isMessage="true" @comment="addMessageHandler" @loadComment="changePage" />
      <q-no-ssr v-if="messagePageCount > 1">
        <q-pagination class="q-mb-sm" color="grey-7" v-model="pageNum" :max="messagePageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
      </q-no-ssr>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import Comment from 'src/components/Comment/Comment.vue'
import CommentAdd from 'src/components/Comment/CommentAdd.vue'
import Ship from 'src/components/Animation/Ship.vue'

let defaultParams = {
  pageNum: 1,
  pageSize: 10,
  state: -1 // 违规留言过滤
}
export default {
  name: 'Message',
  components: {
    Comment,
    CommentAdd,
    Ship
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return Promise.all([
      store.dispatch('message/LoadMessageList', defaultParams)
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
      'messageList',
      'messagePageCount'
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
    addMessageHandler (content, commentId, to, level) {
      let params = {
        content,
        commentId,
        to,
        level,
      }

      this.$store.dispatch('message/AddMessage', params).then(res => {
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
        state: -1
      }
      this.$store.dispatch('message/LoadMessageList', params)
    }
  },
}
</script>
<style lang="scss" scoped>
$mess-margin: calc(50vh - 360px);
.mess-box {
  padding: 66px 88px;
  box-sizing: border-box;
  margin: $mess-margin 0;
  height: 640px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  .mess-left {
    min-width: 350px;
    .mess-title {
      h1 {
        font-size: 52px;
        font-weight: 500;
        line-height: 72px;
      }
      p {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        opacity: 0.6;
      }
    }
    .mess-desc {
      opacity: 0.7;
      margin-top: 80px;
      font-size: 18px;
      font-weight: 400;
      line-height: 28px;
      &:last-child {
        margin-top: 50px;
      }
      p {
        margin-bottom: 10px;
      }
    }
  }
  .mess-right {
    width: 550px;
    padding-top: 44px;
    .ipt {
      width: 100%;
      height: 350px;
      /deep/ .q-textarea {
        width: 100%;
        height: 100%;
        .q-field__control {
          color: #000 !important;
          min-height: 100%;
          border-radius: 12px;
          padding: 16px 26px;
          &:before {
            border: 2px solid rgba(0, 0, 0, 0.12);
          }
          .q-field__control-container {
            overflow-y: scroll;
          }
          textarea {
            font-size: 16px;
            line-height: 32px !important;
          }
        }
      }
    }
    .q-btn {
      display: block;
      margin: 0 auto;
      margin-top: 38px;
    }
  }
}

@media (max-width: $breakpoint-md-max) {
  .mess-box {
    padding: 50px;
    margin: 20px 0;
    height: auto !important;
  }
}

@media (max-width: $breakpoint-sm-max) {
  .mess-box {
    padding: 20px;
    .mess-right {
      width: 100%;
      .ipt {
        height: 200px;
      }
    }
  }
}

@media (max-width: $breakpoint-xs-max) {
  .mess-box {
    .mess-right {
      padding-top: 20px;
    }
    .mess-left {
      .mess-title {
        h1 {
          font-size: 30px;
          line-height: 42px;
        }
      }
      .mess-desc {
        margin-top: 30px !important;
      }
    }
  }
}
</style>

