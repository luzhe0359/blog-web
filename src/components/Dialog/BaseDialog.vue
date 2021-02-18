<template>
  <!-- 对话框 -->
  <q-dialog
    ref="dialog"
    persistent
    v-model="visible"
    @before-hide="beforeHide"
  >
    <q-card
      class="q-pa-sm"
      :style="$q.screen.lt.md? 'width:90vw':'width: 50vw'"
    >
      <q-card-section class="row items-center q-pa-sm">
        <div class="text-h6">{{title}}</div>
        <q-space />
        <q-btn
          dense
          flat
          icon="close"
          v-close-popup
        >
        </q-btn>
      </q-card-section>
      <!-- <q-separator inset /> -->
      <q-card-actions class="q-gutter-y-md">
        <slot name="body"></slot>
      </q-card-actions>
      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn
          flat
          color="grey"
          label="取消"
          @click="onCancelClick"
        />
        <q-btn
          v-if="okVisible"
          color="primary"
          label="保存"
          @click="onOKClick"
        />
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
    title: { type: String, default: "" },
    okVisible: { type: Boolean, default: true },
    dialogVisible: { type: Boolean, default: false }
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
    beforeHide () { // 关闭前，触发取消时间，否则会出现下次无法点击bug
      this.$emit('cancelClick')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>