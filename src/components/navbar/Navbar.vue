<template>
  <div v-click-outside='onCloseMenu'>
    <v-app-bar
      id='app-bar'
      :height='heightNavbar'
      color='white'
      class='app-navbar'
    >
      <v-app-bar-nav-icon
        class='d-lg-none ma-0'
        @click.stop='leftMenuStore.openMenu()'
      />

      <div class='app-navbar__logo'>
        <v-img
          :src='require("@/assets/img/logotype.svg")'
          width='130'
        />
      </div>

      <nav class='app-navbar__navs'>
        <template
          v-for='navBtn in navMenuBtns'
          :key='navBtn.id'
        >
          <component
            :is='navBtn.component'
            :btn-data='navBtn'
            :current-menu-item='currentMenuItem'
            @updateCurrentMenu='clickMenu($event)'
          />
        </template>
      </nav>
    </v-app-bar>

    <v-navigation-drawer
      v-if='showMenu'
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
export default  {
  name: 'Navbar',
}
</script>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {INavbarMenuBtns} from '@/types/navbarMenu'
import { useDisplay } from 'vuetify'
import {navbarMenuBtns} from '@/assets/js/resources/navbarMenu'
import {useLeftMenu} from '@/components/leftMenu/LeftMenu.vue'

const leftMenuStore = useLeftMenu
const heightNavbar = 60
const currentMenuItem: any = ref<INavbarMenuBtns | null >(null)
const showMenu = ref(false)
const navMenuBtns = navbarMenuBtns
const { width: displayWidth } = useDisplay()

const componentMenu = computed(() => {
  return currentMenuItem.value ? currentMenuItem.value?.actionMenu : ''
})

const styleMenuSettings = computed(() => {
  return {
    height: `calc(100% - ${heightNavbar + 'px'})`,
    top: heightNavbar + 'px',
    width: widthDrawer.value,
  }
})

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
    gap: 10px;

    //@media #{map-get($display-breakpoints, 'sm-and-down')} {
    //  gap: 10px;
    //}
  }
}

#app-bar {
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 3%);
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
