<template>
  <BaseContainer :hideSideContainer="true">
    <div class="q-pa-md">
      <div ref="myList" class="row justify-center q-gutter-sm">
        <q-intersection v-for="index in 60" :key="index" transition="scale" class="example-item">
          <q-card class="q-ma-sm">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">

            <q-card-section>
              <div class="text-h6">Card #{{ index }}</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from 'src/components/Container/BaseContainer'

export default {
  name: 'About',
  components: {
    BaseContainer
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
#Home {
  height: 100%;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

.example-item {
  height: 290px;
  width: 290px;
}
</style>

