<template>
  <div class='h-100'>
    <navbar />
    <left-menu class='layout-menu' />
    <div class='main-wrap  overflow-y-auto overflow-x-hidden white-gray scroll'>
      <slot />
    </div>

    <Footer />
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
import Footer from '@/components/footer/Footer.vue'

</script>

<style lang="scss" scoped>
.main-wrap {
  background-color: white;

  & > :deep div {
    height: 100%;
  }
}
</style>
