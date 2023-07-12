import { INavbarMenuBtns } from '@/types/navbarMenu'

export const navbarMenuBtns: INavbarMenuBtns[] = [
  { id: 'notificationBtn', component: 'NotificationBtn', actionMenu: 'Notifications'},
  { id: 'likedProductsBtn', component: 'LikedProductsBtn'},
  { id: 'basketBtn', component: 'BasketBtn'},
  { id: 'profileBtn', component: 'ProfileBtn'},
]

export const bottomNavbarMenuBtns: INavbarMenuBtns[] = [
  { id: 'notificationBtn', component: 'NotificationBtn', actionMenu: 'Notifications'},
  { id: 'likedProductsBtn', component: 'LikedProductsBtn', typeLink: true},
  { id: 'basketBtn', component: 'BasketBtn', typeLink: true},
  { id: 'profileBtn', component: 'ProfileBtn'},
]



