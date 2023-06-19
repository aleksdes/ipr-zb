<template>
  <div class='products py-3 h-100'>
    <Breadcrumbs
      :part='props.breadcrumbs'
      class='mb-2'
    />

    <div class='products__content h-100 w-100'>
      <v-col
        cols='9'
        class='pa-0'
      >
        <slot />
      </v-col>

      <v-col
        cols='3'
        class='pa-0'
      >
        <BasketCard

        />
      </v-col>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductBaseLayout',
}
</script>

<script setup lang="ts">
import {defineProps, PropType, ref, Ref} from 'vue'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs.vue'
import BasketCard from '@/components/common/basketCards/BasketCard.vue'
import {IBreadcrumb} from '@/types/breadcrumbs'

const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<IBreadcrumb[]>,
    default: ()=>([]),
  },
})


</script>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
