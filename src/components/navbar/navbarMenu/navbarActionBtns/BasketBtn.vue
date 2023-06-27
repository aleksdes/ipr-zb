<template>
  <v-menu
    :disabled='basketData.length === 0'
    open-on-hover
    open-on-click
    :close-on-content-click='false'
    location='bottom right'
  >
    <template v-slot:activator='{ props }'>
      <v-btn
        class='pa-0'
        size='x-small'
        icon
      >
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
      </v-btn>
    </template>

    <BasketBtnModalProducts />
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
import BasketBtnModalProducts from './basketBtn/BasketBtnModalProducts.vue'

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
</script>
