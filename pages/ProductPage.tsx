"use client";

import { useEffect, useState } from "react";
import { useProductID, useStore } from "@/store/stroe";
import { getProduct } from "@/api/wooComerce";
import { ProductType } from "@/types/dataType";
import parser from "html-react-parser";

import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";
import TabsTable from "@/components/widgets/TabsTable";
import { Button } from "@/components/ui/button";

const ProductPage = () => {
    const { productID } = useProductID();
    const [product, setProduct] = useState<ProductType>();

    const [isSelected, setIsSelected] = useState(false);
    const { cart, addToCart, removeFromCart } = useStore();

    useEffect(() => {
        getProduct(productID).then((res) => setProduct(res));

        cart.map((cartItem: ProductType) => {
            if (productID === cartItem.id) setIsSelected(true);
        });
    }, []);

    function handleSelect() {
        if (isSelected) {
            removeFromCart(product);
            setIsSelected(false);
        }
        if (!isSelected) {
            addToCart(product);
            setIsSelected(true);
        }
    }

    return (
        <div>
            <Header navigateBack={true} />
            {product ? (
                <div>
                    <div className='mt-[80px]  h-[300px]'>
                        <div className='relative rounded-xl mx-[20px] overflow-x-scroll flex snap-x'>
                            <div className='h-full w-[10px] bg-orange absolute' />
                            {product?.images.map((image) => (
                                <img
                                    key={JSON.stringify(image)}
                                    className='h-[300px] snap-always snap-start'
                                    src={image.src}
                                    alt={image.alt}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center w-full px-[20px] mt-[20px]'>
                        <h2 className=' text-xl font-bold'>{product?.name}</h2>
                    </div>
                    <div className='flex items-center w-full px-[20px] mt-[5px]'>
                        {parser(product.short_description)}
                    </div>
                    <div className='flex items-center w-full px-[20px] mt-[5px]'>
                        <p>Артикул: {product.sku}</p>
                    </div>
                    <div className='mt-[20px] flex justify-between px-[20px] items-center'>
                        <Button asChild>
                            <div
                                onClick={handleSelect}
                                className={`w-[150px] cursor-pointer text-white text-xl font-extrabold h-[50px] ${
                                    isSelected
                                        ? "!bg-black text-orange border border-orange"
                                        : "!bg-orange text-white"
                                }`}>
                                {isSelected ? "Добавлено" : "В корзину"}
                            </div>
                        </Button>
                        <h3 className='text-2xl font-bold'>{product.price} руб.</h3>
                    </div>
                    <TabsTable description={product.description} className='mt-[20px] mb-[40px]' />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ProductPage;
