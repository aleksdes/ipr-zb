<template>
  <div class='h-100'>
    <navbar />
    <left-menu class='layout-menu' />
    <div class='main-wrap h-100 overflow-y-auto overflow-x-hidden white-gray scroll'>
      <slot />
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'DefaultLayout',
}
</script>

<script setup lang='ts'>
import LeftMenu from '@/components/leftMenu/LeftMenu.vue'
import Navbar from '@/components/navbar/Navbar.vue'

</script>

<style lang="scss" scoped>
.main-wrap {
  background-color: map-get($grey, 'lighten-2');
}
</style>
