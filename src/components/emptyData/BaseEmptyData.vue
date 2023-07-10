<template>
  <div
    v-bind='$attrs'
    class='empty-data d-flex flex-row w-100'
  >
    <v-spacer />

    <div class='empty-data__box d-flex flex-column justify-center align-center'>
      <slot>
        <v-icon
          :size='allIconSettings?.size || 25'
          :color='allIconSettings?.color || ""'
        >
          {{ allIconSettings.icon }}
        </v-icon>
        <p class='empty-data__title mb-0'>
          Ууупс...Ничего не нашлось
        </p>
      </slot>
    </div>

    <v-spacer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'BaseEmptyData',
})
</script>

<script setup lang='ts'>
import {computed, defineProps, PropType, ComputedRef} from 'vue'

type iconSettings = {
  size?: number
  color?: string
  icon?: string
  [key: string]: any
}

const props = defineProps({
  iconSettings: {
    type: Object as PropType<iconSettings>,
    default: ()=>({}),
  },
})

const allIconSettings: ComputedRef<iconSettings> = computed((): iconSettings => {
  return {
    size: 130,
    color: 'orange-lighten-1',
    icon: 'mdi-shopping-search-outline',
    ...props.iconSettings,
  }
})
</script>

<style lang="scss" scoped>
.empty-data {
  &__title {
    font-size: 18px;
    color: grey;

    @media (min-width: 1024px) {
      font-size: 22px;
    }
  }
}
</style>
