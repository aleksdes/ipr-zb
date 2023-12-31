<template>
  <v-card
    class='product'
  >
    <v-btn
      icon='mdi-close'
      size='xs-small'
      class='product__close bg-white'
      elevation='0'
      @click='emits("close")'
    />

    <div class='product__box-imgs'>
      <v-card
        outlined
        color='transparent'
        elevation='0'
        class='product__thumbnail mb-3'
        max-height='300'
      >
        <v-img
          class='product__thumbnail'
          :src='imgItems[activeItem]'
        />
      </v-card>

      <div class='product__box-previews'>
        <div class='product__previews pb-4'>
          <v-card
            v-for='(item, key) in imgItems || []'
            :key='key'
            outlined
            class='product__card-img'
            color='transparent'
            elevation='0'
            @click='activeItem = key'
          >
            <v-img
              :src='item'
              cover
              :class='{active: activeItem === key}'
              class='flex-grow-1 text-center img'
            />
          </v-card>
        </div>
      </div>
    </div>

    <div class='product__info'>
      <div>
        <div class='text-left'>
          <p class='product__brand text-grey-darken-1'>{{data.brand}}</p>
          <p class='product__name mb-4'>{{data.title}}</p>
        </div>

        <div class='product__box-desc mb-3 mb-sm-6'>
          <p class='product__desc-title text-grey-darken-1'>Описание</p>
          <p class='product__desc'>{{data.description || '='}}</p>
        </div>

        <div class='text-left mb-4'>
          <v-badge
            color='red'
            :content='"-" + Math.ceil(data.discountPercentage) + "%"'
            :disabled='!data.discountPercentage'
            inline=''
          />
          <div class='product__rating my-2'>
            <v-rating
              :model-value='data.rating'
              size='24'
              disabled
              color='orange-lighten-1'
            />
            <p class='mx-2'>{{Number(data.rating.toFixed(1))}}/5</p>
          </div>
          <p class='product__stock'>В наличии: <span>{{data.stock || 0}}</span></p>
        </div>
      </div>

      <div class='product__box-price'>
        <p class='product__price mb-4'>{{data.price}} &#36;</p>

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
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ProductCardDetails',
})
</script>

<script setup lang="ts">
import {ref, computed, PropType, onMounted} from 'vue'
import {Product} from '@/types/products'
import useLikeProductsStore from '@/store/likeProducts'
import useBasketStore from '@/store/basketProducts'
import useRecentlyViewedStore from '@/store/recentlyViewed'

const emits = defineEmits(['close'])

const props = defineProps({
  data: {
    type: Object as PropType<Product>,
    default: () => ({}),
  },
})

const viewedStore = useRecentlyViewedStore()
const likeProductsStore = useLikeProductsStore()
const basketStore = useBasketStore()

const activeItem = ref(0)
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

onMounted(() => {
  viewedStore.addRecentlyViewed(props.data)
})
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  max-width: 800px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 8%);
  padding: 20px;
  grid-column-gap: 25px;
  display: grid !important;
  grid-template-columns: 1fr;
  position: relative;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  &__thumbnail {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 150px;
    width: 100%;

    @media (min-width: 768px) {
      height: 300px;
    }
  }

  &__box-imgs {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__box-previews {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-gap: 15px;
    width: inherit;
  }

  &__previews {
    grid-column: 1 / 5;
    overflow-x: overlay;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 8px;
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
    font-size: 28px;
    line-height: 28px;
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: 35px;
      line-height: 35px;
    }
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
    font-size: 30px;
    font-weight: 600;
    line-height: 35px;
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
    top: 15px;
    right: 15px;
    z-index: 100;
  }
}
</style>
