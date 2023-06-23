<template>
  <navbar-menu
    title='Уведомления'
    @onClose='emits("onClose")'
  >
    <Transition name='slide-fade'>
      <div class='notifications'>
        notifications

      </div>
    </Transition>
  </navbar-menu>
</template>

<script lang='ts'>
export default {
  name: 'Notifications',
}
</script>

<script setup lang='ts'>
import {computed, ComputedRef, defineEmits} from 'vue'
import NavbarMenu from '@/components/navbar/navbarMenu/NavbarMenu.vue'
import useNotificationsStore from '@/store/notifications'
import {INotificationMessages} from '@/types/common'

const notificationsStore = useNotificationsStore()

const notifications: ComputedRef<INotificationMessages[]> = computed(() => {
  return notificationsStore.getItems
})

const isNotifications = computed(() => {
  return notifications.value.length
})
const emits = defineEmits({
  onClose: () => true,
})

</script>

<style lang="scss" scoped>
</style>
