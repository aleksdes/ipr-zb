<template>
  <div class='animations pa-5 h-100'>
    <div
      style='height: 500px;'
      class='d-flex align-center justify-center'
    >
      <CircleLoader
        size='150'
        class='mx-auto'
      />
    </div>

    <CircleBurger />

    <div
      style='height: 500px;'
      class='d-flex align-center justify-center'
    >
      <ShareBtn />
    </div>

    <div
      style='height: 500px;'
      class='d-flex align-center justify-center'
    >
      <FloatText />
    </div>
    <div
      style='height: 700px;'
      class='d-flex align-center justify-center'
    >
      <RandomBubble />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent ({
  name: 'AnimationsView',
})
</script>

<script setup lang="ts">
import CircleLoader from './components/CircleLoader.vue'
import CircleBurger from './components/CircleBurger.vue'
import ShareBtn from './components/ShareBtn.vue'
import FloatText from './components/FloatText.vue'
import RandomBubble from './components/RandomBubble.vue'
</script>

<style lang="scss" scoped>
</style>
