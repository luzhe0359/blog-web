<template>
  <div id="ball-box">
    <div id="mini-p-share-cont">
      <div class="mini-p-share"></div>
      <div class="mini-p-share"></div>
      <div class="mini-p-share"></div>
      <div class="mini-p-share"></div>
      <div class="mini-p-share"></div>
      <div class="mini-p-share"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BallEffects',
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
#ball-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.mini-p-share {
  position: absolute;
  border-radius: 50%;
}

$colors: #2094fa, #fa2094, #f9c00c, #fa2027, #75d701, #00dffc, #5c196b;

$count: 30;
@media (max-width: 1200px) {
  $count: 10;
}

@for $i from 1 through $count {
  @keyframes particle-animation-#{$i} {
    100% {
      transform: translate3d(
        (random(310) * 1px),
        (random(125) * 1px),
        (random(100) * 1px)
      );
    }
  }
  .mini-p-share:nth-child(#{$i}) {
    $size: random(6) + 6 + px;
    height: $size;
    width: $size;
    opacity: random(100) / 50;
    animation-delay: -$i * 0.1s;
    background-color: nth($colors, random(length($colors)));
    animation: particle-animation-#{$i} 60s infinite;
    transform: translate3d(
      (random(310) * 1px),
      (random(125) * 1px),
      (random(100) * 1px)
    );
  }
}
</style>

