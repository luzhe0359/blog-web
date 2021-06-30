<template>
  <BaseDialog :dialogVisible="show" :hideAction="true" @cancelClick="close">
    <template v-slot:body>
      <div id="login" class="fit flex justify-center items-center" style="height: 100%">
        <div class="row fit">
          <div ref="logonBox" class="col flex justify-center items-center">
            <q-card square style="min-width: 290px;height: 100%; width: 60%;" class="no-shadow">
              <q-form ref="logon">
                <q-card-section align="center">
                  <h3 class="text-uppercase q-my-lg">zugelu</h3>
                  <!-- 用户名 -->
                  <q-input class="logon-input" autofocus clearable standout="bg-cyan text-white" bottom-slots v-model="username" label="账号" debounce='500' lazy-rules :rules="[
                  val => (val && val.length > 0) || '请输入账号。',
                  val => (val.length >= 6 && val.length <= 12) || '请输入 6-12 位账号。',
                  hasUsernameCheck
                ]">
                    <template v-slot:prepend>
                      <q-icon name="account_circle" />
                    </template>
                  </q-input>
                  <!-- 密码 -->
                  <q-input class="logon-input" standout="bg-cyan text-white" bottom-slots v-model="password" label="密码" :type="isPwd ? 'password' : 'text'" hint="" debounce='200' lazy-rules :rules="[
                  val => (val && val.length > 0) || '请输入密码。',
                  val => (val.length >= 8 && val.length <= 16) || '请输入 8-16 位账号。',
                  passwordStrengthCheck
                ]">
                    <template v-slot:prepend>
                      <q-icon name="vpn_key" />
                    </template>
                    <template v-slot:append>
                      <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                    </template>
                  </q-input>
                  <!-- 邮箱 -->
                  <q-input v-if="!isLogin" class="logon-input" clearable standout="bg-cyan text-white" bottom-slots v-model="email" label="邮箱" debounce='500' lazy-rules :rules="[
                  val => (val && val.length > 0) || '请输入邮箱。',
                  emailStrengthCheck
                ]">
                    <template v-slot:prepend>
                      <q-icon name="markunread" />
                    </template>
                  </q-input>
                  <!-- 昵称 -->
                  <q-input v-if="!isLogin" class="logon-input" clearable standout="bg-cyan text-white" bottom-slots v-model="nickname" label="昵称" debounce='500' lazy-rules :rules="[
                  val => (val && val.length > 0) || '请输入昵称。',
                  val => (val.length >= 2 && val.length <= 8) || '请输入 2-8 位昵称。',
                  hasNicknameCheck
                ]">
                    <template v-slot:prepend>
                      <q-icon name="face" />
                    </template>
                  </q-input>

                  <!-- 登录/注册 按钮 -->
                  <q-btn :loading="loading" class="logon-btn bg-logon-card-input" text-color="white" unelevated :label="logonLabel" @keyup.enter="logon" @click="logon" />
                  <div class="row justify-between" style="margin-bottom: 20px;">
                    <q-btn flat label="忘记密码" @click="forget" />
                    <q-btn outline :label="toggleLabel" @click="handlerToggle" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </div>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import { morph } from 'quasar'
import { aesEncrypt } from 'src/utils/crypto.js'
import BaseDialog from 'components/Dialog/BaseDialog'

import { userRegister, hasUsername, hasNickname } from 'src/api/user.js'

export default {
  name: 'Login',
  components: { BaseDialog },
  props: {
    show: { type: Boolean, default: false },
  },
  data () {
    return {
      isPwd: true,
      isLogin: true,
      username: '',
      password: '',
      email: '',
      nickname: '',
      defaultOptions: {
        path: 'https://assets9.lottiefiles.com/packages/lf20_vo0a1yca.json',
        loop: true
      },
      loading: false,
      toggle: false,
    }
  },
  computed: {
    // 登录/注册 切换按钮
    toggleLabel () {
      return this.isLogin ? '我要注册' : '我要登录'
    },
    // 登录/注册 按钮
    logonLabel () {
      return this.isLogin ? '登 录 系 统' : '注 册 账 号'
    },
    props1 () {
      return this.toggle === true
        ? {
          class: 'q-ml-sm q-pa-md bg-orange text-white rounded-borders',
          style: 'font-size: 24px'
        }
        : {
          class: 'q-ml-xl q-px-xl q-py-lg bg-blue text-white',
          style: 'border-radius: 25% 0/50% 0; font-size: 36px'
        }
    },
  },
  methods: {
    logon () {
      this.loading = !this.loading

      this.$refs.logon.validate().then(success => {
        // 校验不通过
        if (!success) {
          this.loading = !this.loading
          return
        }

        if (this.isLogin) {
          return this.handlerLogin()
        }
        return this.handlerRegister()
      })
    },
    // 登录
    handlerLogin () {
      this.$store.dispatch("user/Login", {
        username: this.username,
        password: aesEncrypt(this.password)
      }).then(() => {
        this.$msg.success('登录成功')
        this.loading = false
        this.close()
      }).catch(err => {
        this.loading = false
      })
    },
    // 注册
    handlerRegister () {
      userRegister({
        username: this.username,
        password: aesEncrypt(this.password),
        email: this.email,
        nickname: this.nickname,
      }).then(res => {
        this.$msg.success('注册成功')
        this.loading = false
        this.isLogin = true // 注册成功, 展示登录页
      }).catch(err => {
        this.loading = false
      })
    },
    //  登录/注册 切换
    handlerToggle () {
      this.reset()
      this.isLogin = !this.isLogin;
      this.$refs.logon.resetValidation()

      // 变形 动画
      const onToggle = () => {
        this.toggle = this.toggle !== true
      }

      if (this.cancel === void 0 || this.cancel() === false) {
        this.cancel = morph({
          from: this.$refs.logonBox,
          onToggle,
          duration: 100,
          tween: true,
          onEnd: end => {
            end === 'from' && onToggle()
          }
        })
      }
    },
    // 未开放
    forget () {
      this.$q.notify({
        icon: 'no_encryption',
        message: '该功能暂未开放',
        color: 'grey',
        position: 'top'
      })
    },
    // 关闭
    close () {
      this.reset()
      this.isLogin = true
      this.$emit('close')
    },
    // 重置
    reset () {
      this.username = ''
      this.password = ''
      this.email = ''
      this.nickname = ''
    },
    // 校验密码强度 8-16位，包含字母、数字、特殊符号
    passwordStrengthCheck (pass) {
      const passReg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,./]).{8,16}/
      return passReg.test(pass) || '密码强度太弱，请重新输入。'
    },
    // 校验邮箱格式
    emailStrengthCheck (email) {
      const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return emailReg.test(email) || '邮箱格式错误，请重新输入。'
    },
    // 校验用户名
    hasUsernameCheck (val) {
      // 登录界面不校验
      if (this.isLogin) return
      return new Promise((resolve, reject) => {
        hasUsername({ username: val }).then(res => {
          console.log();
          resolve(res.data.length <= 0 || '账号已存在')
        })
      })
    },
    // 校验昵称
    hasNicknameCheck (val) {
      if (this.isLogin) return
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
#login {
  color: #2c3e50 !important;
}

.logon-btn {
  font-size: large;
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%;
}

.bg-logon-card-input {
  background: linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
  transition: all 0.3s ease-in-out;
  background-size: 200% auto;
}

.bg-logon-card-input:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #5b86e5;
}

// input 校验不通过 背景色
::v-deep .q-field--standout.q-field--focused .q-field__control {
  background-color: $deep-orange;
}
</style>
