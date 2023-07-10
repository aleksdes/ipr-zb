<template>
  <div class='profile pa-5 h-100'>
    <ProfileEmptyUser
      v-if='!user'
    />

    <div
      v-else
      class='w-100'
    >
      <h1 class='mb-2'>Настройки</h1>

      <v-card
        class='profile__card profile__header mb-5'
      >
        <div class='mr-8 mb-3 mb-sm-0'>
          <v-icon
            v-if='!user.image'
            :size='displayWidth < 600 ? 100 : 150'

          >
            mdi-account-circle
          </v-icon>

          <v-avatar
            v-else
            :size='displayWidth < 600 ? 100 : 150'
            variant='outlined'
          >
            <v-img
              :src='user.image'
              alt='avatar'
            />
          </v-avatar>
        </div>


        <div class='profile__box-name w-100'>
          <p class='profile__user-nik'>{{user?.username}}</p>
          <p class='profile__user-name'>{{user?.firstName}} {{user?.lastName}}</p>

          <div class='mt-3'>
            <b class='fs-14'>Уровень: 0, Баллов: 10</b>

            <v-slider
              :model-value='10'
              color='orange-lighten-1'
              readonly
              class='mx-0'
            />
          </div>
        </div>
      </v-card>

      <v-card
        class='profile__card'
      >
        <ProfileForm />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent ({
  name: 'ProfileView',
})
</script>

<script setup lang="ts">
import {computed, ref, ComputedRef, watch} from 'vue'
import ProfileEmptyUser from './components/ProfileEmptyUser.vue'
import ProfileForm from './components/ProfileForm.vue'
import useUserStore from '@/store/user'
import {User} from '@/types/user'
import { useDisplay } from 'vuetify'

const { width: displayWidth } = useDisplay()

const userStore = useUserStore()

const user: ComputedRef<User | null> = computed((): User | null => {
  const dataUser: User = userStore.getUserData
  if (!dataUser.id) return null
  return dataUser
})

</script>

<style lang="scss" scoped>
.profile {
  max-width: 970px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  &__card {
    box-shadow: 0 0 20px rgba(0, 0, 0, 10%);
    width: 100%;
    padding: 20px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    text-align: left;

    @media (min-width: 600px) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__user-nik {
    font-size: 24px;
    font-weight: 700;
  }

  &__user-name {
    color: map-get($grey, 'darken-1')
  }
}
</style>
