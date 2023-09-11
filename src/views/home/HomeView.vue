<template>
  <ProductBaseLayout
    :breadcrumbs='breadcrumbs'
    :isLoading='isLoading'
    :products='products'
    :show-basket='false'
  >
    <template #prepend>
      <div class='text-left mb-6'>
        <h1 class='mb-3'>Поиск по товарам</h1>

        <v-col
          cols='12'
          sm='6'
          class='pa-0'
        >
          <v-text-field
            v-model='searchText'
            label='Поиск'
            placeholder='Поиск'
            required
            dense
            variant='outlined'
            density='comfortable'
            clearable
            hide-details
          >
            <template #append-inner>
              <v-btn
                icon
                size='30'
                @click='fetchData'
              >
                <v-icon
                  size='25'
                >
                  mdi-magnify
                </v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </div>
    </template>

    <template #pagination>
      <BasePagination
        v-model:perPage='perPage'
        v-model:page='currentPage'
        :page-length-list='pageLengthList'
        :total-count='totalCount'
        class='fragrances__pagination'
      />
    </template>

    <template #append>
      <RecentlyViewed />
    </template>
  </ProductBaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
})
</script>

<script setup lang="ts">
import { computed, ref, Ref, watch } from 'vue'
import { debounceFilter, watchWithFilter } from '@vueuse/core'
import ProductBaseLayout from '~/layouts/ProductPageLayouts/ProductBaseLayout.vue'
import BasePagination from '~/components/pagination/BasePagination.vue'
import RecentlyViewed from '~/components/common/recentlyViewed/RecentlyViewed.vue'

import { IBreadcrumb } from '~/types/breadcrumbs'
import useSearchProductsStore from '@/store/products/searchProducts'
import { Product } from '@/types/products'

const breadcrumbs: IBreadcrumb[] = [{ title: 'Главная' }]

const searchText = ref('')
const searchProductsStore = useSearchProductsStore()

const products = computed((): Product[] => {
  return searchProductsStore.getItems
})

const currentPage = ref(1)
const pageLengthList: Ref<number[]> = ref([5, 10, 15, 50])
const perPage: Ref<number> = ref(pageLengthList.value[0])
const totalCount = computed(() => searchProductsStore.getMeta.total || 0)

const paginateFilter = computed(() => ({
  limit: perPage.value,
  skip: (currentPage.value - 1) * perPage.value,
}))

const allFilters = computed(() => ({
  ...paginateFilter.value,
  q: searchText.value,
}))

const fetchData = () => {
  searchProductsStore.fetchData(allFilters.value)
}
fetchData()

const isLoading = computed(() => {
  return searchProductsStore.getLoading
})

watchWithFilter(
  allFilters,
  async () => {
    await fetchData()
  },
  {
    eventFilter: debounceFilter(300),
  },
)

watch(perPage, () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.home {
  &__pagination {
    flex: 0 0 auto;
    margin-top: auto;
  }
}

.products {
  max-width: 1024px;
  margin: 0 auto;

  :deep &__page-content > * {
    padding: 0;
  }
}

</style>
