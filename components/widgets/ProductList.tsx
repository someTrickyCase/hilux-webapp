"use client";

import React, { useEffect, useState } from "react";
import { useTelegram } from "@/hooks/useTelegram";
import Card from "../ui/Card";

const ProductList = () => {
    const tg = useTelegram();
    const [addedItems, setAddedItems] = useState<{}[]>([]);
    const arr = [
        {
            title: "Колеса",
            price: 100,
            articleCode: "sdf123f",
            isAvailable: true,
        },
        {
            title: "ПТФ",
            price: 89,
            articleCode: "sdf123f",
            isAvailable: true,
        },
        {
            title: "Комплект подвески",
            price: 313,
            articleCode: "sdf123f",
            isAvailable: true,
        },
        {
            title: "Пружины",
            price: 5483,
            articleCode: "sdf123f",
            isAvailable: true,
        },
        {
            title: "Шноркель",
            price: 3213,
            articleCode: "sdf123f",
            isAvailable: true,
        },
        {
            title: "Кенгурятник",
            price: 55,
            articleCode: "sdf123f",
            isAvailable: true,
        },
        {
            title: "Люстра",
            price: 584,
            articleCode: "sdf123f",
            isAvailable: true,
        },
        {
            title: "Проставки",
            price: 4909,
            articleCode: "sdf123f",
            isAvailable: true,
        },
        {
            title: "Бампер",
            price: 231,
            articleCode: "sdf123f",
            isAvailable: true,
        },
        {
            title: "Лебедка",
            price: 1800,
            articleCode: "sdf123f",
            isAvailable: true,
        },
    ];

    useEffect(() => {
        tg.webApp?.onEvent("mainButtonClicked", () => {
            tg.webApp?.MainButton.hide();
            tg.webApp?.close();
        });
    }, [tg]);

    const setCart = (item: any) => {
        tg.webApp?.MainButton.show();
        const alreadyAdded = addedItems.find((newItem: any) => item.title === newItem.title);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter((newItem: any) => item.title === newItem.title);
        } else {
            newItems = [...addedItems, item];
        }

        setAddedItems(newItems);

        if (addedItems.length === 0) {
            tg.webApp?.MainButton.hide();
        } else {
            tg.webApp?.MainButton.setText(`${addedItems.length}`);
        }
    };

    return (
        <div className='grid grid-cols-2 w-full items-center justify-center gap-[16px] mt-[60px]'>
            {arr.map((item) => (
                <Card data={item} setCart={setCart} key={JSON.stringify(item)} />
            ))}
        </div>
    );
};

export default ProductList;
