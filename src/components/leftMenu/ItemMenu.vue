<template>
  <template
    v-for='(i,k) in menu(items)'
    :key='k'
  >
    <div :id='i.id'>
      <router-link
        v-if='i.to'
        :class='{current: checkActive(i)}'
        :to='i.to?{name:i.to}:""'
      >
        <v-list-item>
          <v-icon
            v-if='i.icon'
            size='24'
          >
            {{ i.icon }}
          </v-icon>
          <v-list-item-title v-if='!isMini'
                             v-html='i.title'/>
        </v-list-item>
      </router-link>

      <v-list-item
        v-else
        :class='{current:checkActive(i)}'
      >
        <v-icon
          v-if='i.icon'
          size='24'
        >
          {{ i.icon }}
        </v-icon>

        <v-list-item-title
          v-if='!isMini'
          v-html='i.title'
        />
      </v-list-item>
    </div>
  </template>

  <v-menu
    v-for='(i,k) in menu(items)'
    :key='k'
    location='end center'
    :open-on-click='!!menu(i.child || []).length'
    :close-on-content-click='false'
    content-class='layer-menu'
    :activator='`#`+i.id'
  >
    <v-list
      v-if='!!menu(i.child || []).length'
      dense
      class='h-100'
    >
      <item-menu
        :items='menu(i.child || [])'
      />
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ItemMenu',
})
</script>

<script setup lang='ts'>
import {defineProps} from 'vue'
import {useRoute} from 'vue-router'
import {IChild, ILeftMenu} from '@/assets/js/resources/leftMenu'

type ItemMenu = ILeftMenu | IChild

interface Props {
  items: ILeftMenu[] | IChild[],
  isMini?: boolean
}

defineProps<Props>()
const route = useRoute()

const menu = (menu: ItemMenu[]) => {
  return menu.sort((a: ItemMenu, b: ItemMenu) => (a.sort && b.sort && a.sort > b.sort) ? 1: -1)
}

const checkActive = (item: ItemMenu): any => {
  if (item.to && item.to === route.name) return true

  if (item.child) {
    return (item.child || []).some((i:any) => {
      return checkActive(i)
    })
  }
}
</script>
