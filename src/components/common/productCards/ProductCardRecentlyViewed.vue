<template>
  <div
    class='product'
  >
    <v-btn
      size='25'
      icon
      class='product__close bg-white'
      elevation='0'
      @click='deleteViewed'
    >
      <v-icon
        size='20'
        color='grey'
      >
        mdi-close
      </v-icon>
    </v-btn>

    <div>
      <v-badge
        color='red'
        :content='"-" + Math.ceil(data.discountPercentage) + "%"'
        :disabled='!data.discountPercentage'
        offset-x='30'
        offset-y='15'
        location='bottom left'
        class='w-100'
      >
        <div class='product__box-imgs w-100'>
          <v-img
            class='product__thumbnail'
            :src='imgItems[0]'
          />
        </div>
      </v-badge>

      <div class='text-left'>
        <div class='text-left'>
          <p class='fs-12 text-grey-darken-1'>{{data.brand}}</p>
          <p class='product__name mb-2'>{{data.title}}</p>
        </div>

        <div class='product__box-desc mb-3'>
          <p class='fs-12 text-grey-darken-1'>Описание</p>
          <p class='product__desc'>{{data.description || '='}}</p>
        </div>

        <div class='text-left mb-4'>
          <div class='product__rating my-2'>
            <v-rating
              :model-value='data.rating'
              size='20'
              disabled
              color='orange-lighten-1'
            />
            <p class='mx-2'>{{Number(data.rating.toFixed(1))}}/5</p>
          </div>
          <p class='product__stock'>В наличии: <span>{{data.stock || 0}}</span></p>
        </div>
      </div>
    </div>

    <div class='product__info'>
      <div class='product__box-price'>
        <p class='product__price mb-2'>{{data.price}} &#36;</p>

        <div class='product__actions'>
          <v-btn
            :color='isLicked ? "orange-lighten-1" : "grey-lighten-1"'
            variant='outlined'
            class='product__action-like px-0'
            @click.stop='likeProducts'
          >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>

          <v-btn
            :color='isBasket ? "orange-lighten-1" : "grey-lighten-1"'
            class='text-white'
            elevation='0'
            width='120'
            :variant='isBasket ? "elevated" : "outlined"'
            @click.stop='updateStatusProduct'
          >
            {{isBasket ? 'В корзине' : 'Купить'}}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ProductCardRecentlyViewed',
})
</script>

<script setup lang="ts">
import { computed, defineProps, PropType} from 'vue'
import {ViewedProductStorage} from '@/types/products'
import useLikeProductsStore from '@/store/likeProducts'
import useBasketStore from '@/store/basketProducts'
import useRecentlyViewedStore from '@/store/recentlyViewed'

const props = defineProps({
  data: {
    type: Object as PropType<ViewedProductStorage>,
    default: () => ({}),
  },
})

const recentlyViewedStore = useRecentlyViewedStore()
const likeProductsStore = useLikeProductsStore()
const basketStore = useBasketStore()

const imgItems = computed(() => {
  return [
    ...(props.data?.images || []),
  ]
})

const likeProducts = () => {
  likeProductsStore.updateLikes(props.data)
}

const isLicked = computed(()=>{
  return likeProductsStore.isLicked(props.data)
})

const isBasket = computed(() => {
  return basketStore.checkProductInBasket(props.data.id)
})

const updateStatusProduct = () => {
  if (!basketStore.checkProductInBasket(props.data.id)) {
    basketStore.addToBasket(props.data.id)
  }
}

const deleteViewed = () => {
  recentlyViewedStore.deleteRecentlyViewed(props.data)
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 240px;
  padding: 14px;
  position: relative;

  &__thumbnail {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 80px;
  }

  &__box-imgs {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__card-img {
    height: 40px;
    width: 80px;

    @media (min-width: 768px) {
      height: 60px;
      width: 100px;
    }

    .img {
      height: 100%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__rating {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__name {
    height: 35px;
    font-size: 18px;
    line-height: 18px;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__desc {
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__stock {
    font-size: 14px;

    span {
      font-weight: 700;
    }
  }

  &__box-price {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__price {
    font-size: 26px;
    font-weight: 600;
    line-height: normal;
    color: map-get($orange, 'lighten-1');
  }

  &__actions {
    display: grid;
    grid-gap: 15px;
    grid-auto-flow: column;

    button {
      text-transform: capitalize;
      font-weight: 600;
    }
  }

  &__action-like {
    min-width: auto;
    width: 36px;
    height: 36px;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 15px;
    z-index: 100;
  }
}
</style>
