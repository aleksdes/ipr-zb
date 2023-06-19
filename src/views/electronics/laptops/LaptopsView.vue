<template>
  <ProductBaseLayout
    :breadcrumbs='breadcrumbs'
  >
    <div class='electronics h-100'>
      <div class='electronics__content pa-3'>
        <ProductCardBase
          v-for='product in getProductsView'
          :key='product.id'
          :data='product'
        />
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
import ProductBaseLayout from '@/layouts/ProductPageLayouts/ProductBaseLayout.vue'
import BasePagination from '@/components/pagination/BasePagination.vue'
import ProductCardBase from '@/components/common/productCards/ProductCardBase.vue'

import {IBreadcrumb} from '@/types/breadcrumbs'
import {routeNames} from '@/router/RouteNames'
import useProductsStore from '@/store/products/products'
import {Product} from '@/types/products'

const breadcrumbs: IBreadcrumb[] = [
  {title: 'Главная', href: routeNames.home},
  {title: 'Электроника'},
]

const productsStore = useProductsStore()

onMounted(async () => {
  await productsStore.fetchData('/category/smartphones')
})

const products = computed((): Product[] => {
  return productsStore.getItems
})

const currentPage = ref(1)
const pageLengthList: Ref<number[]> = ref([4, 6, 12, 36])
const perPage: Ref<number> = ref(pageLengthList.value[0])
const totalCount = computed(() => products.value.length)

const getProductsView = computed((): Product[] => {
  return products.value.slice((currentPage.value-1)*perPage.value, (currentPage.value-1)*perPage.value + perPage.value)
})

</script>

<style lang="scss" scoped>
.electronics {
  display: flex;
  flex-direction: column;

  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  &__pagination {
    flex: 0 0 auto;
    margin-top: auto;
  }
}
</style>
