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

      <button @click.stop.prevent='closeMenu'>
        <v-icon width='24'>
          mdi-close-circle-outline
        </v-icon>
      </button>
    </div>
    <slot />
  </div>
</template>

<script lang='ts'>
export default {
  name: 'NavbarMenu',
}
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
  padding: 24px;
  height: inherit;
  display: flex;
  flex-direction: column;
}

.navbar-menu-heading {
  margin-bottom: 20px;
  display: grid;
  column-gap: 32px;
  grid-template-columns: auto 24px;
  justify-content: space-between;
  align-items: flex-start;
}

.navbar-menu-heading-title {
  font-size: 1rem;
  font-weight: 600;
  padding: 3px 0;
}

</style>
