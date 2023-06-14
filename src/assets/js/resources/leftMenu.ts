import {routeNames} from '@/router/RouteNames'

export interface ILeftMenu {
  id: string
  to?: string;
  title: string;
  icon: string;
  sort: number;
  color?: string;
  child?: IChild[];
}

export interface IChild {
  id: string
  to?: string;
  title: string;
  icon?: string;
  sort?: number;
  color?: string;
  child?: IChild[];
}

const leftMenu: ILeftMenu[] = [
  {
    id: 'electronics',
    to: routeNames.electronics,
    title: 'Электроника',
    icon: 'mdi-laptop',
    sort: 1,
  },
  {
    id: 'clothing',
    title: 'Одежда',
    icon: 'mdi-hanger',
    sort: 2,
    child: [
      {
        id: 'mens',
        to: routeNames.clothing.mens,
        title: 'Мужская',
        icon: 'mdi-face-man-profile',
        sort: 1,
      },
      {
        id: 'woman',
        to: routeNames.clothing.woman,
        title: 'Женская',
        icon: 'mdi-face-woman-profile',
        sort: 2,
      },
    ],
  },
  {
    id: 'jewelry',
    to: routeNames.jewelry,
    title: 'Ювелирные<br/>украшения',
    icon: 'mdi-ring',
    sort: 3,
  },
]

export default leftMenu
