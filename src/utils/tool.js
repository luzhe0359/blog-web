// 随机生成RGB颜色
export function randomRgbColor () {
    var r = Math.floor(Math.random() * 256) //随机生成256以内r值
    var g = Math.floor(Math.random() * 256) //随机生成256以内g值
    var b = Math.floor(Math.random() * 256) //随机生成256以内b值
    return `rgb(${r},${g},${b})` //返回rgb(r,g,b)格式颜色
}
// 随机生成字体大小
export function randomFontSize () {
    return +(Math.random() * 5 / 10).toFixed(1) + 1 + 'rem'
}