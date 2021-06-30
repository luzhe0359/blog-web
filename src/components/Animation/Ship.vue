<template>
  <div class="absolute-bottom-right ship-box gt-xs">
    <div class="ship">
      <div class="ball"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ship',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.ship-box {
  right: 100px;
  -webkit-box-reflect: below 1px
    linear-gradient(transparent, rgba(0, 0, 0, 0.1));
}

.ship-box .ship {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 20px solid transparent;
  border-bottom: 20px solid #06c8f0;
  border-right: 20px solid #06c8f0;
  transform: rotate(45deg);
  animation: animate 4s ease-in-out infinite;
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.ship-box .ship .ball {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: animateBall 4s ease-in-out infinite;
}
@keyframes animateBall {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.ship-box .ship .ball::before {
  content: "";
  position: absolute;
  bottom: 50%;
  right: 15px;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  transform: translateY(-50%);
}
</style>

