<template>
  <v-menu
    :disabled='basketMetrics.totalQuantity === 0'
    open-on-hover
    open-on-click
    :close-on-content-click='false'
    location='bottom right'
  >
    <template v-slot:activator='{ props }'>
      <v-btn
        class='pa-0'
        size='x-small'
        icon
      >
        <v-badge
          :model-value='basketMetrics.totalQuantity > 0'
          :content='basketMetrics.totalQuantity'
          color='orange-lighten-1'
          v-bind='props'
        >
          <v-icon
            size='30'
            class='pointer'
          >
            mdi-basket-outline
          </v-icon>
        </v-badge>
      </v-btn>
    </template>

    <BasketBtnModalProducts />
  </v-menu>
</template>

<script lang="ts">
export default {
  name: 'BasketBtn',
}
</script>

<script setup lang="ts">
import {computed, ComputedRef} from 'vue'
import {Product} from '@/types/products'
import BasketBtnModalProducts from './basketBtn/BasketBtnModalProducts.vue'
import useBasketStore, {BasketMetricsStore} from '@/store/basketProducts'

const basketStore = useBasketStore()

const basketMetrics: ComputedRef<BasketMetricsStore> = computed((): BasketMetricsStore => basketStore.getBasketMetrics)
</script>
