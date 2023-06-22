<template>
  <v-app>
    <v-main>
      <component :is='layout'>
        <router-view v-slot='{ Component, route }'>
          <transition
            name='fade'
            mode='out-in'
          >
            <div :key='route.name'>
              <component :is='Component'/>
            </div>
          </transition>
        </router-view>
      </component>
    </v-main>

    <notifications
      class='notifications'
      group='app-front'
      position='bottom right'
    />
  </v-app>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import {useRoute} from 'vue-router'
import {setLocale} from '@vee-validate/i18n'

setLocale('ru')

const route = useRoute()

const layout = computed(() => {
  if (!route.name) return ''
  return route.meta?.layout || 'DefaultLayout'
})
</script>
