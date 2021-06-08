<template>
  <div id="SideUserTag" class="full-width q-mt-lg">
    <div class="text-h6 q-mb-md">个性标签</div>
    <div class="row wrap">
      <div class="col-4 q-pa-xs cursor-pointer" v-for="tag in tagList" :key="tag.url">
        <q-img class="tag q-mr-md" img-class="img-contain" :src="tag.url" spinner-color="white">
          <div class="desc absolute-full text-subtitle2 flex flex-center">
            {{tag.name}}
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideUserTag',
  data () {
    return {
      tagList: [
        { url: '/tag/tag1.png', name: '幽默' },
        { url: '/tag/tag4.png', name: '潜力股' },
        { url: '/tag/tag3.png', name: '90后' },
        { url: '/tag/tag2.png', name: '幸福' },
        { url: '/tag/tag5.png', name: '狂吃不胖' },
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
#SideUserTag {
  .tag {
    height: auto;
    border-radius: 24px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-size: contain;
    .desc {
      display: none;
      animation: puff-in-center 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) both;
    }
    &:hover {
      .desc {
        display: flex;
      }
    }
  }
}
</style>
