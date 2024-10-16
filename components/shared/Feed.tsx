import React, { useEffect, useState } from "react";
import FeedCard from "../widgets/FeedCard";
import { ProductType } from "@/types/dataType";
import { cn } from "@/lib/utils";

const Feed = ({ products, className }: { products?: ProductType[]; className?: string }) => {
    const [state, setState] = useState(products);

    useEffect(() => {
        setState(products);
    }, [products]);

    return (
        <div className={cn(`w-full flex items-center justify-center`, className)}>
            <div className='w-[80%] flex flex-col items-center mt-[20px] gap-[10px] md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                {state?.map((item: ProductType) => (
                    <FeedCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
