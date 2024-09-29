import { TelegramProvider } from "@/hooks/useTelegram";
import HomePage from "@/pages/HomePage";

export default function Home() {
  return (
    <TelegramProvider>
      <HomePage />
    </TelegramProvider>
  );
}
