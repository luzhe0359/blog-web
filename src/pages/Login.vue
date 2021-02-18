<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="bg-primary flex flex-center row"
        id="login"
      >
        <q-card class="col-lg-3 col-md-3 col-sm-6 col-xs-10">
          <q-card-section>
            <q-avatar
              size="100px"
              class="absolute-center shadow-10"
            >
              <img :src="'/images/default_avatar.jpeg' | imgBaseUrl" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                lzzz - 博客后台{{isLogin? '登录': '注册'}}
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <!-- 登录 form -->
            <q-form
              v-show="isLogin"
              class="q-gutter-xs"
              @submit.prevent.stop="login"
              @reset.prevent.stop="onReset"
            >
              <!-- 用户名 -->
              <q-input
                dense
                outlined
                clearable
                :disable="loading"
                v-model.trim="username"
                label="Username"
                debounce='500'
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type your username.',
                  val => (val.length >= 6 && val.length <= 12) || 'Please enter 6-12 username.',
                  hasUsernameCheck
                ]"
              />
              <!-- 密码 -->
              <q-input
                dense
                outlined
                clearable
                :disable="loading"
                v-model.trim="password"
                label="Password"
                type="password"
                debounce='200'
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type your password.',
                  val => (val.length >= 8 && val.length <= 16) || 'Please enter 8-16 password.',
                  passwordStrengthCheck
                ]"
              />
              <!-- 登录 -->
              <div>
                <q-btn
                  :loading="loading"
                  class="full-width bg-logon-card-input"
                  type="submit"
                >
                  登 录
                  <template v-slot:loading>
                    <q-spinner-gears class="on-left" />
                    登 录 中 ...
                  </template>
                </q-btn>
              </div>
            </q-form>
            <!-- 注册form -->
            <q-form
              v-show="!isLogin"
              class="q-gutter-xs"
              @submit.prevent.stop="register"
              @reset.prevent.stop="onReset"
            >
              <!-- 用户名 -->
              <q-input
                dense
                outlined
                clearable
                :disable="loading"
                v-model.trim="username"
                label="Username"
                debounce='500'
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type your username.',
                  val => (val.length >= 6 && val.length <= 12) || 'Please enter 6-12 username.',
                  hasUsernameCheck
                ]"
              />
              <!-- 密码 -->
              <q-input
                dense
                outlined
                clearable
                :disable="loading"
                v-model.trim="password"
                label="Password"
                type="password"
                debounce='200'
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type your password.',
                  val => (val.length >= 8 && val.length <= 16) || 'Please enter 8-16 password.',
                  passwordStrengthCheck
                ]"
              />
              <!-- 确认密码 -->
              <q-input
                v-if="!isLogin"
                dense
                outlined
                clearable
                :disable="loading"
                v-model.trim="confirmPass"
                label="Confirm Pass"
                type="password"
                debounce='200'
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type your Confirm Pass.',
                  val => (val.length >= 8 && val.length <= 16) || 'Please enter 8-16 password.',
                  val => (val === password) || 'The two passwords you typed do not match.',
                  passwordStrengthCheck
                ]"
              />
              <div>
                <q-btn
                  :loading="loading"
                  class="full-width bg-logon-card-input"
                  type="submit"
                >
                  注 册
                  <template v-slot:loading>
                    <q-spinner-gears class="on-left" />
                    注 册 中 ...
                  </template>
                </q-btn>
              </div>
            </q-form>
            <!-- 底部切换 注册/登录-->
            <div class="flex justify-end items-center q-pt-md">
              <div class="">
                {{isLogin? '无账号': '已注册'}}?
                <q-badge
                  outline
                  align="middle"
                  color="teal"
                  @click="isLogin = !isLogin"
                >
                  立即{{ isLogin? '注册': '登录'}}
                </q-badge>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { aesEncrypt } from 'src/utils/crypto.js'
import { QSpinnerGears, debounce } from 'quasar'
import { userLogin, userRegister, findUsername } from 'src/api/user.js'
export default {
  data () {
    return {
      username: "",
      password: "",
      confirmPass: "",
      isLogin: true,  // 登录/注册切换
      loading: false, // 按钮加载, 加载时禁用输入框
    };
  },
  methods: {
    // 登录
    login () {
      this.loading = true
      this.$store.dispatch("user/Login", {
        username: this.username,
        password: aesEncrypt(this.password)
      }).then(() => {
        this.loading = false
        console.log(this.$route);
        this.$router.push({
          path: this.$route.query.redirect ? this.$route.query.redirect : "/"  //如果存在query 就进入query存储的页面 如果没有进入首页
        })
      }).catch(err => {
        this.loading = false
      })
    },
    // 注册
    register () {
      userRegister({
        username: this.username,
        password: aesEncrypt(this.password)
      }).then(res => {
        this.loading = false
        this.isLogin = true // 注册成功, 跳到登录页
        // 注册成功
        this.$q.notify({
          message: res.msg,
          color: 'primary'
        })
      }).catch(err => {
      })
    },
    onReset () {
      this.username = ""
      this.password = ""
      this.confirmPass = ""
    },
    // 校验用户名
    hasUsernameCheck (val) {
      // 登录界面不校验
      if (this.isLogin) return
      return new Promise((resolve, reject) => {
        findUsername({ username: val }).then(res => {
          resolve(!!res || 'The user name is registered')
        })
      })
    },
    // 校验密码强度 8-16位，包含字母、数字、特殊符号
    passwordStrengthCheck (pass) {
      let passReg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,16}/
      return passReg.test(pass) || 'The password is too weak'
    }
  }
};
</script>

<style>
/* 防止移动端，输入时页面底部留白 */
#login {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
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
</style>
