<template>
  <BaseDialog :dialogVisible="show" :title="'个人中心'" :hideAction="true" @cancelClick="close">
    <template v-slot:body>
      <div class="fit flex justify-center items-center" style="height: 100%">
        <q-form @submit="onSubmit" class="q-gutter-sm q-py-md no-box-shadow full-width">
          <div class="column">
            <span class="q-mb-sm text-white">头像</span>
            <div>
              <q-avatar round size="100px">
                <q-img :disable="!readonly" :src="formData.avatar" :placeholder-src="$BASE_IMG_URL" spinner-color="grey" transition="slide-down" :class="!readonly && 'cursor-pointer'" @click="uploadDialog">
                  <div v-show="!readonly" class="absolute-bottom text-subtitle2 text-center">
                    更换头像
                  </div>
                </q-img>
              </q-avatar>
            </div>
          </div>

          <div class="column">
            <span class="q-mb-sm">性别</span>
            <q-option-group inline :disable="readonly" label="性别" v-model="formData.gender" :options="genderOptions" color="primary" />
          </div>

          <q-input label="昵称" :readonly="readonly" v-model="formData.nickname" lazy-rules debounce='500' :rules="[ 
            val => val && val.length > 0 || '请输入昵称',
            val => (val.length >= 2 && val.length <= 6) || '请输入2-6位昵称',
            hasNicknameCheck
          ]" />

          <q-input label="年龄" type="number" :readonly="readonly" v-model="formData.age" lazy-rules debounce='500' :rules="[
          val => val !== null && val !== '' || '请输入年龄',
          val => val > 0 && val < 120 || '请输入一个真实的年龄'
        ]" />

          <q-input label="邮箱" type="email" :readonly="readonly" v-model="formData.email" lazy-rules debounce='500' :rules="[ 
            val => val && val.length > 0 || '请输入邮箱',
            emailStrengthCheck
          ]" />

          <q-input label="个人简介" type="textarea" autogrow hint="个人简介, 最多50个字。" :hide-hint="readonly" :readonly="readonly" v-model="formData.about" maxlength='60' lazy-rules debounce='500' :rules="[ val => val && val.length > 0 || '请填写个人简介']" />

          <div class="q-gutter-sm">
            <q-btn v-show="readonly" label="编 辑" type="button" color="amber" @click="editUser" :class="$q.screen.lt.sm?'full-width':'q-ml-none'" />
            <q-btn v-show="!readonly" label="保 存" type="submit" color="primary" :loading="loading" :class="$q.screen.lt.sm?'full-width':'q-ml-none'">
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
            <q-btn v-show="!readonly" label="取 消" type="button" color="grey" @click="cancel" :class="$q.screen.lt.sm?'full-width':''" />
          </div>
        </q-form>

        <!-- 头像上传 -->
        <BaseDialog :title="'头像上传'" :hideAction="true" :dialogVisible="avatarDialog" @okClick="okClick" @cancelClick="cancelClick">
          <template v-slot:body>
            <q-uploader :url="`${$url}/api/photo/upload`" :headers="[
              {name: 'Authorization', value: `Bearer ${token}`}
            ]" field-name='photo' max-files="1" style="width:100%; height: 500px;" @uploaded="finishUpload" />
          </template>
        </BaseDialog>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from 'components/Dialog/BaseDialog'
import { findUserById, editUserById, hasNickname } from 'src/api/user.js'
import { getToken, setUser } from 'src/utils/auth.js'

export default {
  name: 'UserInfo',
  components: { BaseDialog },
  props: {
    show: { type: Boolean, default: false },
  },
  data () {
    return {
      formData: {
        nickname: '',
        age: '',
        gender: '',
        email: '',
        avatar: '',
        about: '',
      },
      oldUserInfo: {},
      genderOptions: [
        { label: '男', value: 1 },
        { label: '女', value: 0 },
        { label: '保密', value: -1 },
      ],
      readonly: true, // 只读, 编辑时去掉
      loading: false,
      userId: null, // 用户id
      token: getToken(),
      avatarDialog: false,
    }
  },
  watch: {
    show (v) {
      if (v == true) {
        this.findUserById()
      }
    }
  },
  methods: {
    // 获取用户信息
    findUserById () {
      let user = this.$q.localStorage.getItem("user")
      this.userId = user && user._id
      findUserById(this.userId).then(res => {
        let user = res.data
        this.oldUserInfo = user
        for (let key in this.formData) {
          this.formData[key] = user[key]
        }
      })
    },
    // 保存
    onSubmit () {
      this.loading = true
      editUserById(this.userId, this.formData).then(res => {
        this.loading = false
        let user = res.data
        for (let key in this.formData) {
          this.formData[key] = user[key]
        }
        this.readonly = true
        setUser(user) // 更新用户信息
        this.$store.commit('user/SET_ABOUT', user.about)
        this.$store.commit('user/SET_AVATAR', user.avatar)
        this.$store.commit('user/SET_NICKNAME', user.nickname)
        // 保存成功
        this.$msg.success(res.msg)
        this.$emit('close')
      }).catch(err => {
        this.loading = false
      })
    },
    // 编辑
    editUser () {
      this.readonly = false
    },
    // 取消
    cancel () {
      this.readonly = true
      this.findUserById()
    },
    // 上传图片弹框
    uploadDialog () {
      if (this.readonly) return
      this.avatarDialog = true
    },
    // 上传图片事件
    finishUpload (file) {
      let res = JSON.parse(file.xhr.response)
      if (res.code === 2000) {
        this.$set(this.formData, 'avatar', res.data.url)
        // 上传成功
        this.$msg.success(res.msg)

        // 隐藏对话框
        this.avatarDialog = false
      }
    },
    // dialog 确认
    okClick () {
      this.avatarDialog = false
    },
    // dialog 取消
    cancelClick () {
      this.avatarDialog = false
    },
    // 关闭
    close () {
      this.$emit('close')
    },
    // 校验邮箱格式
    emailStrengthCheck (email) {
      const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return emailReg.test(email) || '邮箱格式错误，请重新输入。'
    },
    // 校验昵称
    hasNicknameCheck (val) {
      if (this.oldUserInfo.nickname == val) {
        return true
      }
      return new Promise((resolve, reject) => {
        hasNickname({ nickname: val }).then(res => {
          resolve(res.data.length <= 0 || '昵称已存在')
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped >
.border-radius50 {
  border-radius: 50%;
}
</style>
