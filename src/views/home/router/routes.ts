import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routeNames.home,
    component: () => import('@/views/home/HomeView.vue'),
  },
]

export default routes
