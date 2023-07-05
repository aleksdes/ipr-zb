<template>
  <ProductBaseLayout
    :breadcrumbs='breadcrumbs'
    :isLoading='isLoading'
    :products='products'
  >
    <template #pagination>
      <BasePagination
        v-model:perPage='perPage'
        v-model:page='currentPage'
        :page-length-list='pageLengthList'
        :total-count='totalCount'
        class='laptops__pagination'
      />
    </template>
  </ProductBaseLayout>
</template>

<script lang="ts">
export default {
  name: 'Laptops',
}
</script>

<script setup lang="ts">
import {computed, onMounted, ref, Ref} from 'vue'
import { debounceFilter, watchWithFilter } from '@vueuse/core'
import ProductBaseLayout from '@/layouts/ProductPageLayouts/ProductBaseLayout.vue'
import BasePagination from '@/components/pagination/BasePagination.vue'

import {productsUrls} from '@/constants/urls'
import {IBreadcrumb} from '@/types/breadcrumbs'
import {routeNames} from '@/router/RouteNames'
import {Product} from '@/types/products'
import useProductsStore from '@/store/products/products'

const breadcrumbs: IBreadcrumb[] = [
  {title: 'Главная', href: routeNames.home},
  {title: 'Электроника'},
  {title: 'Ноутбуки'},
]

const productsStore = useProductsStore()

const products = computed((): Product[] => {
  return productsStore.getItems
})

const currentPage = ref(1)
const pageLengthList: Ref<number[]> = ref([5, 10, 15, 50])
const perPage: Ref<number> = ref(pageLengthList.value[0])
const totalCount = computed(() => productsStore.getMeta.total || 0)

const paginateFilter = computed(() => ({
  limit: perPage.value,
  skip: (currentPage.value-1)*perPage.value,
}))

const fetchData = () => productsStore.fetchData(paginateFilter.value, productsUrls.PRODUCTS_CATEGORIES_LAPTOPS_URL)

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
</script>

<style lang="scss" scoped>
.laptops {
  display: flex;
  flex-direction: column;

  &__pagination {
    flex: 0 0 auto;
    margin-top: auto;
  }
}
</style>
