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
      >
        Очистить
      </v-btn>
    </div>

    <div class='products__list'>
      <div
        v-for='item in basketData'
        :key='item.id'
        class='products__item'
      >
        <div class='d-flex flex-row align-center'>
          <div
            class='products__box-thumbnail d-flex align-center'
            :class='{"products__box-thumbnail--empty": !item.thumbnail}'
          >
            <v-img
              v-if='item.thumbnail'
              class='products__thumbnail'
              :src='item.thumbnail'
            />
            <v-icon
              v-else
              size='35'
            >
              mdi-image-frame
            </v-icon>
          </div>

          <div class='products__info'>
            <div class='text-left'>
              <p class='products__brand'>{{item.brand}}</p>
              <p
                class='products__name'
              >
                {{item.title}}
              </p>
              <p class='products__desc'>{{item.description}}</p>
            </div>
          </div>
        </div>

        <div class='d-flex flex-row align-center'>
          <p class='products__price'>{{item.price}} &#36;</p>

          <v-btn
            size='30'
            icon
            @click='updateStatusProduct(item.id)'
          >
            <v-icon size='16'>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <v-divider class='ma-3'/>

    <div class='d-flex flex-row align-center justify-space-between'>
      <span><b>Итого:</b></span>
      <p class='products__price'>{{totalPrice}} &#36;</p>
    </div>

    <div class='d-flex mt-6'>
      <v-btn
        color='orange-lighten-1'
        class='text-white fs-14 fw-7 text-initial ml-auto'
        elevation='0'
      >
        В корзину
      </v-btn>
    </div>

  </v-card>
</template>

<script lang="ts">
export default {
  name: 'BasketBtnModalProducts',
}
</script>

<script setup lang="ts">
import {computed, ComputedRef} from 'vue'
import {BasketProduct, Product} from '@/types/products'
import useBasketStore from '@/store/basketProducts'

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
  border-radius: 15px !important;
  box-shadow: 0 0 16px rgba(0, 0, 0, 8%) !important;

  &__list {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 8px;
  }

  &__item {
    display: grid;
    grid-template-columns: 350px auto;
    align-items: center;
    justify-content: space-between;
    grid-column-gap: 15px;
  }

  &__box-thumbnail {
    min-width: 60px;
    height: 60px;
    width: 60px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 10px;

    &--empty {
      border: 1px solid map-get($grey, "lighten-1");
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__brand {
    font-size: 10px;
    color: grey;
  }

  &__name {
    font-size: 14px;
    line-height: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
