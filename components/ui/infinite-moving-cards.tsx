"use client";

import React, { useEffect, useState } from "react";
import { useProductID } from "@/store/stroe";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/dataType";

import { Button } from "./button";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: ProductType[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const { setProductID } = useProductID();
    const navigator = useRouter();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}>
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}>
                {items.map((item, idx) => (
                    <li
                        className='w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-orange px-8 py-[5px] md:w-[450px]'
                        style={{
                            background:
                                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                        }}
                        key={item.sku}>
                        <div className='flex flex-col items-center'>
                            <div className='w-full flex justify-between mb-[20px]'>
                                <div className='relative w-[120px] h-[120px] rounded-lg overflow-hidden'>
                                    <div className='bg-orange w-[5px] h-[120px] absolute' />
                                    <img
                                        className='w-[120px]'
                                        src={item.images[0].src}
                                        alt={item.images[0].alt}
                                    />
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <div className='flex flex-col items-start text-sm font-light'>
                                        <p>Артикул:</p>
                                        <p>{item.sku}</p>
                                    </div>
                                    <div>
                                        <h2 className='text-lg font-bold'>{item.price} руб.</h2>
                                    </div>
                                </div>
                            </div>
                            <h2 className='w-full text-md font-bold mb-[80px] max-h-[80px]'>
                                {item.name}
                            </h2>
                            <Button asChild>
                                <div
                                    onClick={() => {
                                        setProductID(item.id);
                                        navigator.push(`/shop/${item.slug}`);
                                    }}
                                    className='cursor-pointer absolute bottom-1 h-[50px] w-[200px] !bg-orange hover:scale-[1.01]'>
                                    <p className='text-lg'>Подробнее</p>
                                </div>
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
