<template>
  <div>
    <v-navigation-drawer
      v-if='!isMobile'
      v-model='showMenu'
      :width='230'
      :rail-width='95'
      :rail='mini'
      permanent
      class='left-menu'
    >
      <v-list
        nav
        dense
        class='scroll'
      >
        <item-menu
          :items='menuItems'
          :is-mini='mini'
        />
      </v-list>

      <v-list
        nav
        class='toogle-block'
      >
        <router-link
          :to='{name: routeNames.animations}'
        >
          <v-list-item
            class='left-menu__page-animations'
          >
            <v-icon
              size='24'
              class
            >
              mdi-animation-play
            </v-icon>
            <v-list-item-title v-if='!mini'>Анимации</v-list-item-title>
          </v-list-item>
        </router-link>

        <v-list-item @click='onToggleMenu'>
          <v-icon
            size='24'
            :style='{transform: mini ? "rotate(180deg)" : "rotate(0deg)"}'
          >
            mdi-arrow-left
          </v-icon>
          <v-list-item-title v-if='!mini'>Свернуть</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-else
      v-model='drawer'
      fixed
      location='bottom'
      temporary
      :touchless='true'
      class='left-menu--mobile'
    >
      <v-list dense>
        <item-menu-mobile :items='menuItems' />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang='ts'>
import {ref, computed, reactive, defineComponent} from 'vue'
import menuItems from '@/assets/js/resources/leftMenu'
import ItemMenu from './ItemMenu.vue'
import ItemMenuMobile from './ItemMenuMobile.vue'
import { useDisplay } from 'vuetify'
import {routeNames} from '@/router/RouteNames'

export const useLeftMenu = reactive({
  openMenu() {
    this.state.drawer = !this.state.drawer
  },

  state: {
    drawer: false,
  },
})

export default defineComponent({
  name: 'LeftMenu',

  components: {
    ItemMenu,
    ItemMenuMobile,
  },

  setup() {
    const { width: displayWidth } = useDisplay()
    const showMenu = ref(true)
    const mini = ref(true)
    const leftMenuStore = useLeftMenu
    const drawer = computed({
      get() {
        return leftMenuStore.state.drawer
      },
      set() {
        leftMenuStore.openMenu()
      },
    })

    const isMobile = computed(() => {
      return displayWidth.value < 1024
    })

    const onToggleMenu = () => {
      mini.value = !mini.value
    }

    return {
      showMenu,
      mini,
      drawer,
      isMobile,
      onToggleMenu,
      leftMenuStore,
      menuItems,
      routeNames,
    }
  },
})
</script>

<style scoped lang="scss">
.left-menu {
  &__page-animations {
    background-color: map-get($red, 'lighten-5');
    transform-origin: 50% 100%;
    animation: colorAnimate 4s ease-in-out forwards infinite;
  }
}

@keyframes colorAnimate {
  0% {
    transform: scale(1.1) rotate(-5deg);
    background-color: map-get($blue, 'lighten-5');
  }
  25% {
    transform: scale(0.9) rotate(0deg);
    background-color: map-get($red, 'lighten-5');
  }
  50% {
    transform: scale(1.1) rotate(5deg);
    background: map-get($blue, 'lighten-5');
  }
  75% {
    transform: scale(0.9) rotate(0deg);
    background: map-get($red, 'lighten-5');
  }
  100% {
    transform: scale(1.1) rotate(-5deg);
    background: map-get($blue, 'lighten-5');
  }
}
</style>
