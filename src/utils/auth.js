import { LocalStorage } from 'quasar'
const TokenKey = 'token' // token信息
const UserKey = 'user' // 用户信息
const StyleKey = 'style' // 界面风格


// token
export function getToken () { // { username: '默认token', desc: '游客访问博客,需要使用的默认token', _id: null }
  return LocalStorage.getItem(TokenKey) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ium7mOiupHRva2VuIiwiZGVzYyI6Iua4uOWuouiuv-mXruWNmuWuoizpnIDopoHkvb_nlKjnmoTpu5jorqR0b2tlbiIsIl9pZCI6bnVsbCwiaWF0IjoxNjExOTEzNDMxLCJleHAiOjQ3Njc2NzM0MzF9.RcB5Bz2l1hoomJBfX6_KjEa4nbjhBKNCvAulDcjfqZg'
}

export function setToken (token) {
  LocalStorage.set(TokenKey, token)
}

export function removeToken () {
  LocalStorage.remove(TokenKey)
}

// user
export function getUser () {
  return LocalStorage.getItem(UserKey) || {}
}

export function setUser (user) {
  LocalStorage.set(UserKey, user)
}

export function removeUser () {
  return LocalStorage.remove(UserKey)
}

// style
export function getStyle () {
  return LocalStorage.getItem(StyleKey) || 'white'
}

export function setStyle (style) {
  LocalStorage.set(StyleKey, style)
}


export function removeStyle () {
  return LocalStorage.remove(StyleKey)
}