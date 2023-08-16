<template>
  <template
    v-for='(i, k) in menu(items)'
    :key='k'
  >
    <div :id='i.id'>
      <router-link
        v-if='i.to'
        :class='{ current: checkActive(i) }'
        :to='i.to ? { name: i.to } : ""'
        @click='emits("onClickLink")'
      >
        <v-list-item>
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
      </router-link>

      <v-list-item
        v-else
        :class='{ current: checkActive(i) }'
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
    v-for='(i, k) in menu(items)'
    :key='k'
    v-model='menusActivator[i.id]'
    location='end center'
    :open-on-click='!!menu(i.child || []).length'
    :close-on-content-click='false'
    content-class='layer-menu'
    :activator='`#` + i.id'
  >
    <v-list
      v-if='!!menu(i.child || []).length'
      dense
      class='h-100'
    >
      <item-menu
        :items='menu(i.child || [])'
        :layer='layer + 1'
        @onClickLink='onClickLink(i.id)'
      />
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemMenu',
})
</script>

<script setup lang="ts">
import {PropType, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ILeftMenu } from '@/assets/js/resources/leftMenu'

const props = defineProps({
  items: {
    type: Array as PropType<ILeftMenu[]>,
    default: () => [],
  },
  isMini: {
    type: Boolean,
    default: false,
  },
  layer: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['onClickLink'])
const route = useRoute()
const menusActivator: any = ref({})
const menu = (menu: ILeftMenu[]) => {
  return menu.sort((a: ILeftMenu, b: ILeftMenu) => (a.sort && b.sort && a.sort > b.sort ? 1 : -1))
}

const checkActive = (item: ILeftMenu): any => {
  if (item.to && item.to === route.name) return true

  if (item.child) {
    return (item.child || []).some((i: any) => {
      return checkActive(i)
    })
  }
}

const onClickLink = (id: string) => {
  menusActivator.value[id] = false
  if (props.layer) {
    emits('onClickLink')
  }
}
</script>
