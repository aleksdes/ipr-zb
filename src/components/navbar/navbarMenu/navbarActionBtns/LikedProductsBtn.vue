<template>
  <v-btn
    class='pa-0'
    size='x-small'
    icon
  >
    <v-badge
      :model-value='getLikes>0'
      :content='getLikes'
      color='orange-lighten-1'
    >
      <v-icon
        size='30'
        class='pointer'
      >
        mdi-heart-outline
      </v-icon>
    </v-badge>
  </v-btn>
</template>

<script lang="ts">
export default {
  name: 'LikedProductsBtn',
}
</script>

<script setup lang="ts">
import {defineProps, defineEmits, computed, ComputedRef} from 'vue'
import useLikeProductsStore from '@/store/likeProducts'

const likeProductsStore = useLikeProductsStore()

const getLikes = computed(()=>{
  return likeProductsStore.getItems.length
})
</script>

<style lang="scss" scoped>
</style>
