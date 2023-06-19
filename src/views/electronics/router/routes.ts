import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/electronics/smartphones',
    name: routeNames.electronics.smartphones,
    component: () => import('@/views/electronics/smartphones/SmartphonesView.vue'),
  },
  {
    path: '/electronics/laptops',
    name: routeNames.electronics.laptops,
    component: () => import('@/views/electronics/laptops/LaptopsView.vue'),
  },
]

export default routes
