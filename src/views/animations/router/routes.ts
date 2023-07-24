import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/animations',
    name: routeNames.animations,
    component: () => import('@/views/animations/AnimationsView.vue'),
  },
]

export default routes
