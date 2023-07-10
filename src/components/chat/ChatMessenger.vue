<template>
  <div class='chat-messanger'>
    <div
      ref='messagesContainer'
      class='messages scroll overflow-auto'
    >
      <slot name='empty'>
        <div
          v-if='!isDataMessages'
          class='chat__box-empty'
        >
          <p class='chat__empty-title'>
            {{ emptyMessage }}
          </p>
        </div>
      </slot>

      <ChatMessageItem
        v-for='message in messages'
        v-if='isDataMessages'
        :key='message.id'
        :item='message'
      />
    </div>

    <ChatActions
      ref='chatActions'
      :disabled='disabled'
      @sendMessage='sendMessage'
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ChatMessenger',
})
</script>

<script setup lang='ts'>
import {defineProps, defineEmits, ref, computed, nextTick, PropType} from 'vue'
import useUserStore from '@/store/user'
import ChatMessageItem from './chatMessenger/ChatMessageItem.vue'
import ChatActions from './chatMessenger/ChatActions.vue'
import moment from 'moment'
import {IChatMessage, IChatSendMessage} from '@/types/chat'

const props = defineProps({
  messages: {
    type: Array as PropType<IChatMessage[]>,
    default: ()=>([]),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  emptyMessage: {
    type: String,
    default: 'Начните общение. Задайте вопросы',
  },
})

const emits = defineEmits(['send-message'])
const userStore = useUserStore()
const messagesContainer: any = ref(null)
const chatActions: any = ref(null)

const userId = computed(() => {
  const dataUser:any = userStore.getUserData
  return dataUser.id
})

const sendMessage = (dataMessage: any) => {
  const newMessage: IChatSendMessage = {
    author: userId.value,
    timestamp: moment().unix(),
    text: dataMessage.message,
  }

  emits('send-message', newMessage)
  chatActions.value.clearMessage()

  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const isDataMessages = computed(() => {
  return props.messages && props.messages.length
})

</script>


<style scoped lang="scss">
.chat-messanger {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid map-get($grey, 'lighten-2');
  border-radius: 4px;

  &__empty-title {
    text-align: center;
    font-size: 16px;
    color: grey;
  }
}

.messages {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
</style>
