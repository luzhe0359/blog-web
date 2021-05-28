// 全局过滤器
import Vue from 'vue'
import { date } from 'quasar'

const filters = {
    // 性别
    userGender (gender) {
        switch (gender) {
            case 1:
                return '男';
            case 0:
                return '女';
            case -1:
                return '*';
        }
    },
    // 文章类型
    articleType (type) {
        switch (type) {
            case 1:
                return "原创";
            case 2:
                return "转载";
        }
    },
    // 默认地址
    imgBaseUrl (url) {
        return process.env.URL + url
    },
    /**
    * 日期差
    * @param {String} d 日期
    * @return {String} 日期差
    */
    dateDiff (d) {
        let now = new Date()

        let year = date.getDateDiff(now, d, 'yaers')
        let month = date.getDateDiff(now, d, 'months')
        let day = date.getDateDiff(now, d, 'days')
        let hour = date.getDateDiff(now, d, 'hours')
        let minute = date.getDateDiff(now, d, 'minutes')

        return year && year + '年前' ||
            month && month + '个月前' ||
            day && day + '天前' ||
            hour && hour + '小时前' ||
            minute && minute + '分钟前' ||
            '刚刚'
    },

    // 日期格式化
    dateFormat (d) {
        return date.formatDate(d, 'YYYY-MM-DD HH:mm:ss')
    },
    // 年月日 格式化
    yearFormat (d, prefix) {
        return (prefix ? prefix : '') + date.formatDate(d, 'YYYY-MM-DD')
    }
}

// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})