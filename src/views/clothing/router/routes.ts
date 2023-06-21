import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/clothing/mens/shoes',
    name: routeNames.clothing.mens.shoes,
    component: () => import('@/views/clothing/mens/shoes/ShoesView.vue'),
  },
  {
    path: '/clothing/mens/shirts',
    name: routeNames.clothing.mens.shirts,
    component: () => import('@/views/clothing/mens/shirts/ShirtsView.vue'),
  },
  {
    path: '/clothing/mens/watches',
    name: routeNames.clothing.mens.watches,
    component: () => import('@/views/clothing/mens/watches/WatchesView.vue'),
  },

  {
    path: '/clothing/womans/dresses',
    name: routeNames.clothing.woman.dresses,
    component: () => import('@/views/clothing/womans/dresses/DressesView.vue'),
  },
  {
    path: '/clothing/womans/shoes',
    name: routeNames.clothing.woman.shoes,
    component: () => import('@/views/clothing/womans/shoes/ShoesView.vue'),
  },
  {
    path: '/clothing/womans/bags',
    name: routeNames.clothing.woman.bags,
    component: () => import('@/views/clothing/womans/bags/BagsView.vue'),
  },
  {
    path: '/clothing/womans/watches',
    name: routeNames.clothing.woman.watches,
    component: () => import('@/views/clothing/womans/watches/WatchesView.vue'),
  },
]

export default routes
