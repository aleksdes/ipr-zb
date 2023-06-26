<template>
  <footer class='footer'>
    <div class='footer__box-logo mb-8'>
      <v-img
        :src='require("@/assets/img/logotype-light.svg")'
        width='130'
      />
    </div>

    <div class='footer__box-content'>
      <div
        v-for='section in footerLinks'
        :key='section.sectionTitle'
        class='footer__section'
      >
        <p class='footer__section-title text-white'>{{section.sectionTitle}}</p>

        <v-divider
          color='grey'
          class='w-100 my-4'
        />

        <ul class='footer__list-link mb-5'>
          <li
            v-for='(link, index) in section.links'
            :key='index'
            class='footer__link mt-3'
          >
            {{link.title}}
          </li>
        </ul>
      </div>
    </div>

    <p class='text-center text-white'>{{ copyright }}</p>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'Footer',
}
</script>

<script setup lang="ts">
import {computed} from 'vue'
import moment from 'moment'

const footerLinks = [
  {
    sectionTitle: 'Компания',
    links: [
      {link: '', title: 'О компании'},
      {link: '', title: 'Новости'},
      {link: '', title: 'Партнеры'},
      {link: '', title: 'Политика конфиденциальности'},
      {link: '', title: 'Правила продаж'},
      {link: '', title: 'Правила пользования сайтом'},
    ],
  },
  {
    sectionTitle: 'Покупателям',
    links: [
      {link: '', title: 'Как оформить заказ'},
      {link: '', title: 'Способы оплаты'},
      {link: '', title: 'Кредиты'},
      {link: '', title: 'Доставка'},
      {link: '', title: 'Статус заказа'},
      {link: '', title: 'Обмен, возврат, гарантия'},
    ],
  },
]
const copyright = computed(() => {
  const baseYear = '2023'
  const currentYear = moment().format('YYYY')
  const year = currentYear === baseYear ? baseYear : `${baseYear}-${currentYear}`
  return `@ ${year} EasyShop`
})
</script>

<style lang="scss" scoped>
.footer {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: map-get($blue-grey, 'darken-4');

  &__box-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 70px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__section-title {
    font-weight: 600;
  }

  &__list-link {
    color: white;
    text-align: left;

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
}
</style>
