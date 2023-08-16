<template>
  <v-menu
    v-model='openMenu'
    :disabled='basketMetrics.totalQuantity === 0 || typeLink'
    open-on-hover
    open-on-click
    :close-on-content-click='false'
    location='bottom right'
  >
    <template v-slot:activator='{ props }'>
      <v-btn
        class='pa-0'
        size='45'
        :color='openMenu ? "light-blue-darken-1" : props.color'
        icon
        v-bind='props'
        @click='goBasket'
      >
        <v-badge
          :model-value='basketMetrics.totalQuantity > 0'
          :content='basketMetrics.totalQuantity'
          color='orange-lighten-1'
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
import { defineComponent } from 'vue'
export default defineComponent ({
  name: 'BasketBtn',
})
</script>

<script setup lang="ts">
import {computed, ComputedRef, ref} from 'vue'
import {useRouter} from 'vue-router'
import BasketBtnModalProducts from './basketBtn/BasketBtnModalProducts.vue'
import useBasketStore, {BasketMetricsStore} from '@/store/basketProducts'
import {routeNames} from '@/router/RouteNames'

const props = defineProps({
  typeLink: {
    type: Boolean,
    default: false,
  },
})
const openMenu = ref(false)
const router = useRouter()
const basketStore = useBasketStore()
const basketMetrics: ComputedRef<BasketMetricsStore> = computed((): BasketMetricsStore => basketStore.getBasketMetrics)

const goBasket = () => {
  if (props.typeLink) {
    router.push({name: routeNames.basket})
  }
}
</script>
