<template>
  <ProductBaseLayout
    :breadcrumbs='breadcrumbs'
  >
    <div class='electronics h-100'>
      <div class='electronics__content pa-3'>
        <ProductCardBase
          v-for='product in products'
          :key='product.id'
          :data='product'
          @show-product-details='selectedProduct = product; dialog=true'
        />

        <v-dialog
          v-model='dialog'
          width='auto'
        >
          <ProductCardDetails
            :data='selectedProduct'
            @close='dialog=false; selectedProduct=null'
          />
        </v-dialog>

      </div>

      <BasePagination
        v-model:perPage='perPage'
        v-model:page='currentPage'
        :page-length-list='pageLengthList'
        :total-count='totalCount'
        class='electronics__pagination'
      />
    </div>


  </ProductBaseLayout>
</template>

<script lang="ts">
export default {
  name: 'ElectronicsView',
}
</script>

<script setup lang="ts">
import {computed, ref, Ref, onMounted} from 'vue'
import { debounceFilter, watchWithFilter } from '@vueuse/core'
import ProductBaseLayout from '@/layouts/ProductPageLayouts/ProductBaseLayout.vue'
import BasePagination from '@/components/pagination/BasePagination.vue'
import ProductCardBase from '@/components/common/productCards/ProductCardBase.vue'
import ProductCardDetails from '@/components/common/productCards/ProductCardDetails.vue'

import {productsUrls} from '@/constants/urls'
import {IBreadcrumb} from '@/types/breadcrumbs'
import {routeNames} from '@/router/RouteNames'
import useProductsStore from '@/store/products/products'
import {Product} from '@/types/products'

const breadcrumbs: IBreadcrumb[] = [
  {title: 'Главная', href: routeNames.home},
  {title: 'Электроника'},
  {title: 'Смартфоны'},
]

const productsStore = useProductsStore()

const products = computed((): Product[] => {
  return productsStore.getItems
})

const dialog = ref(false)
const selectedProduct: any = null
const currentPage = ref(1)
const pageLengthList: Ref<number[]> = ref([5, 10, 15, 50])
const perPage: Ref<number> = ref(pageLengthList.value[0])
const totalCount = computed(() => productsStore.getMeta.total || 0)

const paginateFilter = computed(() => ({
  limit: perPage.value,
  skip: (currentPage.value-1)*perPage.value,
}))

const fetchData = () => productsStore.fetchData(paginateFilter.value, productsUrls.PRODUCTS_CATEGORIES_SMARTPHONES_URL)

watchWithFilter(
  paginateFilter,
  async () => {
    await fetchData()
  },
  {
    eventFilter: debounceFilter(300),
    immediate: true,
  },

)

</script>

<style lang="scss" scoped>
.electronics {
  display: flex;
  flex-direction: column;

  &__content {
    display: grid;
    grid-auto-flow: row;
    //grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }

  &__pagination {
    flex: 0 0 auto;
    margin-top: auto;
  }
}
</style>
