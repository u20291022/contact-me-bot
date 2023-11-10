import "dotenv/config";
import { TelegramBot } from "./bot/bot";

async function main() {
  const telegramToken = process.env.TELEGRAM_TOKEN;
  const ownerId = process.env.OWNER_ID;

  if (!telegramToken) {
    throw Error("Add TELEGRAM_TOKEN in .env file!");
  }

  if (!ownerId) {
    throw Error("Add OWNDER_ID in .env file!");
  }

  const telegramBot = new TelegramBot(telegramToken);

  await telegramBot.launch(ownerId);
}

main();
