import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/jewelry',
    name: routeNames.jewelry,
    component: () => import('@/views/products/jewelry/JewelryView.vue'),
  },
]

export default routes
