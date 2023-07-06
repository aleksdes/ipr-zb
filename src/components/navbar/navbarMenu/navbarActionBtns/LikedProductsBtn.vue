<template>
  <v-btn
    class='pa-0'
    size='45'
    icon
    @click='goLikePage'
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
import {computed} from 'vue'
import useLikeProductsStore from '@/store/likeProducts'
import {useRouter} from 'vue-router'
import {routeNames} from '@/router/RouteNames'

const likeProductsStore = useLikeProductsStore()

const router = useRouter()

const getLikes = computed(()=>{
  return likeProductsStore.getLikeProducts.length
})

const goLikePage = () => {
  if (getLikes.value === 0) return
  router.push({name: routeNames.wishlist})
}
</script>

<style lang="scss" scoped>
</style>
