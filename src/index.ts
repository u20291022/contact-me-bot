import "dotenv/config"
import { TelegramBot } from "./bot/bot"

async function main() {
  const telegramToken = process.env.TELEGRAM_TOKEN

  if (!telegramToken) {
    throw Error("Add TELEGRAM_TOKEN in .env file!")
  }

  const telegramBot = new TelegramBot(telegramToken)

  await telegramBot.launch()
}

main()