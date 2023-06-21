<template>
  <v-menu
    :disabled='basketData.length === 0'
    open-on-hover
    :close-on-content-click='false'
    location='bottom right'
  >
    <template v-slot:activator='{ props }'>
      <v-badge
        :model-value='basketData.length > 0'
        :content='basketData.length'
        color='orange-lighten-1'
        v-bind='props'
      >
        <v-icon
          size='30'
          class='pointer'
        >
          mdi-basket-outline
        </v-icon>
      </v-badge>
    </template>

    <v-card
      elevation='0'
      class='products'
    >
      <div class='d-flex flex-row align-center justify-space-between mb-2'>
        <span><b>Всего товаров: {{basketData.length}}</b></span>
        <v-btn
          variant='text'
          class='fs-14 fw-7 text-initial'
        >
          Очистить
        </v-btn>
      </div>

      <div class='products__list'>
        <div
          v-for='item in basketData'
          :key='item.id'
          class='products__item'
        >
          <div class='d-flex flex-row align-center'>
            <div
              class='products__box-thumbnail'
              :class='{"products__box-thumbnail--empty": !item.thumbnail}'
            >
              <v-img
                v-if='item.thumbnail'
                class='products__thumbnail'
                :src='item.thumbnail'
              />
              <v-icon
                v-else
                size='35'
              >
                mdi-image-frame
              </v-icon>


            </div>

            <div class='products__info'>
              <div class='text-left'>
                <p class='products__brand'>{{item.brand}}</p>
                <p
                  class='products__name'
                >
                  {{item.title}}
                </p>
                <p class='products__desc'>{{item.description}}</p>
              </div>
            </div>
          </div>

          <div class='d-flex flex-row align-center'>
            <p class='products__price'>{{item.price}} &#36;</p>

            <v-btn
              size='30'
              icon
            >
              <v-icon size='16'>mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <v-divider class='ma-3'/>

      <div class='d-flex flex-row align-center justify-space-between'>
        <span><b>Итого:</b></span>
        <p class='products__price'>{{totalPrice}} &#36;</p>
      </div>

      <div class='d-flex mt-6'>
        <v-btn
          color='orange-lighten-1'
          class='text-white fs-14 fw-7 text-initial ml-auto'
          elevation='0'
        >
          В корзину
        </v-btn>
      </div>

    </v-card>
  </v-menu>
</template>

<script lang="ts">
export default {
  name: 'BasketBtn',
}
</script>

<script setup lang="ts">
import {computed, ComputedRef} from 'vue'
import {Product} from '@/types/products'

const basketData: ComputedRef<Product[]> = computed((): Product[] => {
  return [
    {
      'id': 76,
      'title': 'Silver Ring Set Women',
      'description': 'Jewelry Type:RingsCertificate Type:NonePlating:Silver PlatedShapeattern:noneStyle:CLASSICReligious',
      'price': 70,
      'discountPercentage': 13.57,
      'rating': 4.61,
      'stock': 51,
      'brand': 'Darojay',
      'category': 'womens-jewellery',
      'thumbnail': '',
      'images': [
        'https://i.dummyjson.com/data/products/76/1.jpg',
        'https://i.dummyjson.com/data/products/76/2.jpg',
        'https://i.dummyjson.com/data/products/76/thumbnail.jpg',
      ],
    },
    {
      'id': 77,
      'title': 'Rose Ring',
      'description': 'Brand: The Greetings Flower Colour: RedRing Colour: GoldenSize: Adjustable',
      'price': 100,
      'discountPercentage': 3.22,
      'rating': 4.21,
      'stock': 149,
      'brand': 'Copenhagen Luxe',
      'category': 'womens-jewellery',
      'thumbnail': 'https://i.dummyjson.com/data/products/77/thumbnail.jpg',
      'images': [
        'https://i.dummyjson.com/data/products/77/1.jpg',
        'https://i.dummyjson.com/data/products/77/2.jpg',
        'https://i.dummyjson.com/data/products/77/3.jpg',
        'https://i.dummyjson.com/data/products/77/thumbnail.jpg',
      ],
    },
    {
      'id': 78,
      'title': 'Rhinestone Korean Style Open Rings',
      'description': 'Fashion Jewellery 3Pcs Adjustable Pearl Rhinestone Korean Style Open Rings For Women',
      'price': 30,
      'discountPercentage': 8.02,
      'rating': 4.69,
      'stock': 9,
      'brand': 'Fashion Jewellery',
      'category': 'womens-jewellery',
      'thumbnail': 'https://i.dummyjson.com/data/products/78/thumbnail.jpg',
      'images': [
        'https://i.dummyjson.com/data/products/78/thumbnail.jpg',
      ],
    },
    {
      'id': 79,
      'title': 'Elegant Female Pearl Earrings',
      'description': 'Elegant Female Pearl Earrings Set Zircon Pearl Earings Women Party Accessories 9 Pairs/Set',
      'price': 30,
      'discountPercentage': 12.8,
      'rating': 4.74,
      'stock': 16,
      'brand': 'Fashion Jewellery',
      'category': 'womens-jewellery',
      'thumbnail': 'https://i.dummyjson.com/data/products/79/thumbnail.jpg',
      'images': [
        'https://i.dummyjson.com/data/products/79/1.jpg',
      ],
    },
    {
      'id': 80,
      'title': 'Chain Pin Tassel Earrings',
      'description': 'Pair Of Ear Cuff Butterfly Long Chain Pin Tassel Earrings - Silver ( Long Life Quality Product)',
      'price': 45,
      'discountPercentage': 17.75,
      'rating': 4.59,
      'stock': 9,
      'brand': 'Cuff Butterfly',
      'category': 'womens-jewellery',
      'thumbnail': 'https://i.dummyjson.com/data/products/80/thumbnail.jpg',
      'images': [
        'https://i.dummyjson.com/data/products/80/1.jpg',
        'https://i.dummyjson.com/data/products/80/2.jpg',
        'https://i.dummyjson.com/data/products/80/3.png',
        'https://i.dummyjson.com/data/products/80/4.jpg',
        'https://i.dummyjson.com/data/products/80/thumbnail.jpg',
      ],
    },
  ]
})

const totalPrice = computed(() => {
  return basketData.value.reduce((acc: number, product: Product) => acc + product.price, 0)
})
</script>

<style lang="scss" scoped>
.products {
  padding: 20px;
  border-radius: 15px !important;
  box-shadow: 0 0 16px rgba(0, 0, 0, 8%) !important;

  &__list {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 8px;
  }

  &__item {
    display: grid;
    grid-template-columns: 350px auto;
    align-items: center;
    justify-content: space-between;
    grid-column-gap: 15px;
  }

  &__box-thumbnail {
    min-width: 60px;
    height: 60px;
    width: 60px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 10px;

    &--empty {
      border: 1px solid map-get($grey, "lighten-1");
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__brand {
    font-size: 10px;
    color: grey;
  }

  &__name {
    font-size: 14px;
    line-height: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 12px;
  }

  &__price {
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    color: map-get($orange, 'lighten-1');
    margin-right: 15px;
  }
}
</style>
