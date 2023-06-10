import { ExceptionHandlerD, LogClassCreationD } from "../../types/decorators"
import { TextMessage } from "../../types/telegram"
import { commands } from "../commands/commands"
import { commandsHandler } from "./commands-handler"
import { Telegram } from "telegraf"

@LogClassCreationD
@ExceptionHandlerD()
class TextMessagesHandler {  
  public handle(message: TextMessage, methods: Telegram) {
    const text = message.text

    if (commands.isCommand(text)) {
      commandsHandler.handle(message, methods)
      return
    }

    //...
  }
}

export const textMessagesHandler = new TextMessagesHandler()