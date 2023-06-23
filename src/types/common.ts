export type TypeAuth = 'jwt' | 'session'

export interface INotificationMessages {
  id: number
  title: string
  text: string
  date: number
  active: boolean
}
