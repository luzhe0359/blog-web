<template>
  <div class="q-mr-sm">
    <q-btn-dropdown
      color="primary"
      size="sm"
      :label="stateOptions[state]"
    >
      <q-list>
        <q-item
          clickable
          v-close-popup
          @click="onItemClick(0)"
        >
          <q-item-section>
            <q-item-label>待审核</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="onItemClick(1)"
        >
          <q-item-section>
            <q-item-label>已通过</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="onItemClick(-1)"
        >
          <q-item-section>
            <q-item-label>未通过</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  name: 'CommentState',
  props: {
    state: {
      type: Number,
      default: 0,
    }
  },
  data () {
    return {
      stateOptions: {
        0: '待审核',
        1: '已通过',
        '-1': '未通过',
      }
    };
  },
  methods: {
    onItemClick (state) {
      this.$emit("stateChange", state)
    },
  }
};
</script>
<style lang="scss" scoped>
</style>