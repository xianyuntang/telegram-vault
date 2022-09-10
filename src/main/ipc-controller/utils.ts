import { TelegramError } from "@/common/gramjs";

export const formatError = (e: unknown): TelegramError => {
  return JSON.parse(JSON.stringify(e));
};
