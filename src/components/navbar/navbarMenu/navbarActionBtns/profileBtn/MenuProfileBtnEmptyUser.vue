<template>
  <v-card
    elevation='0'
    class='profile-menu'
  >
    <div
      class='d-flex flex-column'
    >
      <b class='mb-2'>Получайте бонусы, сохраняйте и отслеживайте заказы.</b>
      <v-btn
        color='orange-lighten-1'
        class='text-white text-initial'
        elevation='0'
        @click='emits("login")'
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
</template>

<script lang="ts">
export default {
  name: 'MenuProfileBtnEmptyUser',
}
</script>

<script setup lang="ts">
import {defineEmits} from 'vue'

const emits = defineEmits(['login'])

const linksMenu = [
  {link: '', title: 'Обратная связь'},
  {link: '', title: 'Обмен, возврат, гарантия'},
]
</script>

<style scoped lang="scss">
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
