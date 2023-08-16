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
            :is='getNavbarBtn(navBtn.component)'
            :btn-data='navBtn'
            :current-menu-item='currentMenuItem'
            :typeLink='navBtn.typeLink'
            @updateCurrentMenu='clickMenu($event)'
          />
        </template>
      </nav>
    </v-bottom-navigation>

    <teleport
      v-show='showMenu'
      to='body'
    >
      <v-navigation-drawer
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
    </teleport>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'BottomNavbar',
})
</script>

<script setup lang="ts">
import {ref, computed, defineAsyncComponent, Ref} from 'vue'
import {bottomNavbarMenuBtns} from '@/assets/js/resources/navbarMenu'
import {INavbarMenuBtns} from '@/types/navbarMenu'

const heightBottomNavbar = 60
const active = ref(true)
const navMenuBtns = bottomNavbarMenuBtns

const currentMenuItem: Ref<INavbarMenuBtns | null> = ref(null)
const showMenu = ref(false)

const componentMenu = computed(() => {
  const nameComponent: string = currentMenuItem.value && currentMenuItem.value?.actionMenu ? currentMenuItem.value.actionMenu : ''
  if (!nameComponent) return null
  return defineAsyncComponent(() => import('@/components/navbar/navbarMenu/navbarMenuComponents/' + nameComponent + '.vue'))
})

const styleMenuSettings = computed(() => {
  return {
    height: '100%',
    top: 0,
    zIndex: 1020,
    width: '100%',
  }
})

const getNavbarBtn = (name: string) => {
  return defineAsyncComponent(() => import('@/components/navbar/navbarMenu/navbarActionBtns/' + name + '.vue'))
}

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
