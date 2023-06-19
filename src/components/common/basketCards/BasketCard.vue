<template>
  <div class='basket-container pa-3'>
    <v-card
      class='basket-card'
      variant='flat'
    >
      <div
        class='d-flex flex-column align-start'
      >
        <p class='basket-card__title mb-3'>Товары в корзине</p>

        <div class='basket-card__content mb-5'>
          <p>efg</p>
        </div>

        <div class='basket-card__box-price d-flex flex-column align-end w-100'>
          <p class='basket-card__title-price'>Общая стоимость:</p>
          <p class='basket-card__total-price'>0.00<span>$</span></p>
        </div>

        <div class='basket-card__actions d-flex justify-end w-100 mt-5'>
          <v-btn variant='outlined'>
            Button
          </v-btn>
        </div>

      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BasketCard',
}
</script>

<script setup lang="ts">


</script>

<style lang="scss" scoped>
.basket-card {
  box-shadow: 0 0 25px rgba(0, 0, 0, 8%);
  padding: 20px;

  &__title {
    font-size: 20px;
    font-weight: 600;
  }

  &__title-price {
    font-weight: 600;
  }

  &__total-price {
    font-size: 40px;
    font-weight: 500;
    line-height: 40px;

    span {
      margin-left: 5px;
      font-size: 30px;
      font-weight: 400;
    }
  }
}
</style>
