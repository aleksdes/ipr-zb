interface IElectronics {
  smartphones: string
  laptops: string
}
interface IClothing {
  mens: {
    shirts: string
    shoes: string
    watches: string
  }
  woman: {
    dresses: string
    shoes: string
    bags: string
    watches: string
  }
}

interface IBeauty {
  fragrances: string
  skincare: string
  sunglasses: string
}
interface IHome{
  furniture: string
  homeDecoration: string
  lighting: string
}

export interface IRouteNames {
  login: string
  home: string,
  electronics: IElectronics
  clothing: IClothing
  beauty: IBeauty
  jewelry: string
  interior: IHome
  pageNotFound: string,
}
