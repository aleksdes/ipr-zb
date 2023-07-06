<template>
  <div>
    <v-bottom-navigation
      :active='active'
      color='light-blue-lighten-1'
      :height='heightBottomNavbar'
      class='bottom-navbar'
    >
      <nav class='bottom-navbar__navs'>
        <template
          v-for='navBtn in navMenuBtns'
          :key='navBtn.id'
        >
          <component
            :is='navBtn.component'
            :btn-data='navBtn'
            :current-menu-item='currentMenuItem'
            :typeLink='navBtn.typeLink'
            @updateCurrentMenu='clickMenu($event)'
          />
        </template>
      </nav>
    </v-bottom-navigation>

    <v-navigation-drawer
      v-show='showMenu'
      :permanent='showMenu'
      touchless
      fixed
      location='bottom'
      :style='styleMenuSettings'
    >
      <component
        :is='componentMenu'
        @onClose='onCloseMenu()'
      />
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BottomNavbar',
}
</script>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {bottomNavbarMenuBtns} from '@/assets/js/resources/navbarMenu'
import {INavbarMenuBtns} from '@/types/navbarMenu'

const heightBottomNavbar = 60
const active = ref(true)
const navMenuBtns = bottomNavbarMenuBtns

const currentMenuItem: any = ref<INavbarMenuBtns | null >(null)
const showMenu = ref(false)
const componentMenu = computed(() => {
  return currentMenuItem.value ? currentMenuItem.value?.actionMenu : ''
})

const styleMenuSettings = computed(() => {
  return {
    height: '100%',
    top: 0,
    zIndex: 1020,
    width: '100%',
  }
})

const clickMenu = (item: INavbarMenuBtns) => {
  if (showMenu.value && currentMenuItem.value && item.actionMenu === currentMenuItem.value.actionMenu) {
    showMenu.value = false
    setCurrentMenuItem(null)
    return
  }
  showMenu.value = true
  setCurrentMenuItem(showMenu.value ? item : null)
}
const setCurrentMenuItem = (item: INavbarMenuBtns | null) => {
  currentMenuItem.value = item
}
const onCloseMenu: () => void = (): void => {
  setCurrentMenuItem(null)
  showMenu.value = false
}
</script>

<style scoped lang="scss">
.bottom-navbar {
  &__navs {
    display: grid;
    grid-auto-flow: column;
    gap: 40px;
    align-items: center;
  }
}
</style>
