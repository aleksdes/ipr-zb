<template>
  <div class='favorites pa-5 h-100'>
    <h2 class='mb-2'>Избранное</h2>

    <v-card
      v-if='!isLoading && likeData.length===0'
      elevation='0'
      class='w-100 pa-3'
    >
      <div
        class='d-flex flex-column justify-center align-center my-5'
      >
        <v-img
          src='/img/likes-empty.svg'
          height='150'
          class='mx-auto mb-4'
        />
        <p class='basket__empty-desc'>В списке пока нет ни одного избранного товара</p>
      </div>
    </v-card>

    <div
      v-else
      class='favorites__content'
    >
      <div
        class='favorites__product-list'
      >
        <ProductCardLikeBase
          v-for='product in likeData'
          :key='product.id'
          v-model='selectedLikeProduct'
          :data='product'
        />
      </div>

      <v-card
        class='favorites__actions'
      >
        <div class='d-flex flex-row justify-space-between align-end w-100 mb-4'>
          <div class='d-flex flex-column'>
            <span class='fs-12 text-grey'>Итого</span>
            <b>{{LikeMetrics.totalProducts}} товар(ов)</b>
          </div>

          <b>{{LikeMetrics.total}} &#36;</b>
        </div>

        <div class='d-flex flex-row align-center justify-space-between w-100'>
          <div
            class='favorites__select-all'
          >
            <v-checkbox
              v-model='selectedAllProducts'
              density='compact'
              hide-details
              label='выбрать все'
              color='orange-lighten-1'
            />
          </div>

          <div>
            <v-btn
              size='35'
              icon
              color='grey-lighten-1'
              variant='outlined'
              @click='deleteSelectedLike'
            >
              <v-icon size='20'>mdi-trash-can-outline</v-icon>
            </v-btn>

            <v-btn
              color='orange-lighten-1'
              class='text-white text-initial fw-6 ml-3'
              elevation='0'
              width='100'
              @click='buySelectedLike'
            >
              Купить
            </v-btn>
          </div>
        </div>
      </v-card>

    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WishlistView',
}
</script>

<script setup lang="ts">
import {computed, ref, Ref, ComputedRef, watch} from 'vue'
import ProductCardLikeBase from '@/components/common/productCards/ProductCardLikeBase.vue'
import {Product} from '@/types/products'
import useBasketStore from '@/store/basketProducts'
import useLikeProductsStore from '@/store/likeProducts'

const basketStore = useBasketStore()
const likeStore = useLikeProductsStore()

const selectedAllProducts = ref(false)
const selectedLikeProduct: any = ref([])

const likeData: ComputedRef<Product[]> = computed((): Product[] => {
  return likeStore.getLikeProducts
})

const LikeMetrics = computed(() => {
  return likeStore.getLikesMetrics
})

const isLoading = computed(() => {
  return likeStore.getLoading
})

watch(selectedAllProducts, (v: boolean)=>{
  selectedLikeProduct.value = v ? likeData.value.map((item: Product) => item.id) : []
})

const deleteSelectedLike = () => {
  if (selectedAllProducts.value) {
    likeStore.deleteAllLikes()
  } else {
    likeStore.deleteGroupLikes(selectedLikeProduct.value)
  }

  selectedLikeProduct.value = []
}
const buySelectedLike = () => {
  basketStore.addGroupToBasket(selectedLikeProduct.value)
}
</script>

<style lang="scss" scoped>
.favorites {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__actions {
    box-shadow: 0 0 14px rgba(0, 0, 0, 10%);
    padding: 15px;
    border-radius: 8px;
    text-align: initial;
  }

  &__product-list {
    display: grid;
    grid-gap: 20px;
  }

  &__content {
    display: grid;
    grid-template-columns: auto 350px;
    grid-gap: 20px;
    width: 100%;
    align-items: start;
  }

  &__actions {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__title {
      font-weight: 700;
    }
  }

  &__select-all {
    display: flex;
    align-items: center;
    padding: 5px 8px;
    background-color: map-get($grey, 'lighten-3');
    border-radius: 8px;

    :deep .v-checkbox .v-selection-control {
      min-height: 0;
    }
  }
}
</style>
