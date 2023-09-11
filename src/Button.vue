<template>
  <v-btn class='uppercase text-sm font-medium tracking-wider py-2.5 px-4 mr-1 focus:outline-none'>
    {{ msg }}
  </v-btn>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
  },
})
</script>
