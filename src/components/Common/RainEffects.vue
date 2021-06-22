<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Rainffects',
  data () {
    return {
    }
  },
  mounted () {
    this.initRain()
  },
  methods: {
    initRain () {
      const rain = []
      const drops = [];
      const gravity = 0.2;
      const wind = 0.015;
      const rainChance = 0.2;
      const rainLength = 20 // +长
      const rainWidth = 2 // 宽
      const strokeStyle = 'rgba(255,255,255,0.5)'
      const fillStyle = 'rgba(255,255,255,0.8)'
      window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      //--------------------------------------------
      class Vector {
        constructor(x = 0, y = 0) {
          this.x = x;
          this.y = y;
        }
        add (v) {
          if (v.x != null && v.y != null) {
            this.x += v.x;
            this.y += v.y;
          } else {
            this.x += v;
            this.y += v;
          }
          return this;
        }
        copy () {
          return new Vector(this.x, this.y);
        }
      }
      //--------------------------------------------
      class Rain {
        constructor() {
          this.pos = new Vector(Math.random() * canvas.width, -50);
          this.prev = this.pos;
          this.vel = new Vector();
        }
        update () {
          this.prev = this.pos.copy();
          this.vel.y += gravity;
          this.vel.x += wind;
          this.pos.add(this.vel);
        }
        draw (ctx) {
          ctx.beginPath();
          ctx.moveTo(this.pos.x, this.pos.y + rainLength);
          ctx.lineTo(this.prev.x, this.prev.y);
          ctx.stroke();
        }
      }
      //--------------------------------------------
      class Drop {
        constructor(x, y) {
          const dist = Math.random() * 7;
          const angle = Math.PI + Math.random() * Math.PI;
          this.pos = new Vector(x, y);
          this.vel = new Vector(Math.cos(angle) * dist, Math.sin(angle) * dist);
        }
        update () {
          this.vel.y += gravity;
          this.vel.x *= 0.95;
          this.vel.y *= 0.95;
          this.pos.add(this.vel);
        }
        draw (ctx) {
          ctx.beginPath();
          ctx.arc(this.pos.x, this.pos.y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      //--------------------------------------------
      function update () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let i = rain.length;
        while (i--) {
          const raindrop = rain[i];
          raindrop.update();
          if (raindrop.pos.y >= canvas.height) {
            let n = Math.round(4 + Math.random() * 4);
            while (n--) drops.push(new Drop(raindrop.pos.x, canvas.height));
            rain.splice(i, 1);
          }
          raindrop.draw(ctx);
        }
        i = drops.length;
        while (i--) {
          const drop = drops[i];
          drop.update();
          drop.draw(ctx);
          if (drop.pos.y > canvas.height) drops.splice(i, 1);
        }
        if (Math.random() < rainChance) rain.push(new Rain());
        requestAnimFrame(update);
      }

      function init () {
        ctx.lineWidth = rainWidth;
        ctx.strokeStyle = strokeStyle
        ctx.fillStyle = fillStyle
        update();
      }
      init();
    },
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

