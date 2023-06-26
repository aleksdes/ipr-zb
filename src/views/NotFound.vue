<template>
  <div class='page align-center justify-center flex-column'>
    <Animate404 />

    <div class='description text-center'>
      Uh oh! Looks like you got lost. <br>
      Go back to the homepage if you dare
    </div>

    <router-link :to='{name: routeNames.home}'>
      <v-btn
        rounded='xl'
        elevation='4'
        size='x-large'
        color='light-blue'
      >
        Go home!
      </v-btn>
    </router-link>
  </div>
</template>

<script  lang='ts'>
export default  {
  name: 'NotFound',
}
</script>

<script setup lang='ts'>
import Animate404 from '@/components/404/Animate404.vue'
import {routeNames} from '@/router/RouteNames'; '@/router/RouteNames'
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;

  .description {
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 120%;
    margin: 26px 0;
  }
}
</style>
