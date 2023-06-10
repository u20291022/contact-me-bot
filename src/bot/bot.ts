import { Telegraf, Telegram } from "telegraf"
import { message } from "telegraf/filters"
import { ExceptionHandlerD, LogClassCreationD } from "../types/decorators"
import { logger } from "../utils/logger"
import { textMessagesHandler } from "./handlers/text-messages-handler"
import { commands } from "./commands/commands"

@LogClassCreationD
@ExceptionHandlerD()
export class TelegramBot {
  public readonly me: Telegraf
  public readonly methods: Telegram
  
  constructor(token: string) {
    this.me = new Telegraf(token)
    this.methods = this.me.telegram
  }

  private listenTextMessages() {
    this.me.on(message("text"), async context => {
      const message = context.message
      
      textMessagesHandler.handle(message, this.methods)
    })
  }

  public async launch() {
    this.methods.setMyCommands(commands.get())

    this.listenTextMessages()

    this.me.launch()

    const botInfo = await this.methods.getMe()
    logger.write(`Telegram bot [${botInfo.username}] was launched!`)
  }
} 