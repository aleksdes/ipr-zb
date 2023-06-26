<template>
  <v-dialog
    :model-value='modelValue'
    persistent
    overlay-color='transparent'
    content-class='base-modal'
    scrollable
    v-bind='attrs'
    :modal-class='classes'
  >
    <v-card
      :disabled='disabled'
      class='base-modal__card-content'
    >
      <v-card-title
        v-if='showHeader'
        class='base-modal__box-title'
      >
        <slot name='title'>
          <p class='base-modal__title-text mb-0'>
            {{ title }}
          </p>
        </slot>
      </v-card-title>

      <v-btn
        size='24'
        class='base-modal__btn-close bg-white'
        elevation='0'
        @click='emits("close")'
      >
        <v-icon
          color='grey'
          size='24'
        >
          mdi-close
        </v-icon>
      </v-btn>

      <v-card-text class='scroll'>
        <slot />
      </v-card-text>

      <v-divider />

      <v-card-actions
        v-if='showActions'
        class='pa-0'
      >
        <slot name='actions'>
          <BaseModalActions
            class='px-6 py-4'
            v-bind='actionsProps'
            @apply='$emit("apply")'
            @cancel='$emit("cancel")'
          />
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: 'BaseModal',
}
</script>
<script setup lang='ts'>
import {defineEmits, defineProps, useAttrs} from 'vue'
import BaseModalActions from './BaseModalActions.vue'

const attrs = useAttrs()
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  classes: {
    type: [String, Array],
    default: '',
  },
  actionsProps: {
    type: Object,
    default: ()=>({}),
  },
})

const emits = defineEmits(['close','apply', 'cancel'])
const close = () => {
  emits('close')
}
const submit = () => {
  emits('apply')
  close()
}
const cancel = () => {
  close()
}
</script>

<style lang="scss" scoped>
.tooltip {
  z-index: 1040;
}

:deep .v-card .v-card__title,
.v-card .v-card__text {
  padding: 17px 26px;
}

.base-modal {
  &__card-content {
    position: relative;
  }

  &__btn-close {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  &__box-title {
    background-color: map-get($light-blue, 'lighten-3');
  }

  &__title-text {
    font-weight: 700;
    font-size: 22px;
    word-break: break-word;
  }

  &__box-content {
    padding: 17px 26px;
  }
}
</style>
