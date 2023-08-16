<template>
  <div
    v-if='viewedData.length > 0'
    class='viewed'
  >
    <h2 class='mb-3 text-left'>Вы недавно просматривали </h2>

    <v-card
      elevation='0'
      class='viewed__card-list'
    >
      <ProductCardRecentlyViewed
        v-for='product in viewedData'
        :key='product.id'
        :data='product'
        @show-product-details='selectedProduct = product; dialog=true'
      />
    </v-card>

    <v-dialog
      v-if='dialog'
      :model-value='true'
      width='auto'
      @update:modelValue='closeCardDetails'
    >
      <ProductCardDetails
        :data='selectedProduct'
        @close='closeCardDetails'
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'RecentlyViewed',
})
</script>

<script setup lang="ts">
import {computed, ComputedRef, ref, onMounted, Ref} from 'vue'
import ProductCardRecentlyViewed from '@/components/common/productCards/ProductCardRecentlyViewed.vue'
import ProductCardDetails from '@/components/common/productCards/ProductCardDetails.vue'
import useRecentlyViewedStore from '@/store/recentlyViewed'
import {ViewedProductStorage} from '@/types/products'

const dialog = ref(false)
const selectedProduct: Ref<ViewedProductStorage | null> = ref(null)

const viewedStore = useRecentlyViewedStore()
const viewedData: ComputedRef<ViewedProductStorage[]> = computed((): ViewedProductStorage[] => {
  return viewedStore.getRecentlyViewed.slice(0, 5)
})

const closeCardDetails = () => {
  dialog.value = false
  selectedProduct.value = null
}

onMounted(() => {
  viewedStore.initRecentlyViewed()
})
</script>

<style lang="scss" scoped>
.viewed {
  width: 100%;

  &__card-list {
    display: grid;
    box-shadow: 0 0 25px rgba(0, 0, 0, 8%) !important;
    grid-gap: 25px;
    overflow-x: overlay;
    grid-auto-flow: column;
    padding: 15px;
    justify-content: flex-start;
  }
}
</style>
