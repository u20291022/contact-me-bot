import { Telegraf, Telegram } from "telegraf"
import { ExceptionHandlerD, LogClassCreationD } from "../types/decorators"
import { logger } from "../utils/logger"
import { messagesHandler } from "./messages-handler"

@LogClassCreationD
@ExceptionHandlerD()
export class TelegramBot {
  public readonly me: Telegraf
  public readonly methods: Telegram
  
  constructor(token: string) {
    this.me = new Telegraf(token)
    this.methods = this.me.telegram
  }

  private listenMessages() {  
    this.me.on("message", async context => {
      const message = context.message

      messagesHandler.handle(message, this.methods)
    })
  }

  private listenStart() {
    this.me.start(async context => {
      const message = context.message

      logger.write(`User [${message.from.first_name}] with [${message.from.id}] id sent "start" command!`)
    
      context.sendMessage(
        `Hello ${message.from.first_name}!\n` +
        `Send me your important message and I will forward it to my owner.`
      )
    })
  }

  public async launch() {
    this.methods.setMyCommands([
      { "command": "start", "description": "Starts the bot." }
    ])

    this.listenStart()
    this.listenMessages()

    this.me.launch()

    const botInfo = await this.methods.getMe()
    logger.write(`Telegram bot [${botInfo.username}] was launched!`)
  }
} 