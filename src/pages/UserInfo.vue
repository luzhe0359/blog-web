<template>
  <q-page class="q-pa-md">
    <!-- 个人信息 -->
    <q-form @submit="onSubmit" class="q-gutter-sm q-py-md no-box-shadow">

      <div class="column">
        <span class="q-mb-sm text-white">头像</span>
        <div>
          <q-img :disable="!readonly" :src="formData.avatar | imgBaseUrl" spinner-color="primary" class="border-radius50" :class="!readonly && 'cursor-pointer'" width='100px' height='100px' placeholder-src="~assets/default_avatar.jpeg" @click="uploadDialog">
            <div v-show="!readonly" class="absolute-bottom text-subtitle2 text-center">
              更换头像
            </div>
          </q-img>
        </div>
      </div>

      <div class="column">
        <span class="q-mb-sm">性别</span>
        <q-option-group inline :disable="readonly" label="性别" v-model="formData.gender" :options="genderOptions" color="primary" />
      </div>

      <q-input label="昵称" :readonly="readonly" v-model="formData.nickname" lazy-rules :rules="[ 
            val => val && val.length > 0 || '请输入昵称',
            val => (val.length >= 2 && val.length <= 6) || '请输入2-6位昵称'
          ]" />

      <q-input label="年龄" type="number" :readonly="readonly" v-model="formData.age" lazy-rules :rules="[
          val => val !== null && val !== '' || '请输入年龄',
          val => val > 0 && val < 120 || '请输入一个真实的年龄'
        ]" />

      <q-input label="邮箱" type="email" :readonly="readonly" v-model="formData.email" lazy-rules :rules="[ val => val && val.length > 0 || '请输入邮箱']" />

      <q-input label="个人简介" type="textarea" hint="个人简介, 最多50个字。" :hide-hint="readonly" :readonly="readonly" v-model="formData.about" maxlength='60' lazy-rules :rules="[ val => val && val.length > 0 || '请填写个人简介']" />

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
    <BaseDialog :title="'头像上传'" :okVisible="false" :dialogVisible="avatarDialog" @okClick="okClick" @cancelClick="cancelClick">
      <template v-slot:body>
        <q-uploader :url="`${$url}/photo/upload`" :headers="[
              {name: 'Authorization', value: `Bearer ${token}`}
            ]" field-name='photo' max-files="1" style="width:100%; height: 500px;" @uploaded="finishUpload" />
      </template>
    </BaseDialog>
  </q-page>
</template>

<script>
import BaseDialog from 'components/Dialog/BaseDialog.vue'

import { findUserById, EditUserById } from 'src/api/user.js'
import { uploadImage } from 'src/api/photo.js'
import { getToken, setUser } from 'src/utils/auth.js'

export default {
  name: "Tables",
  components: {
    BaseDialog
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
  created () {
    this.findUserById()
  },
  methods: {
    // 获取用户信息
    findUserById () {
      this.userId = this.$q.localStorage.getItem("user")._id;
      // let user = this.$q.localStorage.getItem("user")
      findUserById(this.userId).then(res => {
        let user = res.data
        for (let key in this.formData) {
          this.formData[key] = user[key]
        }
      })
    },
    // 保存
    onSubmit () {
      this.loading = true
      EditUserById(this.userId, this.formData).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.border-radius50 {
  border-radius: 50%;
}
</style>