import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/electronics',
    name: routeNames.electronics,
    component: () => import('@/views/electronics/ElectronicsView.vue'),
  },
]

export default routes
