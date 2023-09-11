<template>
  <div>
    <v-breadcrumbs
      class='breadcrumbs pa-0 pb-1 scroll'
      :items='usePart'
      divider='mdi-chevron-right'
    >
      <template #divider>
        <v-icon
          max-width='3'
          class='text-gray'
          data-tid='breadcrumbs-chevron'
        >
          mdi-chevron-right
        </v-icon>
      </template>
      <template #title='{ item }'>
        <v-breadcrumbs-item
          :disabled='item.disabled || !item.href'
          :class='["breadcrumbs__item", !item.href ? "disabled" : "breadcrumbs__item--pointer"]'
          active-class='disabled'
          data-tid='breadcrumbs-item'
          @click.stop.prevent='toRoute(item)'
        >
          {{ item.title }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'Breadcrumbs',
})
</script>

<script setup lang='ts'>
import {PropType, toRef, Ref} from 'vue'
import { IBreadcrumb } from '@/types/breadcrumbs'
import {useRouter} from 'vue-router'

const router = useRouter()

const props = defineProps({
  part: {
    type: Array as PropType<IBreadcrumb[]>,
    default: () => ([]),
  },
})

const usePart: Ref<any> = toRef(props, 'part')
const toRoute = (item: IBreadcrumb) => {
  router.push({name: item.href, params: item.params})
}

</script>

<style lang="scss">
.breadcrumbs {
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  -ms-overflow-style: none;

  &__item--pointer {
    cursor: pointer;
  }
}
</style>
