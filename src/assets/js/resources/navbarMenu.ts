import {markRaw} from 'vue'
import { INavbarMenuBtns } from '@/types/navbarMenu'
import ProfileBtn from '@/components/navbar/navbarMenu/navbarActionBtns/ProfileBtn.vue'
import Profile from '@/components/navbar/navbarMenu/navbarMenuComponents/Profile.vue'

export const navbarMenuBtns: INavbarMenuBtns[] = [
  { id: 'profileBtn', component: ProfileBtn, actionMenu: markRaw(Profile)},
]

