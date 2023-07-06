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

      <!--      <div style=' position: sticky;bottom: 0; top: 0; min-height: 2em; background: red; z-index: 10000000'>fdgh5g64ergvrt5455433</div>-->

      <Footer
        v-if='layout'
      />
    </v-main>

    <notifications
      class='notifications'
      group='app-front'
      position='bottom right'
    />
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { setLocale } from '@vee-validate/i18n'
import useLikeProductsStore from '@/store/likeProducts'
import Footer from '@/components/footer/Footer.vue'
import useBasketStore from '@/store/basketProducts'

setLocale('ru')

const route = useRoute()
const basketStore = useBasketStore()
const likeProductsStore = useLikeProductsStore()

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
