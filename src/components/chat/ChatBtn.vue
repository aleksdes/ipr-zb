<template>
  <v-btn
    icon
    elevation='6'
    color='orange-lighten-1'
    size='50'
    class='ma-6 mt-1'
    data-tid='chat-btn'
    @click='emits("onClick")'
  >
    <v-icon
      color='white'
      size='25'
      data-tid='chat-btn-icon'
    >
      {{active ? 'mdi-window-close' : 'mdi-message'}}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'ChatBtn',
})
</script>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['onClick'])
</script>
