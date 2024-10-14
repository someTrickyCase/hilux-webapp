"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/stroe";
import { cn } from "@/lib/utils";

import { Button } from "./button";
import { ProductType } from "@/types/dataType";

const Counter = ({ item, className }: { item: ProductType; className?: string }) => {
    const [state, setState] = useState<{ isSelected: boolean; quantity?: number }>({
        isSelected: false,
        quantity: 0,
    });
    const { cart, addToCart, removeFromCart, setProductQuantity } = useStore();

    useEffect(() => {
        cart.map((cartItem: ProductType) => {
            if (cartItem.sku === item.sku) {
                setState({ isSelected: true, quantity: cartItem.quantity });
            }
        });
    }, [cart, item.sku]);

    function handleSelect() {
        if (state.isSelected) {
            removeFromCart(item);
            setState({ isSelected: false, quantity: 0 });
        }
        if (!state.isSelected) {
            addToCart({ ...item, quantity: 1 });
            setState({ isSelected: true, quantity: 1 });
        }
        return;
    }

    function increase() {
        if (state.quantity) setProductQuantity(state.quantity + 1, item);
        setState((prev: any) => ({ isSelected: prev.isSelected, quantity: prev.quantity + 1 }));
        return;
    }

    function decrease() {
        if (state.quantity && state.quantity <= 1) return;
        if (state.quantity) setProductQuantity(state.quantity - 1, item);
        setState((prev: any) => ({ isSelected: prev.isSelected, quantity: prev.quantity - 1 }));
        return;
    }

    return (
        <div className={cn("flex items-center justify-between gap-[10px] w-full", className)}>
            <Button asChild>
                <div
                    onClick={handleSelect}
                    className={`w-full px-[10px] cursor-pointer text-white text-xl font-extrabold h-[50px] hover:text-orange hover:!bg-black transition-all ${
                        state.isSelected
                            ? "!bg-black !text-orange !border-orange !border"
                            : "!bg-orange text-white"
                    }`}>
                    {state.isSelected ? "Добавлено" : "В корзину"}
                </div>
            </Button>
            {state.isSelected ? (
                <div className='h-[50px] flex items-center border-black border-[2px] rounded-lg w-full px-[5px] justify-between'>
                    <div className='bg-black w-[40px] h-[35px] flex items-center justify-center rounded-lg'>
                        <p>{state.quantity}</p>
                    </div>
                    <button
                        onClick={decrease}
                        className='flex justify-center items-center  active:animate-ping  w-[32px] h-[32px] bg-orange text-2xl font-bold text-black rounded-full'>
                        <p>-</p>
                    </button>
                    <button
                        onClick={increase}
                        className='flex justify-center items-center active:animate-ping w-[32px] h-[32px] bg-orange text-2xl font-bold text-black rounded-full'>
                        <p>+</p>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Counter;
