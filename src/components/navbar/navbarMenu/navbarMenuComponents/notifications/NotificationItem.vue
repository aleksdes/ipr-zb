<template>
  <v-list-item
    class='notification-message'
    @mouseleave='mouseleaveMessage'
    @mouseenter='mouseenterMessage'
  >
    <template v-slot:append>
      <v-badge
        :model-value='data.active'
        color='red'
        :disabled='!data.active'
        inline
        dot
      />
    </template>

    <div class='notification-message__container-content'>
      <p class='notification-message__time'>{{moment(data.date).format('DD.MM.YYYY HH:mm')}}</p>
      <p class='notification-message__title'>{{data.title}}</p>
      <p class='notification-message__desc'>{{data.text}}</p>
    </div>
  </v-list-item>
</template>

<script lang="ts">
export default {
  name: 'NotificationItem',
}
</script>

<script setup lang="ts">
import {defineProps, PropType, ref} from 'vue'
import moment from 'moment'
import {INotificationMessages} from '@/types/common'
import useNotificationsStore from '@/store/notifications'

const props = defineProps({
  data: {
    type: Object as PropType<INotificationMessages>,
    default: () => ({}),
  },
})

const notificationsStore = useNotificationsStore()
const debounce: any = ref(null)
const debounceTimer = ref(1500)
const mouseleaveMessage = () => {
  clearTimeout(debounce.value)
}

const mouseenterMessage = () => {
  clearTimeout(debounce.value)
  if (!props.data.active) return
  debounce.value = setTimeout(async() => {
    notificationsStore.readNotification(props.data.id)
  }, debounceTimer.value)
}
</script>

<style lang="scss">
.notification-message {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:hover {
    background-color: map-get($grey, 'lighten-5');
  }

  &__container-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 15px;
  }

  &__title {
    font-weight: 700;
  }

  &__time {
    font-size: 14px;
    color: map-get($grey, 'lighten-1')
  }

  &__desc {
    font-size: 14px;
  }
}
</style>
