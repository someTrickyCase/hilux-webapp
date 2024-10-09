import { TelegramProvider } from "@/hooks/useTelegram";
import ConfirmOrderPage from "@/pages/ConfirmOrderPage";

const page = () => {
    return (
        <TelegramProvider>
            <ConfirmOrderPage />
        </TelegramProvider>
    );
};

export default page;
