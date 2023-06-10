import { ExceptionHandlerD, LogClassCreationD } from "../../types/decorators";
import { TextMessage } from "../../types/telegram";
import { logger } from "../../utils/logger";
import { Telegram } from "telegraf"

@LogClassCreationD
@ExceptionHandlerD()
class StartCommand {
  public handle(message: TextMessage, methods: Telegram) {
    logger.write(`User [${message.from.first_name}] with [${message.from.id}] id send "start" command!`)
    
    methods.sendMessage(
      message.chat.id,
      `Hello ${message.from.first_name}!\n` +
      `Send me your important message and I will forward it to my owner.`
    )
  }
}

export const startCommand = new StartCommand()