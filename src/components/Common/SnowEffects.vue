<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'SnowEffects',
  data () {
    return {
    }
  },
  mounted () {
    this.initSnow()
  },
  methods: {
    initSnow () {
      let width = window.innerWidth
      let height = window.innerHeight
      let Can = document.getElementById('canvas')
      Can.width = width
      Can.height = height
      let Context = Can.getContext('2d')
      let nodeInfoList = []
      let count = Math.floor(width / 70)

      init()
      window.requestAnimationFrame(draw)

      function init () {
        for (let i = 0; i < count; i++) {
          nodeInfoList.push({
            // 雪花的位置
            x: Math.round(Math.random() * width),
            y: Math.round(Math.random() * height),
            // 雪花的半径
            r: Math.round(Math.random() * 15 + 1),
            // 雪花x、y轴的滑落速度
            speedX: Math.random() + 1,
            speedY: Math.random() + 1,
          })
        }
      }

      function draw () {
        Context.clearRect(0, 0, width, height)
        Context.beginPath()
        for (let i = 0; i < count; i++) {
          const node = nodeInfoList[i]
          let radialGradient = Context.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r)
          radialGradient.addColorStop(0, '#fff')
          radialGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)')
          Context.fillStyle = radialGradient
          Context.fillRect(node.x - node.r, node.y - node.r, node.r * 2, node.r * 2)
        }
        calcNextInfo()
        window.requestAnimationFrame(draw)
      }

      function calcNextInfo () {
        for (let i = 0; i < count; i++) {
          const node = nodeInfoList[i]
          node.x += node.speedX
          node.y += node.speedY
          if (node.x > width || node.y > height) {
            nodeInfoList[i] = {
              // 雪花的位置
              x: Math.round(Math.random() * width),
              y: Math.round(Math.random() * height),
              // 雪花的半径
              r: Math.round(Math.random() * 15 + 1),
              // 雪花x、y轴的滑落速度
              speedX: Math.random() + 1,
              speedY: Math.random() + 1,
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 100;
}
</style>

