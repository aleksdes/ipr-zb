<template>
  <navbar-menu
    @onClose='emits("onClose")'
  >
    <template #title>
      <p>{{user.fullname || '-'}}</p>
    </template>

    <Transition name='slide-fade'>
      <div class='profile'>
        <div>
          <!--      <div>-->
          <!--        <p class='profile__descriptions-sub-text'>-->
          <!--          Организация-->
          <!--        </p>-->
          <!--        <p class='profile__descriptions-text'>-->
          <!--          {{ user.organization || '-' }}-->
          <!--        </p>-->
          <!--      </div>-->

          <!--      <div>-->
          <!--        <p class='profile__descriptions-sub-text'>-->
          <!--          Подразделение-->
          <!--        </p>-->
          <!--        <p class='profile__descriptions-text'>-->
          <!--          {{ user.subdivision || '-' }}-->
          <!--        </p>-->
          <!--      </div>-->

          <!--      <div>-->
          <!--        <p class='profile__descriptions-sub-text'>-->
          <!--          Должность-->
          <!--        </p>-->
          <!--        <p class='profile__descriptions-text'>-->
          <!--          {{ user.position || '-' }}-->
          <!--        </p>-->
          <!--      </div>-->

          <!--      <div class='profile__change-password mt-8'>-->
          <!--        <p class='profile__descriptions-text'>-->
          <!--          Сменить пароль-->
          <!--        </p>-->

          <!--        <ChangePassword />-->
          <!--      </div>-->
        </div>
      </div>
    </Transition>
  </navbar-menu>
</template>

<script lang='ts'>
export default {
  name: 'Profile',
}
</script>

<script setup lang='ts'>
import { computed, defineEmits } from 'vue'
import useUserStore from '@/store/user'
import NavbarMenu from '@/components/navbar/navbarMenu/NavbarMenu.vue'
import { User } from '@/types/user'

const emits = defineEmits({
  onClose: () => true,
})

const userStore = useUserStore()

const user = computed(() => {
  const dataUser: User = userStore.getUserData
  return {
    ...dataUser,
    fullName: dataUser.name + ' ' + dataUser.surname,
  }
})

</script>

<style lang="scss" scoped>
.profile {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  &__name {
    font-weight: 500;
    margin: 0 0 0 15px;
  }

  &__descriptions-text {
    font-weight: 500;
  }

  &__descriptions-sub-text {
    font-weight: 500;
    color: map-get($grey, 'lighten-3');
    margin-bottom: 3px;
  }

}
</style>
