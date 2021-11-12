<template>
  <div id="SideUserTag" class="full-width q-mt-lg">
    <div class="text-h6 q-mb-sm">个性标签</div>
    <div class="row wrap">
      <div class="tag-box col-4 q-pa-xs cursor-pointer" v-for="tag in tagList" :key="tag.url">
        <q-img class="tag q-mr-md" img-class="img-contain" :src="tag.url" spinner-color="grey" :placeholder-src="$BASE_IMG_URL">
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
        { url: '/tag/tag4.webp', name: '潜力股' },
        { url: '/tag/tag6.webp', name: 'I T 男' },
        { url: '/tag/tag1.webp', name: '幽默' },
        { url: '/tag/tag3.webp', name: '90后' },
        { url: '/tag/tag2.webp', name: '幸福' },
        { url: '/tag/tag5.webp', name: '狂吃不胖' },
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
#SideUserTag {
  .tag-box {
    border-radius: 40px;
  }
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
