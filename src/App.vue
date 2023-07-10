<template>
  <v-app>
    <v-main>
      <component
        :is='layout'
      >
        <router-view v-slot='{ Component, route }'>
          <transition
            name='fade'
            mode='out-in'
          >
            <div
              :key='route.name'
            >
              <component :is='Component' />
            </div>
          </transition>
        </router-view>
      </component>

      <template v-if='layout'>
        <Chat />
        <Footer />
      </template>
    </v-main>

    <notifications
      class='notifications'
      group='app-front'
      position='bottom right'
    />

    <ModalLoginUser
      v-if='openLogin'
    />
  </v-app>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import { useRoute } from 'vue-router'
import { setLocale } from '@vee-validate/i18n'
import Footer from '@/components/footer/Footer.vue'
import Chat from '@/components/chat/Chat.vue'
import ModalLoginUser, {useLoginModal} from '@/components/autch/ModalLoginUser.vue'

import useLikeProductsStore from '@/store/likeProducts'
import useBasketStore from '@/store/basketProducts'

setLocale('ru')

const route = useRoute()
const basketStore = useBasketStore()
const likeProductsStore = useLikeProductsStore()

const openLogin = computed(() => {
  return useLoginModal.getIsOpen()
})

const layout = computed(() => {
  if (!route.name) return ''
  return route.meta?.layout || 'DefaultLayout'
})

likeProductsStore.initLikes()
basketStore.fetchBasketUser()
</script>

<style lang="scss" scoped>
.v-main {
  display: flex;
  flex-direction: column;
}
</style>
