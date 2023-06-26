<template>
  <v-badge
    :model-value='isNotifications'
    :content='notificationsItemsActive.length'
    color='orange-lighten-1'
    v-bind='props'
  >
    <v-btn
      class='notification-btn pa-0'
      size='x-small'
      icon
      @click.prevent='clickMenu()'
    >
      <v-icon
        size='30'
        class='profile-btn__icon'
        :class='{
          "notification-btn__icon--active": currentMenuItem && currentMenuItem.actionMenu === btnData.actionMenu,
        }'
      >
        mdi-bell-outline
      </v-icon>
    </v-btn>
  </v-badge>
</template>

<script lang="ts">
export default {
  name: 'NotificationBtn',
}
</script>

<script setup lang="ts">
import {defineProps, defineEmits, computed, ComputedRef} from 'vue'
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
.notification-btn {
  &__icon {
    color: map-get($grey, 'darken-1');

    &--active {
      color: map-get($light-blue, 'darken-1');
    }
  }
}
</style>
