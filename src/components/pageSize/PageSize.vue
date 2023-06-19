<template>
  <div :class='isMobile ? "grid-mob page-size" : "grid page-size"'>
    <span
      class='text-gray'
      :class='{"d-none": isMobile}'
    >
      {{ text }}
    </span>

    <v-select
      :value='modelValue'
      :items='items'
      :label='isMobile ? label : ""'
      hide-details
      density='compact'
      solo
      variant='outlined'
      @update:modelValue='emits("update:modelValue", $event)'
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'PageSize',
}
</script>

<script setup lang='ts'>
import {computed, defineEmits, defineProps} from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  items: {
    type: Array,
    default: ()=>([]),
  },
  modelValue: {
    type: Number,
    default: 5,
  },
  label: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: 'Показывать по:',
  },
})

const emits = defineEmits(['update:modelValue'])

const { mdAndDown } = useDisplay()

const isMobile = computed(() => {
  return mdAndDown.value
})
</script>

<style lang='scss' scoped>
.page-size {
  align-items: center;
  max-width: fit-content;
  font-size: 16px;
}

.grid {
  display: grid;
  grid-template-columns: auto 90px;
  gap: 20px;
}

.grid-mob {
  display: flex;
}

.d-none {
  display: none;
}
</style>
