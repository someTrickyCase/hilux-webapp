"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { useTelegram } from "@/hooks/useTelegram";
import { sendOrderData } from "@/api/apiController";
import { useStore } from "@/store/stroe";

const ContactFormPage = () => {
    const { cart } = useStore();
    const tg = useTelegram();
    const refInputPhone: React.RefObject<HTMLInputElement> = useRef(null);
    const refInputName: React.RefObject<HTMLInputElement> = useRef(null);

    useEffect(() => {
        tg.webApp?.onEvent("mainButtonClicked", () => {
            if (!refInputName.current?.value || !refInputPhone.current?.value) return;

            const orderData = {
                name: refInputName.current?.value,
                phone: refInputPhone.current?.value,
                cart,
            };
            sendOrderData(orderData);

            tg.webApp?.MainButton.hide();
            tg.webApp?.close();
        });
    }, [tg]);

    tg.webApp?.MainButton.setText("Подтвердить");
    tg.webApp?.MainButton.show();

    return (
        <div className='flex justify-center h-screen w-screen '>
            <div className='flex flex-col items-center h-fit py-[100px] px-[40px] mt-[40%]  border-[2px] border-orange rounded-2xl'>
                <h2 className='text-lg font-extrabold mb-[40px]'>Пожалуйста, заполните форму</h2>
                <div>
                    <label htmlFor='name' className='font-bold text-orange '>
                        Ваше Имя
                    </label>
                    <Input ref={refInputName} id='name' className='mb-[20px]' />
                    <label htmlFor='phone' className='font-bold text-orange'>
                        Номер телефона
                    </label>
                    <Input ref={refInputPhone} id='phone' type='tel' />
                </div>
            </div>
        </div>
    );
};

export default ContactFormPage;
