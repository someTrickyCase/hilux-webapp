"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, useUser } from "@/store/stroe";

import { Button } from "@/components/ui/button";
import Allert from "@/components/widgets/Allert";
import { ProductType } from "@/types/dataType";
import { postNewOrder } from "@/api/wooComerce";
import { useTelegram } from "@/hooks/useTelegram";
import { postNewLead, updateProductRowsInLead } from "@/api/bitrix";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

const OrderPage = () => {
    const Telegram = useTelegram();
    const { setUser } = useUser();
    const { cart } = useStore();
    const [isAllert, setIsAllert] = useState(false);

    const navigator = useRouter();
    const refInputPhone: React.RefObject<HTMLInputElement> = useRef(null);
    const refInputName: React.RefObject<HTMLInputElement> = useRef(null);
    const refInputEmail: React.RefObject<HTMLInputElement> = useRef(null);
    const refInputNote: React.RefObject<HTMLTextAreaElement> = useRef(null);

    // const { user } = useUser();

    function getTotalPrice() {
        let totalPrice: number = 0;
        cart.map((item: any) => {
            totalPrice += +item.price;
        });
        return totalPrice;
    }

    function handleBack() {
        navigator.back();
    }

    function handleButtonReady() {
        const queryID = Telegram.webApp?.initDataUnsafe.query_id;
        const name = refInputName.current?.value;
        const phone = refInputPhone.current?.value;
        const email = refInputEmail.current?.value;
        const note = refInputNote.current?.value;

        if (name && phone && email) {
            const bitrixProductRows: {}[] = [];
            const productsID: {}[] = [];
            cart.map((item: ProductType) => {
                productsID.push({ product_id: item.id });
                bitrixProductRows.push({
                    PRODUCT_ID: item.id.toString(),
                    PRODUCT_NAME: `https://hiluxtoyota.ru/product/${item.slug}/`,
                    PRICE: item.price,
                    QUANTITY: item.quantity,
                });
            });

            // make bitrix lead
            let bitrixID: number;
            const leadData = {
                fields: {
                    COMMENTS: note,
                    HONORIFIC: "hilux-web-app",
                    SOURCE_DESCRIPTION: "hilux-web-app",
                    UF_CRM_1728573871: "Мы получили и обрабатываем Ваш заказ",
                    TITLE: `${name} hilux-bot`,
                    NAME: name,
                    OPPORTUNITY: getTotalPrice(),
                    PHONE: [{ VALUE: `${phone}` }],
                    EMAIL: [{ VALUE: `${email}` }],
                },
            };
            postNewLead(leadData).then((res) => {
                console.log(res, leadData, "BITRIX RES");
                if (res.result) {
                    bitrixID = +res.result;
                    updateProductRowsInLead(+res.result, { ROWS: bitrixProductRows });
                } else {
                    setIsAllert(true);
                    setTimeout(() => {
                        setIsAllert(false);
                    }, 2000);
                }
            });

            // make WC order

            const orderData = {
                origin: "tg-bot-hilux",
                payment_method: "после получения",
                billing: {
                    first_name: name,
                    phone: phone,
                    email: email,
                },
                line_items: [...productsID],
            };

            postNewOrder(orderData).then((res) => {
                console.log(res, orderData, "WC RES");
                if (!res.id) {
                    setIsAllert(true);
                    setTimeout(() => {
                        setIsAllert(false);
                    }, 2000);
                } else {
                    setUser({ bitrixID, orderID: res.id, queryID, name, phone, email, note });
                    navigator.push("/order/new");
                }
            });
        } else {
            setIsAllert(true);
            setTimeout(() => {
                setIsAllert(false);
            }, 2000);
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='w-full h-[50px] flex items-center px-[20px] justify-between'>
                <div onClick={handleBack} className='flex items-center gap-[24px]'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='size-6'>
                        <path
                            fillRule='evenodd'
                            d='M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z'
                            clipRule='evenodd'
                        />
                    </svg>
                    <p className='text-xl font-[600]'>Hilux Toyota</p>
                </div>
                <Image
                    src='/logo.png'
                    width={50}
                    height={35}
                    className='h-[35px]'
                    alt='toyota_logo'
                />
                {/* <img src='/logo.png' className='h-[35px]' alt='toyota_logo' /> */}
            </div>
            <h1 className='w-full flex justify-center mt-[20px] mb-[20px] text-2xl font-extrabold text-orange'>
                Детали заказа
            </h1>
            <div className='w-full flex flex-col gap-[10px] ml-[30px]'>
                <div>
                    <p className='text-lg mb-[5px]'>Ваше Имя</p>
                    <div className='border border-orange w-[300px] h-[40px] rounded-lg'>
                        <input
                            ref={refInputName}
                            spellCheck={false}
                            placeholder='Имя'
                            type='text'
                            className='bg-transparent border-none outline-none px-[10px] h-full'
                        />
                    </div>
                </div>
                <div>
                    <p className='text-lg mb-[5px]'>Номер телефона</p>
                    <div className='border border-orange w-[300px] h-[40px] rounded-lg'>
                        <input
                            ref={refInputPhone}
                            spellCheck={false}
                            placeholder='Телефон'
                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                            type='tel'
                            className='bg-transparent border-none outline-none px-[10px] h-full'
                        />
                    </div>
                </div>
                <div className='mb-[30px]'>
                    <p className='text-lg mb-[5px]'>Адрес электронной почты</p>
                    <div className='border border-orange w-[300px] h-[40px] rounded-lg'>
                        <input
                            ref={refInputEmail}
                            spellCheck={false}
                            placeholder='Email'
                            pattern='.+@example\.com'
                            type='email'
                            className='bg-transparent border-none outline-none px-[10px] h-full'
                        />
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col px-[20px] gap-[5px]'>
                <h2 className='text-xl font-bold'>Дополнительно</h2>
                <p className='text-sm font-extralight mb-[5px]'>
                    Примечание к заказу (не обязательно)
                </p>
                <div className='border border-orange w-full h-[120px] rounded-lg'>
                    <textarea
                        ref={refInputNote}
                        spellCheck={false}
                        className='bg-transparent border-none outline-none p-[10px] h-full'
                    />
                </div>
                <p className='text-sm font-light mt-[5px]'>
                    <span className='text-lg text-orange'>*</span> после форормления заказа наш
                    мененджер свяжется с Вами в ближайшее рабочее время
                </p>
            </div>
            <div className='h-fit ml-[20px] mt-[30px]'>
                <Button className='cursor-pointer text-lg bg-orange active:animate-ping' asChild>
                    <div onClick={handleButtonReady} className='w-[150px]'>
                        Готово
                    </div>
                </Button>
            </div>
            <Footer className='absolute top-[100vh]' />
            {isAllert ? <Allert /> : null}
        </div>
    );
};

export default OrderPage;
