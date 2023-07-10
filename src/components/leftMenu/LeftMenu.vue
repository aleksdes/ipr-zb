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
    }
  },
})
</script>
