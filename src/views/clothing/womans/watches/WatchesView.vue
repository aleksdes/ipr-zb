<template>
  <ProductBaseLayout
    :breadcrumbs='breadcrumbs'
  >
    <div class='watch h-100'>
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
        class='watch__content pa-3'
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
        >
          <ProductCardDetails
            :data='selectedProduct'
            @close='closeCardDetails'
          />
        </v-dialog>
      </div>

      <BasePagination
        v-model:perPage='perPage'
        v-model:page='currentPage'
        :page-length-list='pageLengthList'
        :total-count='totalCount'
        class='watch__pagination'
      />
    </div>
  </ProductBaseLayout>
</template>

<script lang="ts">
export default {
  name: 'WomanWatchesView',
}
</script>

<script setup lang="ts">
import {computed, onMounted, ref, Ref} from 'vue'
import { debounceFilter, watchWithFilter } from '@vueuse/core'
import ProductBaseLayout from '@/layouts/ProductPageLayouts/ProductBaseLayout.vue'
import BasePagination from '@/components/pagination/BasePagination.vue'
import ProductCardBase from '@/components/common/productCards/ProductCardBase.vue'
import ProductCardDetails from '@/components/common/productCards/ProductCardDetails.vue'
import BaseEmptyData from '@/components/emptyData/BaseEmptyData.vue'
import CircleLoader from '@/components/loader/CircleLoader.vue'

import {productsUrls} from '@/constants/urls'
import {IBreadcrumb} from '@/types/breadcrumbs'
import {routeNames} from '@/router/RouteNames'
import {Product} from '@/types/products'
import useProductsStore from '@/store/products/products'

const breadcrumbs: IBreadcrumb[] = [
  {title: 'Главная', href: routeNames.home},
  {title: 'Одежда'},
  {title: 'Женская'},
  {title: 'Часы'},
]

const productsStore = useProductsStore()

const products = computed((): Product[] => {
  return productsStore.getItems
})

const dialog = ref(false)
const selectedProduct: any = ref(null)
const currentPage = ref(1)
const pageLengthList: Ref<number[]> = ref([5, 10, 15, 50])
const perPage: Ref<number> = ref(pageLengthList.value[0])
const totalCount = computed(() => productsStore.getMeta.total || 0)

const paginateFilter = computed(() => ({
  limit: perPage.value,
  skip: (currentPage.value-1)*perPage.value,
}))

const fetchData = () => productsStore.fetchData(paginateFilter.value, productsUrls.PRODUCTS_CATEGORIES_WOMENSWATCHES_URL)

const isLoading = computed(() => {
  return productsStore.getLoading
})

onMounted(async () => {
  await fetchData()
})

watchWithFilter(
  paginateFilter,
  async () => {
    await fetchData()
  },
  {
    eventFilter: debounceFilter(300),
  },
)

const closeCardDetails = () => {
  dialog.value = false
  selectedProduct.value = null
}
</script>

<style lang="scss" scoped>
.watch {
  display: flex;
  flex-direction: column;

  &__content {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 20px;
  }

  &__pagination {
    flex: 0 0 auto;
    margin-top: auto;
  }
}
</style>
