<template>
  <navbar-menu
    title='Уведомления'
    @onClose='emits("onClose")'
  >
    <Transition name='slide-fade'>
      <div class='notifications'>
        <template v-if='!isNotifications'>
          <div class='notifications__box-empty'>
            <img
              src='img/notification-empty.png'
              class='notifications__empty-img'
            >
            <p class='notifications__empty-title'>Пока ничего нет</p>
            <span class='notifications__empty-sub-title'>Здесь будут храниться<br>уведомления о событиях</span>
          </div>
        </template>

        <div
          v-else
          class='notifications__list-messages'
        >
          <NotificationItem
            v-for='item in notifications'
            :key='item.id'
            :data='item'
          />
        </div>

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
import {computed, ComputedRef, defineEmits, watch} from 'vue'
import NavbarMenu from '@/components/navbar/navbarMenu/NavbarMenu.vue'
import NotificationItem from './notifications/NotificationItem.vue'
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
.notifications {
  display: flex;
  flex-direction: column;
  height: initial;

  &__box-empty {
    width: 250px;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__empty-img {
    width: 100px;
  }

  &__empty-title {
    font-weight: 700;
    margin: 15px 8px 0;
  }

  &__empty-sub-title {
    font-size: 12px;
  }

  &__list-messages {
    display: grid;
    grid-row-gap: 13px;
  }
}
</style>
