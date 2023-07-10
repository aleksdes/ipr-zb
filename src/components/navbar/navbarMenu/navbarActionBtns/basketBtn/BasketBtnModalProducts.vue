<template>
  <v-card
    elevation='0'
    class='products'
  >
    <div class='d-flex flex-row align-center justify-space-between mb-2'>
      <span><b>Всего товаров: {{basketData.length}}</b></span>
      <v-btn
        variant='text'
        class='fs-14 fw-7 text-initial'
        @click='basketStore.clearBasket'
      >
        Очистить
      </v-btn>
    </div>

    <div class='products__list'>
      <ProductCardBasket
        v-for='product in basketData'
        :key='product.id'
        :data='product'
        @delete='updateStatusProduct(product.id)'
      />
    </div>

    <v-divider class='ma-3'/>

    <div class='d-flex flex-row align-center justify-space-between'>
      <span><b>Итого:</b></span>
      <p class='products__price'>{{totalPrice}} &#36;</p>
    </div>

    <div class='d-flex mt-6'>
      <router-link
        :to='{name: routeNames.basket}'
        class='ml-auto'
      >
        <v-btn
          color='orange-lighten-1'
          class='text-white fs-14 fw-7 text-initial'
          elevation='0'
        >
          В корзину
        </v-btn>
      </router-link>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'BasketBtnModalProducts',
})
</script>

<script setup lang="ts">
import {computed, ComputedRef} from 'vue'
import ProductCardBasket from '@/components/common/productCards/ProductCardBasketMini.vue'
import {BasketProduct, Product} from '@/types/products'
import useBasketStore from '@/store/basketProducts'
import {routeNames} from '@/router/RouteNames'

const basketStore = useBasketStore()

const basketData: ComputedRef<Product[]> = computed((): Product[] => {
  return basketStore.getBasketProducts.map((item: BasketProduct) => item.data)
})

const totalPrice = computed(() => {
  return basketStore.getBasketMetrics.total
})

const updateStatusProduct = (id: number) => {
  basketStore.deleteToBasket(id)
}
</script>


<style lang="scss" scoped>
.products {
  padding: 20px;
  border-radius: 4px !important;
  box-shadow: 0 0 16px rgba(0, 0, 0, 8%) !important;

  &__list {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 8px;
  }

  &__price {
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    color: map-get($orange, 'lighten-1');
    margin-right: 15px;
  }
}
</style>
