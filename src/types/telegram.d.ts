export interface TextMessage {
  text: string,
  message_id: number,
  chat: { id: number }
  from: { id: number, first_name: string }
}

export interface BotCommand {
  command: string;
  description: string;
}