"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/stroe";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/dataType";

import CartCard from "@/components/widgets/CartCard";
import { Button } from "@/components/ui/button";

const ProductCartPage = () => {
    const { cart, removeFromCart } = useStore();
    const [state, setState] = useState<ProductType[]>([]);
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

    function handleDelete(item: ProductType) {
        removeFromCart(item);
    }

    function handleOrder() {
        navigator.push("/order");
    }

    function handleButtonBack() {
        navigator.back();
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='h-[50px] flex items-center justify-center'>
                <div onClick={handleButtonBack} className='absolute left-[20px] text-[#3d3d3d]'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='size-8'>
                        <path
                            fillRule='evenodd'
                            d='M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z'
                            clipRule='evenodd'
                        />
                    </svg>
                </div>
                <h2 className='text-2xl font-bold text-orange'>Корзина</h2>
            </div>
            <div
                className={`${
                    state.length === 0 ? "block" : "hidden"
                } w-full h-[90vh] flex items-center justify-center flex-col gap-[20px]`}>
                <img className='grayscale opacity-[0.2] filter  h-[80px]' src='logo.png' alt='' />
                <p className='text-[#222222] uppercase font-bold'>Корзина пуста</p>
            </div>
            <div className='w-full flex flex-col items-center mt-[20px] gap-[10px]'>
                {state.map((item) => (
                    <CartCard key={JSON.stringify(item)} deleteHandler={handleDelete} item={item} />
                ))}
                <div
                    className={`${
                        state.length === 0 ? "hidden" : "block"
                    }  w-[60%] flex flex-col items-center bg-black rounded-lg py-[10px] gap-[6px]`}>
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
        </div>
    );
};

export default ProductCartPage;
