<template>
  <div class='chat'>
    <ChatBtn
      id='chatBtn'
      :active='openMenu'
      @onClick='openMenu = !openMenu'
    />

    <v-menu
      v-if='!isMobile'
      activator='#chatBtn'
      :close-on-content-click='false'
      location='top'
      offset='15'
      data-tid='chat-menu'
      @update:model-value='!$event ? openMenu = false : ""'
    >
      <ChatMessenger
        class='chat__messanger'
        :messages='[]'
      />
    </v-menu>

    <teleport
      v-else
      v-show='openMenu'
      to='body'
    >
      <v-navigation-drawer
        :permanent='openMenu'
        touchless
        fixed
        location='bottom'
        data-tid='chat-drawer'
        :style='styleMenuSettings'
      >
        <v-btn
          icon
          size='24'
          elevation='0'
          class='chat__close-btn'
          data-tid='close-chat-drawer'
          @click.stop.prevent='closeDrawer'
        >
          <v-icon width='24'>
            mdi-close-circle-outline
          </v-icon>
        </v-btn>

        <ChatMessenger
          class='chat__messanger'
          :messages='[]'
        />
      </v-navigation-drawer>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'Chat',
})
</script>

<script setup lang="ts">
import {ref, computed} from 'vue'
import ChatBtn from './ChatBtn.vue'
import ChatMessenger from './ChatMessenger.vue'
import { useDisplay } from 'vuetify'

const { width: displayWidth } = useDisplay()
const openMenu = ref(false)

const isMobile = computed(() => {
  return displayWidth.value < 1024
})

const closeDrawer = () => {
  openMenu.value = false
}

const styleMenuSettings = computed(() => {
  return {
    height: '100%',
    top: 0,
    zIndex: 1020,
    width: '100%',
  }
})
</script>

<style lang="scss" scoped>
.chat {
  position: sticky;
  display: flex;
  justify-content: flex-end;
  left: 100%;
  bottom: 60px;

  @media (min-width: 768px) {
    bottom: 0;
  }

  &__messanger {
    height: 100vh;

    @media (min-width: 1024px) {
      max-height: 500px;
    }
  }

  &__close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}
</style>
