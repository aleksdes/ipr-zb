<template>
  <div
    class='product'
  >
    <div class='d-flex flex-row align-center'>
      <div
        class='product__box-thumbnail d-flex'
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
      </div>
    </div>

    <div
      class='d-flex flex-row align-center'
    >
      <p class='product__price'>{{data.price}} &#36;</p>

      <v-btn
        v-if='showDelete'
        size='30'
        icon
        class='ml-4'
        @click='emits("delete", data.id)'
      >
        <v-icon size='16'>mdi-trash-can-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, PropType} from 'vue'
import {Product} from '@/types/products'

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

const emits = defineEmits(['delete'])

</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: minmax(0, 350px) auto;
  align-items: center;
  justify-content: space-between;
  grid-column-gap: 15px;

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
  }
}
</style>
