<template>
  <div class='modal-actions w-100'>
    <v-spacer
      v-if='align==="right" || align==="center"'
    />
    <v-btn
      v-if='showApply'
      class='text-white text-none py-3 px-6 filter-actions__btn-action'
      height='40'
      elevation='0'
      :disabled='disabledApply'
      :loading='attrs.loading'
      color='orange-lighten-1'
      @click='apply'
    >
      {{ applyTitle }}
    </v-btn>

    <v-btn
      v-if='showCancel'
      class='white--text text-none py-3 px-6 filter-actions__btn-action'
      variant='outlined'
      color='orange-lighten-1'
      height='40'
      elevation='0'
      @click='clear'
    >
      {{ cancelTitle }}
    </v-btn>
    <v-spacer v-if='align==="left" || align==="center"' />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'BaseModalActions',
})
</script>

<script setup lang='ts'>
import { defineEmits, defineProps, useAttrs } from 'vue'

defineProps({
  align: {
    type: String,
    default: 'left',
  },
  applyTitle: {
    type: String,
    default: 'Ок',
  },
  showApply: {
    type: Boolean,
    default: true,
  },
  disabledApply: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  cancelTitle: {
    type: String,
    default: 'Отмена',
  },
})

const attrs: any = useAttrs()
const emits = defineEmits(['apply', 'cancel'])
const apply = () => {
  emits('apply')
}

const clear = () => {
  emits('cancel')
}

</script>

<style lang="scss" scoped>
.modal-actions {
  display: flex;
  flex-direction: row;
  gap: 15px;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    gap: 10px;
  }

  @media #{map-get($display-breakpoints, 'xs')} {
    flex-direction: column;
  }
}

.v-btn.filters-field__btn-action {
  font-weight: 600;
  display: flex;
}

</style>
