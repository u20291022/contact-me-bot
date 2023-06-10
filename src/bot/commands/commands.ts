import { BotCommand } from "../../types/telegram"

class Commands {
  public commands: BotCommand[] = [
    { "command": "start", "description": "Starts the bot." }
  ]

  public get = (): BotCommand[] => {
    return this.commands
  }

  public has = (command: string): boolean => {
    return !!this.commands.filter(cmd => { return cmd.command === command })[0]
  }

  // skip @username replacement because i disabled groups
  public isCommand(text: string): boolean {
    const words = text.split(" ")
    const firstWord = words[0]

    return firstWord.slice(0, 1) === "/"
  }

  public extract(commandText: string): string {
    const words = commandText.split(" ")
    const firstWord = words[0]

    return firstWord.replace("/", "")
  }

  public equals(commandText1: string, commandText2: string): boolean {
    const command1 = this.extract(commandText1)
    const command2 = this.extract(commandText2)

    return command1 === command2
  }
}

export const commands = new Commands()