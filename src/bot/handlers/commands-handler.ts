import { ExceptionHandlerD, LogClassCreationD } from "../../types/decorators";
import { TextMessage } from "../../types/telegram";
import { commands } from "../commands/commands";
import { startCommand } from "../commands/start-command";
import { Telegram } from "telegraf"

@LogClassCreationD
@ExceptionHandlerD()
class CommandsHandler {
  public handle(message: TextMessage, methods: Telegram) {
    const command = message.text
    
    if (commands.equals(command, "start")) {
      startCommand.handle(message, methods)
    }
  }
}

export const commandsHandler = new CommandsHandler()