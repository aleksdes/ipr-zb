<template>
  <v-btn
    class='notification-btn pa-0'
    size='45'
    :color='currentMenuItem && currentMenuItem.actionMenu === btnData.actionMenu ? "light-blue-darken-1" : ""'
    icon
    @click.prevent='clickMenu()'
  >
    <v-badge
      :model-value='isNotifications'
      :content='notificationsItemsActive.length'
      color='orange-lighten-1'
      v-bind='props'
    >
      <v-icon
        size='30'
        class='profile-btn__icon'
      >
        mdi-bell-outline
      </v-icon>
    </v-badge>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent ({
  name: 'NotificationBtn',
})
</script>

<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue'
import {INavbarMenuBtns} from '@/types/navbarMenu'
import useNotificationsStore from '@/store/notifications'
import {INotificationMessages} from '@/types/common'

interface Props {
  btnData: INavbarMenuBtns
  currentMenuItem: INavbarMenuBtns | null
}

const props = defineProps<Props>()
const emits = defineEmits({
  updateCurrentMenu: (item: INavbarMenuBtns) => true,
})
const notificationsStore = useNotificationsStore()

const notificationsItemsActive = computed(()=>{
  return notificationsStore.getItems.filter((item: INotificationMessages) => item.active)
})

const isNotifications = computed(()=>{
  return !!(notificationsItemsActive.value.length)
})

const clickMenu = () => {
  emits('updateCurrentMenu', props.btnData)
}
</script>

<style lang="scss" scoped>
</style>
