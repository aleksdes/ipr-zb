import { INavbarMenuBtns } from '@/types/navbarMenu'

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



