<template>
  <v-card
    class='product'
  >
    <div class='d-flex flex-row align-start'>
      <div class='product__box-selected'>
        <v-checkbox
          :model-value='modelValue'
          :value='data.id'
          hide-details
          density='comfortable'
          color='orange-lighten-1'
          @update:model-value='emits("update:modelValue", $event)'
        />
      </div>

      <div
        class='product__box-thumbnail d-flex align-center'
        :class='{"product__box-thumbnail--empty": !data.thumbnail}'
      >
        <v-img
          v-if='data.thumbnail'
          class='product__thumbnail'
          cover
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
      </div>
    </div>

    <div class='product__box-actions text-right h-100'>
      <p class='product__price mb-4'>{{data.price}} &#36;</p>

      <div>
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
          :color='isBasket ? "orange-lighten-1" : "grey-lighten-1"'
          class='text-white text-initial fw-6 ml-3'
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

<script setup lang="ts">
import {computed, defineProps, defineEmits, PropType} from 'vue'
import {Product} from '@/types/products'
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
  modelValue: {
    type: Array,
    default: ()=>([]),
  },
})

const emits = defineEmits(['update:modelValue'])
const basketStore = useBasketStore()
const likeProductsStore = useLikeProductsStore()

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
  box-shadow: 0 0 14px rgba(0, 0, 0, 10%);
  padding: 15px;
  border-radius: 8px;
  text-align: initial;
  display: grid;
  grid-template-columns: minmax(0, 500px) auto;
  align-items: flex-start;
  justify-content: space-between;
  grid-column-gap: 15px;

  &__box-selected {
    & > * {
      width: 40px;
    }
  }

  &__box-thumbnail {
    min-width: 60px;
    height: 60px;
    width: 60px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 10px;

    @media (min-width: 768px) {
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

  &__price {
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    color: map-get($orange, 'lighten-1');
  }

  &__box-actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  :deep .v-checkbox .v-selection-control {
    min-height: 0;
  }
}
</style>
