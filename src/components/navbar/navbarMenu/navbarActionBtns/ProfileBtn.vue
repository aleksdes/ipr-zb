<template>
  <v-menu
    v-model='openMenu'
    open-on-hover
    open-on-click
    :close-on-content-click='false'
    location='bottom right'
  >
    <template v-slot:activator='{ props }'>
      <v-btn
        class='profile-btn pa-0'
        icon
        v-bind='props'
      >
        <v-icon
          v-if='!user'
          size='45'
          class='profile-btn__icon'
          :class='{
            "profile-btn__icon--active": openMenu,
          }'
        >
          mdi-account-circle
        </v-icon>

        <v-avatar
          v-else
          color='grey lighten-2'
          size='45'
        >
          <v-img
            :src='user.image'
            alt='avatar'
          /></v-avatar>
      </v-btn>
    </template>

    <MenuProfileBtnEmtyUser
      v-if='!user'
      @login='login'
    />

    <ModalLoginUser
      v-if='openLogin'
      @close='openLogin = false'
    />
  </v-menu>
</template>

<script lang="ts">
export default {
  name: 'ProfileBtn',
}
</script>

<script setup lang="ts">
import {computed, ComputedRef, ref} from 'vue'
import useUserStore from '@/store/user'
import MenuProfileBtnEmtyUser from './profileBtn/MenuProfileBtnEmtyUser.vue'
import ModalLoginUser from '../../../autch/ModalLoginUser.vue'
import {User} from '@/types/user'

const userStore = useUserStore()
const openMenu = ref(false)
const openLogin = ref(false)

const user: ComputedRef<User & {fullName: string} | null> = computed((): User & {fullName: string} | null => {
  const dataUser: User = userStore.getUserData
  if (!dataUser.id) return null

  return {
    ...dataUser,
    fullName: dataUser.name + ' ' + dataUser.surname,
  }
})

const login = () => {
  openLogin.value = true
}
</script>

<style lang="scss" scoped>
.profile-btn {
  &__icon {
    color: map-get($grey, 'darken-1');

    &--active {
      color: map-get($light-blue, 'darken-1');
    }
  }
}
</style>
