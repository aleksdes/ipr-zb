export interface IChatSendMessage {
  author: string
  timestamp: number
  text: string
}

export interface IChatMessage extends Omit<IChatSendMessage, 'author'>{
  id: number
  author: {
    id: number,
    name: string
  }
}
