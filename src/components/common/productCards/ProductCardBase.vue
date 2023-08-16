<template>
  <v-card
    class='product'
    @click.stop='emits("showProductDetails")'
  >
    <v-badge
      color='red'
      :content='"-" + Math.ceil(data.discountPercentage) + "%"'
      :disabled='!data.discountPercentage'
      offset-x='35'
      offset-y='15'
      location='bottom left'
    >
      <div class='product__box-thumbnail'>
        <v-img
          class='product__thumbnail'
          :src='data.thumbnail'
        />
      </div>
    </v-badge>

    <div class='product__info'>
      <div class='text-left'>
        <p class='product__brand'>{{data.brand}}</p>
        <p
          class='product__name mb-3'
        >
          {{data.title}}
        </p>
      </div>

      <div class='text-left'>
        <div class='product__rating mb-2'>
          <v-rating
            :model-value='data.rating'
            size='24'
            disabled
            color='orange-lighten-1'
          />
          <p class='mx-2'>{{Number(data.rating.toFixed(1))}}/5</p>
        </div>
        <p class='product__stock'>В наличии: <span>{{data.stock}}</span></p>
      </div>
    </div>

    <div class='product__box-price'>
      <p class='product__price'>{{data.price}} &#36;</p>

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
          :disabled='basketStore.getLoading'
          elevation='0'
          width='120'
          :variant='isBasket ? "elevated" : "outlined"'
          @click.stop='updateStatusProduct'
        >
          {{isBasket ? 'В корзине' : 'Купить'}}
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ProductCardBase',
})
</script>

<script setup lang="ts">
import {computed, PropType} from 'vue'
import useLikeProductsStore from '@/store/likeProducts'
import useBasketStore from '@/store/basketProducts'
import {Product} from '@/types/products'

const emits = defineEmits(['showProductDetails'])

const props = defineProps({
  data: {
    type: Object as PropType<Product>,
    default: () => ({}),
  },
})

const likeProductsStore = useLikeProductsStore()
const basketStore = useBasketStore()

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
</script>

<style lang="scss" scoped>
.product {
  box-shadow: 0 0 25px rgba(0, 0, 0, 8%);
  padding: 20px;
  grid-column-gap: 12px;
  display: grid;

  @media (min-width: 360px) {
    grid-template-rows: 1fr;
    grid-template-columns: auto minmax(0, 1fr);
  }

  @media (min-width: 640px) {
    grid-template-rows: 1fr;
    grid-template-columns: auto minmax(0,1fr) 170px;
  }

  &:hover &__name {
    color: map-get($orange, 'lighten-1');
  }

  &__box-thumbnail {
    width: 100px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 640px) {
      width: 160px;
      height: 140px;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    grid-column: 1 / 3;

    @media (min-width: 360px) {
      grid-column: auto;
    }
  }

  &__brand {
   color: grey;
  }

  &__rating {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__name {
    font-size: 26px;
    line-height: 26px;
    font-weight: 600;
    transition: 0.1s linear;
    cursor: pointer;

    @media (min-width: 640px) {
      font-size: 30px;
      line-height: 30px;
    }

    @media (min-width: 1024px) {
      font-size: 35px;
      line-height: 36px;
    }
  }

  &__stock {
    font-size: 14px;

    span {
      font-weight: 700;
    }
  }

  &__box-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    grid-column: 1 / 3;
    margin-top: 5px;

    @media (min-width: 360px) {
      grid-column: 1 / 3;
      flex-direction: row;
      margin-top: 15px;
    }

    @media (min-width: 640px) {
      grid-column: auto;
      flex-direction: column;
      align-items: flex-end;
      margin-top: 0;
    }
  }

  &__price {
    font-size: 30px;
    font-weight: 600;
    line-height: 35px;
    color: map-get($orange, 'lighten-1');
    margin-bottom: 10px;

    @media (min-width: 360px) {
      margin-bottom: 0;
    }
  }

  &__actions {
    display: grid;
    grid-gap: 15px;
    grid-auto-flow: column;

    button {
      text-transform: initial;
      font-weight: 600;
    }
  }

  &__action-like {
    min-width: auto;
    width: 36px;
    height: 36px;
  }
}
</style>
