import { ProductType } from "@/types/dataType";
import React, { useState } from "react";
import { Button } from "../ui/button";

const CartCard = ({
    item,
    deleteHandler,
}: {
    item: ProductType;
    deleteHandler: (item: ProductType) => void;
}) => {
    const [isSelected] = useState(false);

    function handleDelete() {
        deleteHandler(item);
    }

    return (
        <div className='flex flex-col w-[90%] gap-[10px] mb-[10px] bg-[#fff]/[0.03] py-[10px] px-[20px] rounded-2xl'>
            <div className='flex gap-[12px] justify-between'>
                <div className='relative rounded-xl w-[100px] h-[100px] overflow-x-scroll flex snap-x '>
                    <div className='h-full w-[10px] bg-orange absolute' />
                    {item.images.map((image) => (
                        <img className='snap-always snap-start' src={image.src} alt={image.alt} />
                    ))}
                </div>

                <h2 className='text-sm font-bold w-[200px]'>{item.name}</h2>
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
