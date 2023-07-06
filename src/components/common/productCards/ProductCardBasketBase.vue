<template>
  <v-card
    class='product'
    @click.stop='emits("showProductDetails")'
  >
    <div class='product__box-info d-flex flex-row'>
      <div
        class='product__box-thumbnail d-flex align-center'
        :class='{"product__box-thumbnail--empty": !data.thumbnail}'
      >
        <v-img
          v-if='data.thumbnail'
          class='product__thumbnail'
          :src='data.thumbnail'
        />
        <v-icon
          v-else
          size='35'
        >
          mdi-image-frame
        </v-icon>
      </div>

      <div class='product__info'>
        <div class='text-left'>
          <p class='product__brand'>{{data.brand}}</p>
          <p
            class='product__name'
          >
            {{data.title}}
          </p>
          <p class='product__desc'>{{data.description}}</p>
        </div>

        <div class='my-3'>
          <v-btn
            size='30'
            icon
            :color='isLicked ? "orange-lighten-1" : ""'
            variant='outlined'
            class='product__action-like px-0'
            @click.stop='likeProducts'
          >
            <v-icon size='16'>mdi-heart-outline</v-icon>
          </v-btn>

          <v-btn
            v-if='showDelete'
            size='30'
            icon
            class='ml-4'
            variant='outlined'
            @click.stop='basketStore.clearProductBasket(data.id)'
          >
            <v-icon size='16'>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <div class='product__amount'>
      <v-btn
        size='20'
        variant='outlined'
        class='px-0'
        color='grey'
        @click.stop='basketStore.deleteToBasket(data.id)'
      >
        <v-icon size='12'>mdi-minus</v-icon>
      </v-btn>

      <p class='text-center'>{{amountProduct}}</p>

      <v-btn
        size='20'
        variant='outlined'
        class='px-0'
        color='grey'
        @click.stop='basketStore.addToBasket(data.id)'
      >
        <v-icon size='12'>mdi-plus</v-icon>
      </v-btn>
    </div>

    <p class='product__price ml-auto'>{{data.price}} &#36;</p>
  </v-card>
</template>

<script setup lang="ts">
import {computed, defineProps, PropType, defineEmits} from 'vue'
import {BasketProduct, Product} from '@/types/products'
import useLikeProductsStore from '@/store/likeProducts'
import useBasketStore from '@/store/basketProducts'

const props = defineProps({
  data: {
    type: Object as PropType<Product>,
    default: ()=>({}),
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['showProductDetails'])
const basketStore = useBasketStore()
const likeProductsStore = useLikeProductsStore()

const likeProducts = () => {
  likeProductsStore.updateLikes(props.data)
}

const isLicked = computed(()=>{
  return likeProductsStore.isLicked(props.data)
})

const amountProduct = computed(()=>{
  const findProduct: BasketProduct | undefined = basketStore.getBasketProducts.find((item: BasketProduct) => item.data.id === props.data.id)
  if (findProduct !== undefined) {
    return findProduct.quantity
  } else return 0
})
</script>

<style lang="scss" scoped>
.product {
  box-shadow: 0 0 14px rgba(0, 0, 0, 10%);
  padding: 15px;
  border-radius: 8px;
  text-align: initial;
  display: grid;
  grid-template-columns: auto;
  align-items: flex-start;
  justify-content: space-between;
  grid-column-gap: 15px;

  @media (min-width: 570px) {
    grid-template-columns: minmax(0, 500px) auto 70px;
  }

  &__box-info {
    grid-column: 1 / 3;

    @media (min-width: 570px) {
      grid-column: auto;
    }
  }

  &__box-thumbnail {
    min-width: 60px;
    height: 60px;
    width: 60px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 10px;

    @media (min-width: 375px) {
      min-width: 130px;
      height: 100px;
      width: 130px;
      margin-right: 20px;
    }

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

  &__amount {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid grey;
    align-items: center;
    grid-column: 1 / 2;
    margin-right: auto;

    @media (min-width: 570px) {
      grid-column: auto;
    }
  }

  &__price {
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    color: map-get($orange, 'lighten-1');
    grid-column: 2 / 3;
    margin: auto 0;

    @media (min-width: 570px) {
      grid-column: auto;
      margin: 0;
    }
  }
}
</style>
