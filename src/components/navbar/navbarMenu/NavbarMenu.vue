<template>
  <div
    class='navbar-menu white scroll overflow-auto'
  >
    <div class='navbar-menu-heading'>
      <slot name='title'>
        <h3 class='navbar-menu-heading-title'>
          {{ title }}
        </h3>
      </slot>

      <v-btn
        icon
        size='24'
        elevation='0'
        @click.stop.prevent='closeMenu'
      >
        <v-icon width='24'>
          mdi-close-circle-outline
        </v-icon>
      </v-btn>
    </div>

    <div class='px-2 pb-6'>
      <slot />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'NavbarMenu',
})
</script>

<script setup lang='ts'>
import {defineProps, defineEmits} from 'vue'

interface Props {
  title?: string | null
}

const props = defineProps<Props>()

const emits = defineEmits({
  onClose: () => true,
})

const closeMenu = () => {
  emits('onClose')
}

</script>

<style lang='scss' scoped>
.navbar-menu {
  height: inherit;
  display: flex;
  flex-direction: column;
}

.navbar-menu-heading {
  padding: 24px;
  background-color: white;
  z-index: 10;
  display: grid;
  column-gap: 32px;
  grid-template-columns: auto 24px;
  justify-content: space-between;
  align-items: flex-start;
  position: sticky;
  top: 0;
}

.navbar-menu-heading-title {
  font-size: 1rem;
  font-weight: 600;
  padding: 3px 0;
}
</style>
