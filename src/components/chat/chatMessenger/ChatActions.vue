<template>
  <v-form
    ref='sendMessagesForm'
    v-model='validForm'
  >
    <div class='bg-light-blue-lighten-5 d-flex flex-row align-center pa-4'>
      <Field
        v-slot='{ field }'
        v-model='dataForm.message'
        rules='required'
        name='message'
      >
        <v-textarea
          :model-value='dataForm.message'
          v-bind='field'
          :disabled='disabled'
          placeholder='Сообщение'
          required
          dense
          variant='outlined'
          rows='1'
          row-height='10'
          outlined
          hide-details
          no-resize
          @keyup.enter='sendMessage'
        />
      </Field>

      <v-btn
        icon
        class='ml-3'
        :color='!meta.valid || disabled ? "grey-lighten-1" : "orange-lighten-1"'
        size='40'
        elevation='0'
        :disabled='!meta.valid || disabled'
        @click='sendMessage'
      >
        <v-icon
          size='20'
          color='white'
        >
          mdi-send-variant
        </v-icon>

      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ChatActions',
})
</script>

<script setup lang="ts">
import {ref} from 'vue'
import {useForm, Field} from 'vee-validate'
const { meta } = useForm()

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['sendMessage'])

const sendMessagesForm: any = ref(null)
const dataForm: any = ref({})
const validForm = ref(false)

const sendMessage = () => {
  if (!meta.value.valid) return
  emits('sendMessage', dataForm.value)
}

const clearMessage = () => {
  useForm().resetForm()
  sendMessagesForm.value.reset()
}

defineExpose({
  clearMessage,
})
</script>

<style scoped lang="scss">
.chat-actions {
  padding: 20px;
  background-color: #f9fdff;
}
</style>
