<template>
  <div id="footer" class="text-grey">
    <div>
      <p><a target="_blank" href="https://beian.miit.gov.cn/">晋ICP备2021010367号</a></p>
      <p>系统由 Vue + Node + Quasar Framework驱动</p>
      <p>zugelu.com</p>
    </div>
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
  // background-color: transparent;
  background-color: rgba(255, 255, 255, 0.05) !important;
  // background: linear-gradient(to top, #d3d3d5 1%, #dadcdd 99%);
  text-align: center;
  padding-top: 30px;
  // background-image: url("~assets/bg_body.webp");
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center 40%;
  p {
    margin-bottom: 0;
    padding: 0 0 10px;
    a {
      color: $grey;
      text-decoration: none;
      background-color: transparent;
      outline: none;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
