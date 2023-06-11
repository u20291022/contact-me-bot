export interface Message {
  text?: string,
  message_id: number,
  chat: { id: number },
  from?: { id: number, first_name: string }, // ? is because telegraf gives error on reply_to_message
  reply_to_message?: Message
}