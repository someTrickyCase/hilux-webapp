import { useEffect, useState } from "react";
import { useStore, useProductID } from "@/store/stroe";
import { useRouter } from "next/navigation";
import parser from "html-react-parser";

import { Button } from "../ui/button";
import { ProductType } from "@/types/dataType";

const FeedCard = ({ item }: { item: ProductType }) => {
    const navigator = useRouter();

    if (item.status !== "publish") return;

    const [isSelected, setIsSelected] = useState(false);
    const { cart, addToCart, removeFromCart } = useStore();
    const { setProductID } = useProductID();

    useEffect(() => {
        cart.map((cartItem: ProductType) => {
            if (item.sku === cartItem.sku) setIsSelected(true);
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

    function handleShowProduct() {
        setProductID(item.id);
        navigator.push(`/shop/${item.slug}`);
    }

    return (
        <div className='flex flex-col w-[80%] gap-[10px] mb-[20px] bg-[#fff]/[0.03] py-[40px] px-[20px] rounded-2xl'>
            <div className='flex justify-between'>
                <div className='relative rounded-xl w-[100px] h-[100px] overflow-x-scroll flex snap-x '>
                    <div className='h-full w-[10px] bg-orange absolute' />
                    {item.images.map((image) => (
                        <img
                            key={JSON.stringify(image)}
                            className='snap-always snap-start'
                            src={image.src}
                            alt={image.alt}
                        />
                    ))}
                </div>
                <div className=' text-sm font-light flex flex-col justify-between'>
                    <div>
                        <p>Артикул:</p>
                        <p>{item.sku}</p>
                    </div>
                    <p className='text-orange text-2xl font-black '>{item.price} руб</p>
                </div>
            </div>
            <h2 className='text-xl font-bold'>{item.name}</h2>
            <div className='text-sm font-light'>{parser(item.short_description)}</div>

            <Button asChild>
                <div
                    onClick={handleShowProduct}
                    className='text-xl h-[50px] !bg-black !text-orange'>
                    Подробнее
                </div>
            </Button>

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
