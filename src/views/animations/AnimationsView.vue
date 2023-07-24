<template>
  <div class='animations pa-5 h-100'>
    <CircleLoader />
    <CircleBurger />
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
</script>

<style lang="scss" scoped>
.animations {
}
</style>
