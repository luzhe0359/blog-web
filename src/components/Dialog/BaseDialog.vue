<template>
  <!-- 对话框 -->
  <q-dialog class="q-pa-sm" ref="dialog" persistent v-model="visible" @before-hide="beforeHide" transition-show="slide-down" transition-hide="slide-up">
    <q-card :style="$q.screen.lt.md? 'width:90vw':'width: 50vw'">
      <q-bar class="text-dark q-px-md">
        <div class="cursor-pointer">{{title}}</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <!-- <q-separator inset /> -->
      <q-card-actions class="q-gutter-y-md q-pa-md">
        <slot name="body"></slot>
      </q-card-actions>
      <!-- 按钮示例 -->
      <q-card-actions align="right" v-if="!hideAction">
        <q-btn flat color="primary" label="保存" @click="onOKClick" />
        <q-btn flat color="grey" label="取消" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  props: {
    title: { type: String, default: '' },
    dialogVisible: { type: Boolean, default: false },
    hideAction: { type: Boolean, default: false }
  },
  watch: {
    dialogVisible (val) {
      this.visible = val
    }
  },
  methods: {
    onOKClick () {
      this.$emit('okClick')
    },
    onCancelClick () {
      this.$emit('cancelClick')
    },
    beforeHide () { // 关闭前，触发取消事件，否则会出现下次无法点击bug
      this.$emit('cancelClick')
    }
  }
}
</script>
<style lang="scss" scoped>
.q-bar--standard {
  height: 36px;
}
</style>
