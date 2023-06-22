<template>
  <v-row
    no-gutters
    class='layout'
  >
    <v-col class='layout-bg relative dark-blue d-none d-md-flex align-center justify-center'>
      <v-img
        src='@/assets/img/logotype.svg'
        class='logo'
      />
      <v-img
        class='layout-waves'
        src='@/assets/img/waves.svg'
      />
    </v-col>
    <v-col>
      <slot />
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  name: 'AuthLayout',
}
</script>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}

.layout-bg {
  overflow: hidden;
}

.layout-waves {
  position: absolute;
  bottom: -101px;
  left: 0;
  width: 4620px;
  height: 309px;
}

.logo {
  max-width: 329px;
}
</style>
