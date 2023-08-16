<template>
  <v-card
    elevation='0'
    class='profile-empty w-100 pa-3'
  >
    <div
      class='d-flex flex-column justify-center align-center my-5'
    >
      <v-img
        src='/img/user-empty.svg'
        height='150'
        width='auto'
        class='mx-auto mb-4'
      />

      <v-btn
        class='profile-empty__btn text-white text-initial fw-6 mt-4'
        color='orange-lighten-1'
        height='55'
        elevation='0'
        @click='login'
      >
        Войти в профиль
      </v-btn>
    </div>
  </v-card>

  <ModalLoginUser
    v-if='openLogin'
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent ({
  name: 'ProfileEmptyUser',
})
</script>

<script setup lang="ts">
import {computed} from 'vue'
import ModalLoginUser, {useLoginModal} from '@/components/autch/ModalLoginUser.vue'

const openLogin = computed(() => {
  return useLoginModal.getIsOpen()
})

const login = () => {
  useLoginModal.setIsOpen(true)
}

</script>

<style lang="scss" scoped>
.profile-empty {
  &__btn {
    width: 300px;
  }
}
</style>


