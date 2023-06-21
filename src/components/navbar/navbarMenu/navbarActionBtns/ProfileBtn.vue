<template>
  <v-btn
    class='profile-btn pa-0'
    icon
    @click.prevent='clickMenu()'
  >
    <v-icon
      v-if='user.avatar'
      size='45'
      class='profile-btn__icon'
      :class='{
        "profile-btn__icon--active": currentMenuItem && currentMenuItem.actionMenu === btnData.actionMenu,
      }'
    >
      mdi-account-circle
    </v-icon>

    <v-avatar
      v-else
      color='grey lighten-2'
      size='45'

    >
      <v-img
        src='https://cdn.vuetifyjs.com/images/john.jpg'
        alt='John'
      /></v-avatar>
  </v-btn>
</template>

<script lang="ts">
export default {
  name: 'ProfileBtn',
}
</script>

<script setup lang="ts">
import {defineProps, defineEmits, computed, ComputedRef} from 'vue'
import {INavbarMenuBtns} from '@/types/navbarMenu'
import { User } from '@/types/user'
import useUserStore from '@/store/user'

interface Props {
  btnData: INavbarMenuBtns
  currentMenuItem: INavbarMenuBtns | null
}

const props = defineProps<Props>()
const emits = defineEmits({
  updateCurrentMenu: (item: INavbarMenuBtns) => true,
})

const userStore = useUserStore()
const user: ComputedRef<User> = computed(() => (userStore.getUserData))

const clickMenu = () => {
  emits('updateCurrentMenu', props.btnData)
}
</script>

<style lang="scss" scoped>
.profile-btn {
  &__icon {
    color: map-get($grey, 'darken-1');

    &--active {
      color: map-get($light-blue, 'darken-1');
    }
  }
}
</style>
