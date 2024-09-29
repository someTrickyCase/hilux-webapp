import { FeedCardType } from "@/types/dataType";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

import { useStore } from "@/store/stroe";

const CartCard = ({
    item,
    deleteHandler,
}: {
    item: FeedCardType;
    deleteHandler: (item: FeedCardType) => void;
}) => {
    const [description, setDescription] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    function handleDelete() {
        deleteHandler(item);
    }

    return (
        <div className='flex flex-col w-[90%] gap-[10px] mb-[10px] bg-[#fff]/[0.03] py-[10px] px-[20px] rounded-2xl'>
            <div className='flex gap-[12px] border-l-[4px] border-l-orange rounded-xl'>
                {typeof item.images === "string" ? (
                    <img className='h-[50px] rounded-lg' src={item.images} alt={item.title} />
                ) : (
                    <div className='flex w-[50px] overflow-y-scroll no-scrollbar'>
                        {item.images?.map((item) => (
                            <img className='h-[50px] rounded-lg' src={item} />
                        ))}
                    </div>
                )}
                <h2 className='text-sm font-bold'>{item.title}</h2>
            </div>
            <div className=' text-sm font-light flex justify-between px-[10px]'>
                <p className='text-orange text-lg font-black '>{item.price} руб</p>
                <Button asChild>
                    <div
                        onClick={handleDelete}
                        className={`cursor-pointer !bg-orange text-md font-extrabold h-[30px] hover:text-orange hover:!bg-black ${
                            isSelected ? "!bg-black !text-orange" : undefined
                        }`}>
                        Удалить
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default CartCard;
