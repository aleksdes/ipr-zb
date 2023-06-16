<template>
  <div class='electronics py-3 h-100'>
    <Breadcrumbs
      :part='breadcrumbs'
      class='mb-2'
    />

    <div class='electronics__content h-100'>
      <p>sdsdvs</p>
    </div>

    <BasePagination
      v-model:perPage='perPage'
      v-model:page='currentPage'
      :page-length-list='pageLengthList'
      :total-count='totalCount'
      class='electronics__pagination'
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ElectronicsView',
}
</script>

<script setup lang="ts">
import {ref, Ref} from 'vue'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs.vue'
import {IBreadcrumb} from '@/types/breadcrumbs'
import {routeNames} from '@/router/RouteNames'
import BasePagination from '@/components/pagination/BasePagination.vue'

const breadcrumbs: IBreadcrumb[] = [
  {title: 'Главная', href: routeNames.home},
  {title: 'Электроника'},
]

const currentPage = ref(1)
const pageLengthList: Ref<number[]> = ref([5, 10, 50, 100])
const perPage: Ref<number> = ref(pageLengthList.value[0])
const totalCount = ref(10)
</script>

<style lang="scss" scoped>
.electronics {
  display: flex;
  flex-direction: column;

  &__pagination {
    flex: 0 0 auto;
  }
}
</style>
