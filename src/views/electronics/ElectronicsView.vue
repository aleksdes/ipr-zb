<template>
  <div class='py-3'>
    <Breadcrumbs
      :part='breadcrumbs'
      class='mb-2'
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ElectronicsView',
}
</script>

<script setup lang="ts">
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs.vue'
import {IBreadcrumb} from '@/types/breadcrumbs'
import {routeNames} from '@/router/RouteNames'

const breadcrumbs: IBreadcrumb[] = [
  {title: 'Главная', href: routeNames.home},
  {title: 'Электроника'},
]
</script>
