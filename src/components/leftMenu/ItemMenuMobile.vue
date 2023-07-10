<template>
  <v-list-group
    v-for='(item, itemIndex) in menu(items)'
    :key='itemIndex'
    :append-icon='(item.child || []).length ? "mdi-chevron-down": ""'
    :value='item.id'
    :class='{"current": checkActive(item)}'
  >
    <template v-slot:activator='{ props }'>
      <v-list-item
        v-if='item.to'
        :prepend-icon='item?.icon || ""'
        append-icon=''
      >
        <router-link
          :to='item.to?{name:item.to}:""'
        >
          <v-list-item-title v-html='item.title' />
        </router-link>
      </v-list-item>


      <v-list-item
        v-else
        :prepend-icon='item?.icon || ""'
        v-bind='props'
      >
        <v-list-item-title
          v-html='item.title'
        />
      </v-list-item>
    </template>

    <v-list
      v-if='!!menu(item.child || []).length'
      class='ml-7'
    >
      <item-menu-mobile
        v-if='!!menu(item.child || []).length'
        :items='menu(item.child || [])'
      />

      <v-list-item
        v-for='(child, childIndex) in menu(item.child || [])'
        v-else
        :key='childIndex'
        :prepend-icon='child?.icon || ""'
      >
        <router-link
          v-if='child.to'
          :to='child.to?{name: child.to}:""'
          class='d-flex'
        >
          <v-icon v-if='child.icon'>{{ child.icon }}</v-icon>
          <v-list-item-title v-text='child.title' />
        </router-link>
      </v-list-item>
    </v-list>

  </v-list-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ItemMenuMobile',
})
</script>

<script setup lang='ts'>
import {defineProps, PropType} from 'vue'
import {useRoute} from 'vue-router'
import {IChild, ILeftMenu} from '@/assets/js/resources/leftMenu'

type ItemMenu = ILeftMenu | IChild

const props = defineProps({
  items: {
    type: Array as PropType<ItemMenu[]>,
    default: () => ([]),
  },
})
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
