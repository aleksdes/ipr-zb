interface IElectronics {
  smartphones: string
  laptops: string
}
interface IClothing {
  mens: string
  woman: string
}
export interface IRouteNames {
  home: string,
  electronics: IElectronics
  clothing: IClothing
  pageNotFound: string,
  jewelry: string
}
