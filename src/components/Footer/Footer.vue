<template>
  <div id="footer">
    <p>吉ICP备xxxxxx号-3</p>
    <p>系统由 React+Node+Ant Desgin驱动</p>
    <p>zugelu.com</p>
  </div>
</template>

<script>

export default {
  name: 'Footer',
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
  background-color: #ccc;
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
