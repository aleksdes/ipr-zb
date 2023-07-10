<template>
  <div
    class='message'
  >
    <div class='message__title'>
      <p
        class='message__author'
        :class='{ "message__author--other": item.author.id !== userId }'
      >
        {{ item.author.name }}
      </p>

      <v-icon
        size='18'
        color='green'
      >
        mdi-check-all
      </v-icon>
    </div>


    <p class='message__time'>
      {{ moment(item.timestamp).format('DD.MM.YYYY hh:mm') }}
    </p>

    <span class='message__text'>{{ item.text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ChatMessageItem',
})
</script>

<script setup lang="ts">
import {computed, defineProps, PropType} from 'vue'
import useUserStore from '@/store/user'
import {User} from '@/types/user'
import moment from 'moment'
import {IChatMessage} from '@/types/chat'

const props = defineProps({
  item: {
    type: Object as PropType<IChatMessage>,
    default: ()=>({}),
  },
})

const userStore = useUserStore()

const userId = computed(() => {
  const dataUser: User = userStore.getUserData
  return dataUser.id
})

</script>

<style scoped lang="scss">
.message {
  background-color: #f7f8fa;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  width: fit-content !important;

  &__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__author {
    font-size: 12px;
    margin-bottom: 0;

    &--other {
      color: #00a0df;
    }
  }

  &__time {
    font-size: 12px;
    margin-bottom: 10px;
    color: #b3b4b6;
  }

  &__text {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
