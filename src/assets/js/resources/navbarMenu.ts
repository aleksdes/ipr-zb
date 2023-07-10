import {markRaw} from 'vue'
import { INavbarMenuBtns } from '@/types/navbarMenu'
import NotificationBtn from '@/components/navbar/navbarMenu/navbarActionBtns/NotificationBtn.vue'
import LikedProductsBtn from '@/components/navbar/navbarMenu/navbarActionBtns/LikedProductsBtn.vue'
import BasketBtn from '@/components/navbar/navbarMenu/navbarActionBtns/BasketBtn.vue'
import ProfileBtn from '@/components/navbar/navbarMenu/navbarActionBtns/ProfileBtn.vue'

import Notifications from '@/components/navbar/navbarMenu/navbarMenuComponents/Notifications.vue'


export const navbarMenuBtns: INavbarMenuBtns[] = [
  { id: 'notificationBtn', component: 'NotificationBtn', actionMenu: 'Notifications'},
  { id: 'likedProductsBtn', component: 'LikedProductsBtn', actionMenu: ''},
  { id: 'basketBtn', component: 'BasketBtn', actionMenu: ''},
  { id: 'profileBtn', component: 'ProfileBtn', actionMenu: ''},
]

export const bottomNavbarMenuBtns: INavbarMenuBtns[] = [
  { id: 'notificationBtn', component: 'NotificationBtn', actionMenu: 'Notifications'},
  { id: 'likedProductsBtn', component: 'LikedProductsBtn', actionMenu: '', typeLink: true},
  { id: 'basketBtn', component: 'BasketBtn', actionMenu: '', typeLink: true},
  { id: 'profileBtn', component: 'ProfileBtn', actionMenu: ''},
]



