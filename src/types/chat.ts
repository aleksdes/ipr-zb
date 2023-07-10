export interface IChatSendMessage {
  author: string
  timestamp: number
  text: string
}

export interface IChatMessage {
  id: number
  author: {
    id: number,
    name: string
  }
  timestamp: number
  text: string
}
