import React, { useEffect, useState } from "react";
import FeedCard from "../widgets/FeedCard";
import { FeedCardType } from "@/types/dataType";
import { cn } from "@/lib/utils";

const Feed = ({ products, className }: { products?: FeedCardType[]; className?: string }) => {
    const [state, setState] = useState(products);

    useEffect(() => {
        setState(products);
    }, [products]);

    return (
        <div className={cn(`w-full flex flex-col items-center mt-[80px] gap-[10px]`, className)}>
            {state?.map((item: FeedCardType) => (
                <FeedCard key={JSON.stringify(item)} item={item} />
            ))}
        </div>
    );
};

export default Feed;
