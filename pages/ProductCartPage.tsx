"use client";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import CartCard from "@/components/widgets/CartCard";
import { useStore } from "@/store/stroe";
import { FeedCardType } from "@/types/dataType";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProductCartPage = () => {
    const { cart, removeFromCart } = useStore();
    const [state, setState] = useState<FeedCardType[]>([]);
    const navigator = useRouter();

    useEffect(() => {
        setState(cart);
    }, [cart]);

    function getTotalPrice() {
        let totalPrice: number = 0;
        state.map((item) => {
            totalPrice += +item.price;
        });
        return totalPrice;
    }

    function handleDelete(item: FeedCardType) {
        removeFromCart(item);
    }

    function handleOrder() {
        navigator.push("/contact-form");
    }

    return (
        <div className='flex flex-col items-center'>
            <Header />
            <div
                className={`${
                    state.length === 0 ? "block" : "hidden"
                } w-full h-[90vh] flex items-center justify-center flex-col gap-[20px]`}>
                <img
                    className='grayscale opacity-[0.2] rounded-full filter w-[80px] h-[80px] border-[6px] border-[#3d3d3d]'
                    src='logo_troffi.png'
                    alt=''
                />
                <p className='text-[#222222] uppercase font-bold'>Корзина пуста</p>
            </div>
            <div className='w-full flex flex-col items-center mt-[80px] gap-[10px]'>
                {state.map((item) => (
                    <CartCard deleteHandler={handleDelete} item={item} />
                ))}
            </div>
            <div
                className={`${
                    state.length === 0 ? "hidden" : "block"
                } fixed bottom-[40px] w-[60%] flex flex-col items-center bg-[#fff]/[0.03] rounded-lg py-[10px] gap-[6px]`}>
                <p className='text-md font-bold'>{`Заказ на ${getTotalPrice()} руб.`}</p>
                <Button asChild>
                    <div
                        onClick={handleOrder}
                        className='cursor-pointer h-[40px] w-[80%] !bg-orange hover:bg-black hover:text-orange transition-all'>
                        <p className='text-2xl font-black'>Заказать</p>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default ProductCartPage;
