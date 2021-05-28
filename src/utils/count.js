import { LocalStorage } from 'quasar'
const CountKey = 'count' // 统计信息

// count
export function getCount () {
  return LocalStorage.getItem(CountKey) || {}
}

export function setCount (count) {
  LocalStorage.set(CountKey, count)
}

export function removeCount () {
  LocalStorage.remove(CountKey)
}