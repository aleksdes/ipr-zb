<template>
  <v-row
    no-gutters
    class='base-pagination align-center'
  >
    <v-col
      cols='12'
      md='6'
      class='d-flex justify-center justify-md-start py-4 py-md-0'
    >
      <page-size
        v-model='getPerPage'
        label='По'
        :items='pageLengthList'
      />
    </v-col>

    <v-col
      cols='12'
      md='6'
      class='d-flex justify-center justify-md-end align-center'
    >
      <v-btn
        elevation='0'
        icon
        :ripple='false'
        color='white'
        class='pagination-btn'
        @click='emits("update:page", 1)'
      >
        <v-icon>
          mdi-chevron-double-left
        </v-icon>
      </v-btn>

      <v-pagination
        v-model='getCurrentPage'
        :size='width < 576 ? 30 : 38'
        class='base-pagination__pagination'
        :length='totalPages'
        :total-visible='paginationLength'
        color='light-blue'
      />

      <v-btn
        elevation='0'
        icon
        :ripple='false'
        color='white'
        class='pagination-btn'
        @click='emits("update:page", totalPages)'
      >
        <v-icon>
          mdi-chevron-double-right
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
export default {
  name: 'BasePagination',
}
</script>

<script setup lang='ts'>
import {computed, defineProps, defineEmits} from 'vue'
import PageSize from '@/components/pageSize/PageSize.vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  pageLengthList: {
    type: Array,
    default: ()=>([]),
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 0,
  },
})

const { smAndDown, width } = useDisplay()

const emits = defineEmits(['update:perPage', 'update:page'])

const paginationLength = computed(() => {
  return smAndDown.value ? 3 : 6
})

const totalPages = computed(()=>{
  return Math.ceil(props.totalCount/props.perPage)
})

const getCurrentPage = computed({
  get(){
    return props.page
  },
  set(v: number) {
    emits('update:page', v)
  },
})

const getPerPage = computed({
  get(){
    return props.perPage
  },
  set(v: number) {
    emits('update:perPage', v)
  },
})
</script>

<style lang='scss' scoped>
.base-pagination {
  padding: 15px;
  background-color: white;

  &__pagination {
    display: flex;
    justify-content: flex-end;

    :deep {
      .v-pagination__prev,
      .v-pagination__next,
      .v-pagination__item {
        & button {
          box-shadow: none;
          border: thin solid rgba(0, 0, 0, 12%);
        }
      }
    }
  }

  .pagination-btn {
    border: thin solid rgba(0, 0, 0, 12%);
    border-radius: 4px;
    width: 38px;
    height: 38px;

    i:before {
      color: map-get($light-blue, 'base')
    }

    @media (max-width: 576px) {
      height: 30px;
      width: 30px;
    }
  }
}
</style>
