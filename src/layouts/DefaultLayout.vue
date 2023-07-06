<template>
  <div class='h-100'>
    <navbar />
    <left-menu class='layout-menu' />
    <div class='main-wrap white-gray scroll'>
      <slot />
    </div>

    <BottomNavbar
      v-if='displayWidth<=768'
    />
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
import BottomNavbar from '@/components/navbar/BottomNavbar.vue'
import { useDisplay } from 'vuetify'

const { width: displayWidth } = useDisplay()
</script>

<style lang="scss" scoped>
.main-wrap {
  background-color: white;
  height: inherit;

  & > :deep div {
    height: 100%;
  }
}
</style>
