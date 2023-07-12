import {routeNames} from '@/router/RouteNames'

export interface ILeftMenu {
  id: string
  title: string;
  to?: string;
  icon?: string;
  sort?: number;
  color?: string;
  child?: ILeftMenu[];
}

// export interface IChild {
//   id: string
//   title: string;
//   to?: string;
//   icon?: string;
//   sort?: number;
//   color?: string;
//   child?: IChild[];
// }

const leftMenu: ILeftMenu[] = [
  {
    id: 'electronics',
    title: 'Электроника',
    icon: 'mdi-laptop',
    sort: 1,
    child: [
      {
        id: 'smartphones',
        to: routeNames.electronics.smartphones,
        title: 'Смартфоны',
        icon: 'mdi-cellphone',
        sort: 1,
      },
      {
        id: 'laptops',
        to: routeNames.electronics.laptops,
        title: 'Ноутбуки',
        icon: 'mdi-laptop',
        sort: 2,
      },
    ],
  },
  {
    id: 'clothing',
    title: 'Одежда и <br/> аксессуары',
    icon: 'mdi-hanger',
    sort: 2,
    child: [
      {
        id: 'mens',
        title: 'Мужская',
        icon: 'mdi-face-man-profile',
        sort: 1,
        child: [
          {
            id: 'men-shirts',
            to: routeNames.clothing.mens.shirts,
            title: 'Рубашки',
            icon: 'mdi-tshirt-crew-outline',
            sort: 1,
          },
          {
            id: 'men-shoes',
            to: routeNames.clothing.mens.shoes,
            title: 'Обувь',
            icon: 'mdi-shoe-formal',
            sort: 2,
          },
          {
            id: 'men-watches',
            to: routeNames.clothing.mens.watches,
            title: 'Часы',
            icon: 'mdi-watch',
            sort: 3,
          },
        ],
      },
      {
        id: 'woman',
        title: 'Женская',
        icon: 'mdi-face-woman-profile',
        sort: 2,
        child: [
          {
            id: 'woman-dresses',
            to: routeNames.clothing.woman.dresses,
            title: 'Платья',
            icon: 'mdi-tshirt-crew',
            sort: 1,
          },
          {
            id: 'woman-shoes',
            to: routeNames.clothing.woman.shoes,
            title: 'Обувь',
            icon: 'mdi-shoe-heel',
            sort: 2,
          },
          {
            id: 'woman-bags',
            to: routeNames.clothing.woman.bags,
            title: 'Сумки',
            icon: 'mdi-purse',
            sort: 3,
          },
          {
            id: 'woman-watches',
            to: routeNames.clothing.woman.watches,
            title: 'Часы',
            icon: 'mdi-watch',
            sort: 4,
          },
        ],
      },
    ],
  },
  {
    id: 'beauty',
    title: 'Красота<br/>и здоровье',
    icon: 'mdi-mirror',
    sort: 3,
    child: [
      {
        id: 'beauty-fragrances',
        to: routeNames.beauty.fragrances,
        title: 'Парфюмерия',
        icon: 'mdi-water',
        sort: 1,
      },
      {
        id: 'beauty-skincare',
        to: routeNames.beauty.skincare,
        title: 'Уход за лицом',
        icon: 'mdi-lotion',
        sort: 2,
      },
      {
        id: 'fragrances-sunglasses',
        to: routeNames.beauty.sunglasses,
        title: 'Очки',
        icon: 'mdi-sunglasses',
        sort: 3,
      },
    ],
  },
  {
    id: 'jewelry',
    to: routeNames.jewelry,
    title: 'Ювелирные<br/>украшения',
    icon: 'mdi-ring',
    sort: 4,
  },
  {
    id: 'interior',
    title: 'Для дома<br/>и дачи',
    icon: 'mdi-home-city-outline',
    sort: 5,
    child: [
      {
        id: 'interior-furniture',
        to: routeNames.interior.furniture,
        title: 'Фурнитура',
        icon: 'mdi-table-furniture',
        sort: 1,
      },
      {
        id: 'interior-homeDecoration',
        to: routeNames.interior.homeDecoration,
        title: 'Украшения',
        icon: 'mdi-image-frame',
        sort: 2,
      },
      {
        id: 'interior-lighting',
        to: routeNames.interior.lighting,
        title: 'Освещение',
        icon: 'mdi-ceiling-light',
        sort: 3,
      },
    ],
  },
]

export default leftMenu
