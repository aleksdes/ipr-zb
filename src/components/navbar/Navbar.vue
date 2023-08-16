<template>
  <div v-click-outside='onCloseMenu'>
    <v-app-bar
      id='app-bar'
      :height='heightNavbar'
      color='white'
      class='app-navbar'
    >
      <div class='app-navbar__logo'>
        <router-link :to='{name: routeNames.home}'>
          <v-img
            :src='require("@/assets/img/logotype.svg")'
            width='130'
          />
        </router-link>
      </div>

      <nav
        v-if='displayWidth>768'
        class='app-navbar__navs'
      >
        <template
          v-for='navBtn in navMenuBtns'
          :key='navBtn.id'
        >
          <component
            :is='getNavbarBtn(navBtn.component)'
            :btn-data='navBtn'
            :current-menu-item='currentMenuItem'
            @updateCurrentMenu='clickMenu($event)'
          />
        </template>
      </nav>

      <v-app-bar-nav-icon
        v-if='displayWidth<=1024'
        size='40'
        class='ma-0 ml-3'
        @click.stop='leftMenuStore.openMenu()'
      />
    </v-app-bar>

    <v-navigation-drawer
      v-model='showMenu'
      permanent
      fixed
      location='right'
      :style='styleMenuSettings'
      class='navbar-settings'
    >
      <component
        :is='componentMenu'
        @onClose='onCloseMenu()'
      />
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent ({
  name: 'Navbar',
})
</script>

<script setup lang="ts">
import {ref, computed, defineAsyncComponent} from 'vue'
import { useDisplay } from 'vuetify'
import {INavbarMenuBtns} from '@/types/navbarMenu'
import {navbarMenuBtns} from '@/assets/js/resources/navbarMenu'
import {useLeftMenu} from '@/components/leftMenu/LeftMenu.vue'
import {routeNames} from '@/router/RouteNames'

const leftMenuStore = useLeftMenu
const heightNavbar = 60
const currentMenuItem = ref<INavbarMenuBtns | null>(null)
const showMenu = ref(false)
const navMenuBtns = navbarMenuBtns
const { width: displayWidth } = useDisplay()

const componentMenu = computed(() => {
  const nameComponent: string = currentMenuItem.value && currentMenuItem.value?.actionMenu? currentMenuItem.value.actionMenu : ''
  if (!nameComponent) return null
  return defineAsyncComponent(() => import('@/components/navbar/navbarMenu/navbarMenuComponents/' + nameComponent + '.vue'))
})

const styleMenuSettings = computed(() => {
  return {
    height: `calc(100% - ${heightNavbar + 'px'})`,
    top: heightNavbar + 'px',
    width: widthDrawer.value,
  }
})

const getNavbarBtn = (name: string) => {
  return defineAsyncComponent(() => import('@/components/navbar/navbarMenu/navbarActionBtns/' + name + '.vue'))
}

const widthDrawer = computed(() => {
  return displayWidth.value <= 500 ? '100%' : 'auto'
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

<style lang="scss" scoped>
.app-navbar {
  :deep .v-toolbar__content {
    padding: 4px 16px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__navs {
    display: grid;
    grid-auto-flow: column;
    gap: 20px;
    align-items: center;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }
}

#app-bar {
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 8%);
}

.slide-fade-enter-active {
  opacity: 0;
  transition: 0.3s ease-out;
  transform: translateX(10%) !important;
}

.slide-fade-leave-active {
  transition: 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50%) !important;
  opacity: 0;
}
</style>
