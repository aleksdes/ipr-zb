<template>
  <div class='basket pa-5 h-100'>
    <h2 class='mb-2'>Корзина</h2>

    <v-card
      v-if='!isLoading && basketData.length===0'
      elevation='0'
      class='w-100 pa-3'
    >
      <div
        class='d-flex flex-column justify-center align-center my-5'
      >
        <v-img
          src='/img/basket-empty.svg'
          height='150'
          width='auto'
          class='mx-auto mb-2'
        />
        <b class='basket__empty-title'>Корзина пуста</b>
        <p class='basket__empty-desc'>Посмотрите предложения на главной странице,<br> воспользуйтесь каталогом</p>
      </div>
    </v-card>

    <div
      v-else
      class='basket__content mb-5'
    >
      <div
        class='basket__product-list'
      >
        <ProductCardBasketBase
          v-for='product in basketData'
          :key='product.id'
          :data='product'
          @show-product-details='selectedProduct = product; dialog=true'
        />

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

      <v-card
        class='basket__actions'
      >
        <p class='basket__actions__title mb-2'>Условия заказа</p>
        <div class='d-flex flex-row justify-space-between align-end w-100'>
          <div class='d-flex flex-column'>
            <span class='fs-12 text-grey'>Итого</span>
            <b>{{basketMetrics.totalQuantity}} товар(ов)</b>
          </div>

          <b>{{basketMetrics.total}} &#36;</b>
        </div>

        <v-btn
          class='login-form__btn text-white w-100 text-initial fw-6 mt-4'
          color='orange-lighten-1'
          height='55'
          elevation='0'
        >
          Перейти к оформлению
        </v-btn>
      </v-card>
    </div>

    <RecentlyViewed />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'BasketView',
})
</script>

<script setup lang="ts">
import {computed, ref, ComputedRef} from 'vue'
import ProductCardDetails from '@/components/common/productCards/ProductCardDetails.vue'
import ProductCardBasketBase from '@/components/common/productCards/ProductCardBasketBase.vue'
import RecentlyViewed from '@/components/common/recentlyViewed/RecentlyViewed.vue'

import {Product, BasketProduct} from '@/types/products'
import useBasketStore from '@/store/basketProducts'

const dialog = ref(false)
const selectedProduct = ref<Product | null>(null)

const closeCardDetails = () => {
  dialog.value = false
  selectedProduct.value = null
}

const basketStore = useBasketStore()

const basketData: ComputedRef<Product[]> = computed((): Product[] => {
  return basketStore.getBasketProducts.map((item: BasketProduct) => item.data)
})

const basketMetrics = computed(() => {
  return basketStore.getBasketMetrics
})

const isLoading = computed(() => {
  return basketStore.getLoading
})

// getImg(id: string) {
//   const img = require.context('@/assets/img/ui-icons/types-ship', true, /\.svg$/i)
//   return img(id)
// }
</script>

<style lang="scss" scoped>
.basket {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__product-list {
    display: grid;
    grid-gap: 20px;
  }

  &__content {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 20px;
    width: 100%;
    align-items: start;

    @media (min-width: 1024px) {
      grid-template-columns: auto 350px;
    }
  }

  &__actions {
    box-shadow: 0 0 14px rgba(0, 0, 0, 10%);
    padding: 15px;
    border-radius: 8px;
    text-align: initial;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: 1024px) {
      grid-row: auto;
      position: sticky;
      top: 80px;
    }
  }
}
</style>
