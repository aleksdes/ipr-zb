<template>
  <v-card
    class='basket-card'
    variant='flat'
  >
    <div
      v-if='basketData.length===0'
      class='basket-card__empty d-flex flex-column justify-center align-center'
    >
      <v-img
        src='/img/basket-empty.svg'
        height='100'
        class='mx-auto mb-2'
      />
      <b class='basket-card__empty-title fs-18'>Корзина пуста</b>
      <p class='basket-card__empty-title fs-12'>Посмотрите предложения на главной странице,<br> воспользуйтесь каталогом</p>
    </div>

    <div
      v-else
      class='d-flex flex-column align-start'
    >
      <p class='basket-card__title mb-3'>Товары в корзине</p>

      <div class='basket-card__list mb-5 w-100'>
        <ProductCardBasket
          v-for='product in basketData'
          :key='product.id'
          :data='product'
          :showDelete='false'
        />
      </div>

      <div class='basket-card__box-price d-flex flex-column align-end w-100'>
        <p class='basket-card__title-price'>Общая стоимость:</p>
        <p class='basket-card__total-price'>{{totalPrice}}<span>&#36;</span></p>
      </div>

      <div class='basket-card__actions d-flex justify-end w-100 mt-5'>
        <router-link :to='{name: routeNames.basket}'>
          <v-btn
            color='orange-lighten-1'
            class='text-white fs-14 fw-7 text-initial ml-auto'
            elevation='0'
          >
            В корзину
          </v-btn>
        </router-link>
      </div>

    </div>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'BasketCard',
}
</script>

<script setup lang="ts">
import {ComputedRef, computed} from 'vue'
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
</script>

<style lang="scss" scoped>
.basket-card {
  box-shadow: 0 0 25px rgba(0, 0, 0, 8%);
  padding: 20px;

  &__list {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 8px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
  }

  &__title-price {
    font-weight: 600;
  }

  &__total-price {
    font-size: 40px;
    font-weight: 500;
    line-height: 40px;

    span {
      margin-left: 5px;
      font-size: 30px;
      font-weight: 400;
    }
  }
}
</style>
