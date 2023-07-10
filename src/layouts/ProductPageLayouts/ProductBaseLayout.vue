<template>
  <div class='products pa-3 h-100'>
    <Breadcrumbs
      :part='props.breadcrumbs'
      class='mb-2'
    />

    <div class='products__page-content h-100 w-100'>
      <v-col
        :cols='12'
        :md='showBasket ? 8 : 12'
        :lg='showBasket ? 9 : 12'
        class='pa-2'
      >
        <div class='products__box-list h-100'>
          <slot name='content'>
            <div
              v-if='isLoading'
              class='d-flex flex-row w-100 mt-8'
            >
              <v-spacer />
              <CircleLoader
                size='100'
              />
              <v-spacer />
            </div>

            <BaseEmptyData
              v-else-if='!products.length'
              class='mt-8'
            />

            <div
              v-else
              class='products__list'
            >
              <ProductCardBase
                v-for='product in products'
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
          </slot>

          <slot name='pagination'/>
        </div>
      </v-col>

      <v-col
        v-if='showBasket'
        cols='4'
        lg='3'
        class='pa-2 d-none d-md-block'
      >
        <BasketCard/>
      </v-col>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ProductBaseLayout',
})
</script>

<script setup lang="ts">
import {defineProps, PropType, ref} from 'vue'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs.vue'
import BasketCard from '@/components/common/basketCards/BasketCard.vue'
import {IBreadcrumb} from '@/types/breadcrumbs'
import BaseEmptyData from '@/components/emptyData/BaseEmptyData.vue'
import ProductCardDetails from '@/components/common/productCards/ProductCardDetails.vue'
import ProductCardBase from '@/components/common/productCards/ProductCardBase.vue'
import CircleLoader from '@/components/loader/CircleLoader.vue'
import {Product} from '@/types/products'
import { useDisplay } from 'vuetify'

const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<IBreadcrumb[]>,
    default: ()=>([]),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  products: {
    type: Array as PropType<Product[]>,
    default: ()=>([]),
  },
  showBasket: {
    type: Boolean,
    default: true,
  },
})

const dialog = ref(false)
const selectedProduct: any = ref(null)
const closeCardDetails = () => {
  dialog.value = false
  selectedProduct.value = null
}

const { width } = useDisplay()
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-direction: column;

  &__page-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__box-list {
    display: flex;
    flex-direction: column;
  }

  &__list {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 20px;
  }
}
</style>
