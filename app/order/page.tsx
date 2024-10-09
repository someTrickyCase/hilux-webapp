import { TelegramProvider } from "@/hooks/useTelegram";
import OrderPage from "@/pages/OrderPage";

const page = () => {
    return (
        <TelegramProvider>
            <OrderPage />
        </TelegramProvider>
    );
};

export default page;
