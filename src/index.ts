import "dotenv/config"
import { TelegramBot } from "./bot/bot"

async function main() {
  const telegramToken = process.env.TELEGRAM_TOKEN as string
  const telegramBot = new TelegramBot(telegramToken)

  await telegramBot.launch()
}

main()