import {createRouter, createWebHistory} from 'vue-router'
import paths from '@/router/routes'

const router = createRouter({
  linkActiveClass: 'active',
  routes: paths,
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition): any {
    if (to.name === from.name) {
      return false
    }
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
})

export { router }
