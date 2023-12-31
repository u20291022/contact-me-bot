import { Telegram } from "telegraf"
import { ExceptionHandlerD, LogClassCreationD } from "../types/decorators"
import { Messages } from "../types/messages-handler"
import { Message } from "../types/telegram"
import { fileSystem } from "../utils/filesystem"
import { logger } from "../utils/logger"

@LogClassCreationD
@ExceptionHandlerD()
class MessagesHandler {
  private botOwnerId = -1
  private messagesFolderPath = "data"
  private messagesFileName = "messages.json"
  private messagesFilePath = this.messagesFolderPath + "/" + this.messagesFileName
  private messages: Messages = {}

  constructor() {
    // create or read messages data
    fileSystem.makeDirectoryPath(this.messagesFolderPath)
    
    if (!fileSystem.exists(this.messagesFilePath)) {
      fileSystem.writeJson(this.messagesFilePath, {})
    }
    else {
      const jsonData = fileSystem.readJson(this.messagesFilePath)
      this.messages = jsonData || {}
    }

    // get owner id from .env
    const rawOwnerId = process.env.OWNER_ID

    if (!rawOwnerId) {
      throw new Error("Add OWNER_ID in .env file!")
    }

    this.botOwnerId = Number(rawOwnerId)
  }

  public handle(message: Message, methods: Telegram) {
    if (!message.from) {
      return
    }

    const sendedMessageSenderId = message.from.id
    const sendedMessageId = message.message_id

    if (sendedMessageSenderId === this.botOwnerId) {
      if (!message.reply_to_message) {
        methods.sendMessage(this.botOwnerId, "You must select the message you are replying to!")
        return
      }

      const repliedMessageId = message.reply_to_message.message_id
      const repliedMessageSenderId = this.messages[repliedMessageId]
      
      if (repliedMessageSenderId) {
        methods.copyMessage(repliedMessageSenderId, this.botOwnerId, sendedMessageId) // i dont know how to wrap "methods" functions
          .catch(exception => logger.write(`[copyMessage] Some error was throwed:\n` + exception))
      }
    }
    else {
      methods.forwardMessage(this.botOwnerId, sendedMessageSenderId, sendedMessageId)
        .catch(exception => logger.write(`[forwardMessage] Some error was throwed:\n` + exception))

      // + 1 because forwarded message will have id greater by one
      // {in user pm with bot} [10] hello -> [*forwards*] -> {in owner pm with bot} [11 index](*forwarded*) hello
      const messageIdToSave = sendedMessageId + 1

      this.messages[messageIdToSave] = sendedMessageSenderId.toString()
      this.updateMessagesFileData()
    }
  }

  private updateMessagesFileData() {
    fileSystem.writeJson(this.messagesFilePath, this.messages)
  }
}

export const messagesHandler = new MessagesHandler()