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

    <v-card
      elevation='0'
      class='profile-menu'
    >
      <div
        v-if='!user'
        class='d-flex flex-column'
      >
        <b class='mb-2'>Получайте бонусы, сохраняйте и отслеживайте заказы.</b>
        <v-btn
          color='orange-lighten-1'
          class='text-white text-initial'
          elevation='0'
          @click='login'
        >
          <b>Войти</b>
        </v-btn>

        <div class='my-5'>
          <p
            v-for='(link, index) in linksMenu'
            :key='index'
            class='profile-menu__link mt-3'
          >
            {{link.title}}
          </p>
        </div>
      </div>


    </v-card>
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
import {User} from '@/types/user'

const userStore = useUserStore()
const openMenu = ref(false)
const linksMenu = [
  {link: '', title: 'Обратная связь'},
  {link: '', title: 'Обмен, возврат, гарантия'},
]

const user: ComputedRef<User & {fullName: string} | null> = computed((): User & {fullName: string} | null => {
  const dataUser: User = userStore.getUserData
  if (!dataUser.id) return null

  return {
    ...dataUser,
    fullName: dataUser.name + ' ' + dataUser.surname,
  }
})

const login = () => {

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

.profile-menu {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0 ,0, 10%) !important;
  border-radius: 8px;

  &__link {
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: map-get($orange, 'lighten-1');
    }
  }
}

</style>
