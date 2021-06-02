import Vue from 'vue'
import { Notify } from 'quasar'

// 设置默认值
Notify.setDefaults({
    timeout: 2500,
    progress: true,
    position: 'top',
    textColor: 'white'
})

Vue.prototype.$msg = {
    // 成功 this.$msg.success(res.msg)
    success: (msg) => {
        Notify.create({
            icon: 'sentiment_satisfied_alt',
            color: 'green',
            message: msg
        })
    },
    // 失败 this.$msg.error(res.msg)
    error: (msg) => {
        Notify.create({
            icon: 'sentiment_very_dissatisfied',
            color: 'negative',
            message: msg
        })
    },
    // 警告 this.$msg.warning(res.msg)
    warning: (msg) => {
        Notify.create({
            icon: 'sentiment_satisfied',
            textColor: 'black',
            color: 'warning',
            message: msg
        })
    }
}
