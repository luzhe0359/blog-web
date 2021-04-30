<template>
  <!-- 对话框 -->
  <q-dialog ref="dialog" v-model="dialogVisible">
    <q-card class="q-pa-sm" :style="$q.screen.lt.md? 'width:90vw':'width: 50vw'">
      <q-card-section class="q-pa-sm">
        <div class="text-h6">{{title}}</div>
      </q-card-section>
      <!-- <q-separator inset /> -->
      <q-card-actions class="q-px-md">
        <slot name="body"></slot>
      </q-card-actions>
      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn flat color="grey" label="取消" @click="onCancelClick" />
        <q-btn color="primary" label="保存" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    dialogVisible: { type: Boolean, default: false }
  },
  methods: {
    onOKClick () {
      this.$emit('okClick')
    },
    onCancelClick () {
      this.$emit('cancelClick')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>