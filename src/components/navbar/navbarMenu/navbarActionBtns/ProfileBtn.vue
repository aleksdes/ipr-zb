<template>
  <v-menu
    v-model='openMenu'
    :disabled='typeLink'
    open-on-hover
    open-on-click

    location='bottom right'
  >
    <template v-slot:activator='{ props }'>
      <v-btn
        class='profile-btn pa-0'
        icon
        size='45'
        :color='openMenu ? "light-blue-darken-1" : props.color'
        v-bind='props'
        @click='goProfile'
      >
        <v-icon
          v-if='!user || !user.image'
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
          />
        </v-avatar>
      </v-btn>
    </template>

    <MenuProfileBtnEmptyUser
      v-if='!user'
      @login='login'
    />

    <MenuProfileBtnIsUser
      v-if='user'
    />
  </v-menu>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent ({
  name: 'ProfileBtn',
})
</script>

<script setup lang="ts">
import {computed, ComputedRef, ref} from 'vue'
import {useRouter} from 'vue-router'
import useUserStore from '@/store/user'
import MenuProfileBtnEmptyUser from './profileBtn/MenuProfileBtnEmptyUser.vue'
import MenuProfileBtnIsUser from './profileBtn/MenuProfileBtnIsUser.vue'
import {useLoginModal} from '../../../autch/ModalLoginUser.vue'
import {User} from '@/types/user'
import {routeNames} from '@/router/RouteNames'

const props = defineProps({
  typeLink: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const userStore = useUserStore()
const openMenu = ref(false)

const user: ComputedRef<User | null> = computed((): User | null => {
  const dataUser: User = userStore.getUserData
  if (!dataUser.id) return null
  return dataUser
})

const login = () => {
  useLoginModal.setIsOpen(true)
}
const goProfile = () => {
  if (props.typeLink) {
    router.push({name: routeNames.profile})
  }
}
</script>

<style lang="scss" scoped>
</style>
