import { User } from "./user"

export type Conversation = {
  id: number
  user1_id: number
  user2_id: number
  created_at: string
  updated_at: string
  messages: Message[]
  user1: User
  user2: User
}

export type Message = {
  id: number
  conversation_id: number
  sender_id: number
  receiver_id: number
  content: string
  created_at?: string
  updated_at?: string
}

export type ContactMessage = {
  name: string
  type: string
  email: string
  message: string
}