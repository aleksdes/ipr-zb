import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: routeNames.profile,
    component: () => import('@/views/profile/ProfileView.vue'),
  },
]

export default routes
