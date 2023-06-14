import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/clothing/mens',
    name: routeNames.clothing.mens,
    component: () => import('@/views/clothing/mens/ClothingMens.vue'),
  },
  {
    path: '/clothing/womans',
    name: routeNames.clothing.woman,
    component: () => import('@/views/clothing/womans/ClothingWomans.vue'),
  },
]

export default routes
