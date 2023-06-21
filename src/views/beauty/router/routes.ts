import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/beauty/fragrances',
    name: routeNames.beauty.fragrances,
    component: () => import('@/views/beauty/fragrances/FragrancesView.vue'),
  },
  {
    path: '/beauty/skincare',
    name: routeNames.beauty.skincare,
    component: () => import('@/views/beauty/skincare/SkincareView.vue'),
  },
  {
    path: '/beauty/sunglasses',
    name: routeNames.beauty.sunglasses,
    component: () => import('@/views/beauty/sunglasses/SunglassesView.vue'),
  },
]

export default routes
