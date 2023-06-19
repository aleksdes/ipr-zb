<template>
  <v-card
    class='product'
    @click.stop='emits("showProductDetails")'
  >
    <div class='product__box-thumbnail'>
      <v-badge
        color='red'
        :content='"-" + Math.ceil(data.discountPercentage) + "%"'
        :disabled='!data.discountPercentage'
        offset-x='35'
        offset-y='15'
        location='bottom left'
      >
        <v-img
          class='product__thumbnail'
          :src='data.thumbnail'
        />
      </v-badge>
    </div>

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
          color='grey-lighten-1'
          variant='outlined'
          class='product__action-like px-0'
        >
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>

        <v-btn
          color='orange-lighten-1'
          class='text-white'
          elevation='0'
          @click.stop='ttt'
        >
          Купить
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'ProductCardBase',
}
</script>

<script setup lang="ts">
import {ref, computed, defineEmits, defineProps, PropType} from 'vue'
import {Product} from '@/types/products'

const emits = defineEmits(['showProductDetails'])

const props = defineProps({
  data: {
    type: Object as PropType<Product>,
    default: () => ({}),
  },
})

const ttt = () => {
  console.log('ttt')
}
</script>

<style lang="scss" scoped>
.product {
  box-shadow: 0 0 25px rgba(0, 0, 0, 8%);
  padding: 20px;
  grid-column-gap: 12px;
  display: grid;
  grid-template-columns: auto minmax(0,1fr) 170px;
  grid-template-rows: 1fr;

  &:hover &__name {
    color: map-get($orange, 'lighten-1');
  }

  &__box-thumbnail {
    width: 160px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__thumbnail {
    width: 160px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
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
    font-size: 35px;
    line-height: 35px;
    font-weight: 600;
    transition: 0.1s linear;
    cursor: pointer;
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
}
</style>
