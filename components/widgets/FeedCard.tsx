import { FeedCardType } from "@/types/dataType";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

import { useStore } from "@/store/stroe";

const FeedCard = ({ item }: { item: FeedCardType }) => {
    const [description, setDescription] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const { cart, addToCart, removeFromCart } = useStore();

    useEffect(() => {
        const jsonDesc = localStorage.getItem("category-troffi");
        if (!jsonDesc) return;

        const customDescription = `${
            jsonDesc.split("/")[4].split("-").join(" ").toUpperCase() + " " + item.title
        }`;
        setDescription(customDescription);

        cart.map((cartItem: FeedCardType) => {
            if (item.article === cartItem.article) setIsSelected(true);
        });
    }, []);

    function handleSelect() {
        if (isSelected) {
            removeFromCart(item);
            setIsSelected(false);
        }
        if (!isSelected) {
            addToCart(item);
            setIsSelected(true);
        }
    }

    return (
        <div className='flex flex-col w-[80%] gap-[10px] mb-[20px] bg-[#fff]/[0.03] py-[40px] px-[20px] rounded-2xl'>
            <div className='flex justify-between border-l-[8px] border-l-orange rounded-2xl'>
                {typeof item.images === "string" ? (
                    <img className='h-[100px] rounded-lg' src={item.images} alt={item.title} />
                ) : (
                    <div className='flex w-[100px] overflow-y-scroll no-scrollbar'>
                        {item.images?.map((item) => (
                            <img className='h-[100px] rounded-lg' src={item} />
                        ))}
                    </div>
                )}

                <div className=' text-sm font-light flex flex-col justify-between'>
                    <div>
                        <p>Артикул:</p>
                        <p>{item.article}</p>
                    </div>
                    <p className='text-orange text-2xl font-black '>{item.price} руб</p>
                </div>
            </div>
            <h2 className='text-xl font-bold'>{item.title}</h2>
            <p className='text-sm font-light'>{item.description || description}</p>
            <Button asChild>
                <div
                    onClick={handleSelect}
                    className={`cursor-pointer text-white text-xl font-extrabold h-[50px] hover:text-orange hover:!bg-black ${
                        isSelected ? "!bg-black text-orange" : "!bg-orange text-white"
                    }`}>
                    {isSelected ? "Добавлено" : "В корзину"}
                </div>
            </Button>
        </div>
    );
};

export default FeedCard;
