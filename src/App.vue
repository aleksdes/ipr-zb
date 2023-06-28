<template>
  <v-app>
    <v-main>
      <component :is='layout'>
        <router-view v-slot='{ Component, route }'>
          <transition name='fade'
                      mode='out-in'>
            <div :key='route.name'>
              <component :is='Component' />
            </div>
          </transition>
        </router-view>
      </component>

      <Footer />
    </v-main>

    <notifications class='notifications'
                   group='app-front'
                   position='bottom right' />
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { setLocale } from '@vee-validate/i18n'
import useLikeProductsStore from '@/store/likeProducts'
import Footer from '@/components/footer/Footer.vue'
import useUserStore from '@/store/user'
import useBasketStore from '@/store/basketProducts'

setLocale('ru')

const route = useRoute()
const userStore = useUserStore()
const basketStore = useBasketStore()

const layout = computed(() => {
  if (!route.name) return ''
  return route.meta?.layout || 'DefaultLayout'
})

const likeProductsStore = useLikeProductsStore()

likeProductsStore.initLikes()
userStore.$subscribe(async (_, store) => {
  console.log('store.user', store.user)
  if (store.user.id) {
    await basketStore.fetchBasketUser({ url: store.user.id })
  }
})
</script>

<style lang="scss" scoped>
.v-main {
  display: flex;
  flex-direction: column;
}
</style>
