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
                  <!-- 账号 -->
                  <q-input v-if="type === 1" class="logon-input" autofocus clearable standout="bg-cyan text-white" bottom-slots v-model="account" label="账号" debounce='500' lazy-rules :rules="[
                    val => (val && val.length > 0) || '请输入用户名或邮箱',
                  ]">
                    <template v-slot:prepend>
                      <q-icon name="account_circle" />
                    </template>
                  </q-input>
                  <!-- 用户名 -->
                  <q-input v-if="type === 2" class="logon-input" autofocus clearable standout="bg-cyan text-white" bottom-slots v-model="username" label="用户名" debounce='500' lazy-rules :rules="[
                    val => (val && val.length > 0) || '请输入账号',
                    val => (val.length >= 6 && val.length <= 12) || '请输入 6-12 位账号',
                    hasUsernameCheck
                  ]">
                    <template v-slot:prepend>
                      <q-icon name="account_circle" />
                    </template>
                  </q-input>
                  <!-- 密码 -->
                  <q-input class="logon-input" standout="bg-cyan text-white" bottom-slots v-model="password" :label="type === 3 ?'新密码':'密码'" :type="isPwd ? 'password' : 'text'" hint="" debounce='200' lazy-rules :rules="[
                    val => (val && val.length > 0) || '请输入密码',
                    val => (val.length >= 8 && val.length <= 16) || '请输入 8-16 位账号',
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
                  <q-input v-if="type === 2 || type === 3" ref="email" class="logon-input" clearable standout="bg-cyan text-white" bottom-slots v-model="email" label="邮箱" debounce='500' lazy-rules :rules="[
                    val => (val && val.length > 0) || '请输入邮箱',
                    emailStrengthCheck,
                    hasEmailCheck
                  ]">
                    <template v-slot:prepend>
                      <q-icon name="markunread" />
                    </template>
                  </q-input>
                  <!-- 昵称 -->
                  <!-- <q-input v-if="!isLogin" class="logon-input" clearable standout="bg-cyan text-white" bottom-slots v-model="nickname" label="昵称" debounce='500' lazy-rules :rules="[
                    val => (val && val.length > 0) || '请输入昵称。',
                    val => (val.length >= 2 && val.length <= 8) || '请输入 2-8 位昵称。',
                    hasNicknameCheck
                  ]">
                    <template v-slot:prepend>
                      <q-icon name="face" />
                    </template>
                  </q-input> -->
                  <!-- 验证码 -->
                  <q-input v-if="type === 2 || type === 3" class="logon-input" clearable standout="bg-cyan text-white" bottom-slots v-model="code" label="验证码" debounce='500' lazy-rules :rules="[
                    val => (val && val.length > 0) || '请输入验证码。',
                    val => (val.length == 6) || '请输入 6 位验证码。',
                  ]">
                    <template v-slot:prepend>
                      <q-icon name="qr_code" />
                    </template>
                    <template v-slot:after>
                      <q-btn :disabled="codeLoading" :loading="btnLoading" padding="md" color="grey-8" style="width:100px;" @click="sendCode">
                        <template v-slot:default>
                          <q-spinner-puff color="white" class="q-mr-sm" v-show="codeLoading" />
                          <div>{{codeLabel}}</div>
                        </template>
                        <!-- 点击按钮，请求未成功（请求中）时展示 -->
                        <template v-slot:loading>
                          <q-spinner-facebook />
                        </template>
                      </q-btn>
                    </template>
                  </q-input>
                  <!-- 登录/注册 按钮 -->
                  <q-btn :loading="loading" class="logon-btn bg-logon-card-input" text-color="white" unelevated :label="logonLabel" @keyup.enter="logon" @click="logon" />
                  <div class="row justify-between" style="margin-bottom: 20px;">
                    <q-btn flat label="忘记密码" :disabled="type === 3" @click="forget" />
                    <q-btn outline :label="toggleLabel" @click="handleToggle" />
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

import { userRegister, changePassword, sendEmailCode, hasUsername, hasNickname, hasEmail } from 'src/api/user.js'

export default {
  name: 'Login',
  components: { BaseDialog },
  props: {
    show: { type: Boolean, default: false },
  },
  data () {
    return {
      account: '', // 账号
      username: '', // 用户名
      password: '', // 密码
      email: '', // 邮箱
      nickname: '', // 昵称
      code: '', // 验证码
      isPwd: true, // 密码显示/隐藏
      type: 1, // 类型 1登录 2注册 3改密
      defaultOptions: {
        path: 'https://assets9.lottiefiles.com/packages/lf20_vo0a1yca.json',
        loop: true
      },
      loading: false,
      toggle: false,
      btnLoading: false, // 验证码按钮loading 
      codeLoading: false, // 验证码倒计时loading
      interval: null, // 验证码倒计时
      codeLabel: '发送', // 验证按钮文字
      showPassword: true,// 修改密码时，隐藏密码
      toggleLabel: '我要注册'
    }
  },
  computed: {
    // 登录/注册 按钮
    logonLabel () {
      let label = ''
      switch (this.type) {
        case 1:
          label = '登 录 系 统'
          break;
        case 2:
          label = '注 册 账 号'
          break;
        default:
          label = '修 改 密 码'
          break;
      }
      return label
    }
  },
  watch: {
    // 登录/注册 切换按钮
    type (n, o) {
      switch (this.type) {
        case 1:
          this.toggleLabel = '我要注册'
          break;
        case 2:
          this.toggleLabel = '我要登录'
          break;
        default:
          this.toggleLabel = '我要登录'
          break;
      }
    }
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

        if (this.type === 1) {
          this.handleLogin()
        } else if (this.type === 2) {
          this.handleRegister()
        } else {
          this.handleChangePassword()
        }
      })
    },
    // 登录
    handleLogin () {
      this.$store.dispatch("user/Login", {
        account: this.account,
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
    handleRegister () {
      // 邮箱脱敏
      let str = this.email.split("@")
      const nickname = str[0].substr(0, str[0].length - 2) + "*****" + str[1].substr(2)
      userRegister({
        username: this.username,
        password: aesEncrypt(this.password),
        email: this.email,
        nickname,
        code: this.code
      }).then(res => {
        this.$msg.success('注册成功')
        this.loading = false
        this.type = 1 // 注册成功, 展示登录页
      }).catch(err => {
        this.loading = false
      })
    },
    // 修改密码
    handleChangePassword () {
      changePassword({
        password: aesEncrypt(this.password),
        email: this.email,
        code: this.code
      }).then(res => {
        this.$msg.success('修改成功')
        this.loading = false
        this.type = 1 // 修改成功, 展示登录页
        this.reset()
      }).catch(err => {
        this.loading = false
      })
    },
    // 登录/注册 切换
    handleToggle () {
      this.reset()
      this.type = this.type === 1 ? 2 : 1
      // 变形 动画
      this.animate()
    },
    // 修改密码
    forget () {
      this.reset()
      this.type = 3
      this.animate()
    },
    // 变形 动画
    animate () {
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
    // 关闭
    close () {
      this.reset()
      this.type = 1
      this.$emit('close')
    },
    // 重置
    reset () {
      this.$refs.logon.resetValidation()
      this.username = ''
      this.password = ''
      this.email = ''
      this.nickname = ''
      this.code = ''
      this.codeLabel = '发送'
      this.showPassword = true
    },
    // 校验密码强度 8-16位，包含字母、数字、特殊符号
    passwordStrengthCheck (pass) {
      const passReg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,./]).{8,16}/
      return passReg.test(pass) || '密码强度太弱，请重新输入'
    },
    // 校验邮箱格式
    emailStrengthCheck (email) {
      const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return emailReg.test(email) || '邮箱格式错误，请重新输入'
    },
    // 校验用户名
    hasUsernameCheck (val) {
      // 登录界面不校验
      if (this.type !== 2) return
      return new Promise((resolve, reject) => {
        hasUsername({ username: val }).then(res => {
          resolve(res.data.length <= 0 || '用户名已存在')
        })
      })
    },
    // 校验昵称
    hasNicknameCheck (val) {
      return new Promise((resolve, reject) => {
        hasNickname({ nickname: val }).then(res => {
          resolve(res.data.length <= 0 || '昵称已存在')
        })
      })
    },
    // 校验邮箱
    hasEmailCheck (val) {
      if (this.type !== 2) return
      return new Promise((resolve, reject) => {
        hasEmail({ email: val }).then(res => {
          resolve(res.data.length <= 0 || '邮箱已被使用')
        })
      })
    },
    // 发送验证码
    sendCode () {
      // 先校验邮箱，格式正确再发送验证码
      this.$refs.email.validate()
      if (this.$refs.email.hasError) return

      let params = {
        email: this.email,
        username: this.username
      }
      this.btnLoading = true
      sendEmailCode(params).then(res => {
        // 关闭btnLoading，开启codeLoading
        this.btnLoading = false
        this.codeLoading = true
        // 开启倒计时
        let maxNumber = 60
        this.codeLabel = maxNumber + 's'
        this.interval = setInterval(() => {
          maxNumber--
          this.codeLabel = maxNumber + 's'
          if (maxNumber === 0) {
            clearInterval(this.interval)
            this.codeLoading = false
            this.codeLabel = '重新发送'
          }
        }, 1000)
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
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
