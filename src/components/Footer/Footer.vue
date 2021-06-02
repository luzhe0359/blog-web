<template>
  <q-footer id="footer" :value="footer" class="text-white" :height-hint="0">
    <div>
      <p>吉ICP备xxxxxx号-3</p>
      <p>系统由 React+Node+Ant Desgin驱动</p>
      <p>zugelu.com</p>
    </div>
  </q-footer>
</template>

<script>

export default {
  name: 'Footer',
  props: {
    footer: { default: false }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  color: #fff;
  background: linear-gradient(to top, #d3d3d5 1%, #dadcdd 99%);
  text-align: center;
  padding-top: 30px;
  // background-image: url("~assets/bg_body.png");
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center 40%;
  p {
    margin-bottom: 0;
    padding: 0 0 10px;
  }
}
</style>
