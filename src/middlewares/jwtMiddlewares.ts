import {Router} from 'vue-router'
import useTokenStore from '@/store/token'
import useUserStore from '@/store/user'

const JWTMiddlewares = (context: { router: Router }) => {
  context.router.beforeEach(async (to: any, _: any, next: any) => {
    const tokenStore = useTokenStore()
    const userStore = useUserStore()

    await tokenStore.updateToken()
    await userStore.setUser()

    return next()
  })
}

export default JWTMiddlewares
