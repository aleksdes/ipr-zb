<template>
  <v-card
    elevation='0'
    class='profile-menu'
    width='300'
  >
    <div
      class='d-flex flex-column'
    >
      <router-link
        :to='{name: routeNames.profile}'
        class='profile-menu__link-profile d-flex flex-row align-center justify-space-between'
      >
        <p class='profile-menu__user-name'>{{user?.fullName}}</p>
        <v-btn
          class='profile-btn pa-0'
          icon
          size='35'
        >
          <v-icon
            v-if='!user || !user.image'
            size='35'
            class='profile-btn__icon'
          >
            mdi-account-circle
          </v-icon>

          <v-avatar
            v-else
            color='grey lighten-2'
            size='35'
          >
            <v-img
              :src='user.image'
              alt='avatar'
            />
          </v-avatar>
        </v-btn>
      </router-link>

      <ul class='profile-menu__list-link mb-5'>
        <li
          v-for='(link, index) in linksMenu'
          :key='index'
          class='profile-menu__link mt-3'
        >
          {{link.title}}
        </li>
        <li
          class='profile-menu__link mt-3'
          @click='logout'
        >
          Выйти
        </li>
      </ul>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'MenuProfileBtnIsUser',
})
</script>

<script setup lang="ts">
import {computed, ComputedRef} from 'vue'
import useUserStore from '@/store/user'
import {User} from '@/types/user'
import Auth from '@/assets/js/helpers/auth'
import {routeNames} from '@/router/RouteNames'

const userStore = useUserStore()

const user: ComputedRef<User & {fullName: string} | null> = computed((): User & {fullName: string} | null => {
  const dataUser: User = userStore.getUserData
  if (!dataUser.id) return null

  return {
    ...dataUser,
    fullName: dataUser.firstName + ' ' + dataUser.lastName,
  }
})

const linksMenu = [
  {link: '', title: 'Заказы'},
  {link: '', title: 'Обратная связь'},
  {link: '', title: 'Избранное'},
  {link: '', title: 'Обращения в сервис'},
  {link: '', title: 'Обмен, возврат, гарантия'},
  {link: '', title: 'Настройки профиля'},
]

const logout = () => {
  Auth.logout()
}
</script>

<style scoped lang="scss">
.profile-menu {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0 ,0, 10%) !important;
  border-radius: 8px;

  &__list-link {
    li {
      list-style-type: none;
    }
  }

  &__link {
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: map-get($orange, 'lighten-1');
    }
  }

  &__user-name {
    font-weight: 600;
    font-size: 18px;
    margin-right: 15px;
  }

  &__link-profile {
    text-decoration: none;
    color: inherit;
  }
}
</style>
