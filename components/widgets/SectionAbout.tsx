import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ProductType } from "@/types/dataType";
import { getProductsList } from "@/api/wooComerce";

import { Button } from "../ui/button";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import Loader from "../shared/Loader";

const SectionAbout = () => {
    const navigator = useRouter();
    const [state, setState] = useState<{ mostPopular: ProductType[]; newest: ProductType[] }>({
        mostPopular: [],
        newest: [],
    });

    useEffect(() => {
        getProductsList({ orderby: "popularity", order: "desc", page: "1", perPage: "10" }).then(
            (res) =>
                setState((prev) => {
                    return {
                        mostPopular: [...res],
                        newest: [...prev.newest],
                    };
                })
        );
        getProductsList({ page: "1", perPage: "10" }).then((res) =>
            setState((prev) => {
                return {
                    mostPopular: [...prev.mostPopular],
                    newest: [...res],
                };
            })
        );
    }, []);

    function handleScrollDown() {
        const heigth = window.innerHeight;
        scrollTo({
            top: heigth,
            behavior: "smooth",
        });
    }

    function navigateToShop() {
        navigator.push("/shop");
    }

    return (
        <div className='w-full flex flex-col items-center no-scrollbar'>
            <section className='h-screen'>
                <div className='flex items-center justify-center h-[90vh]'>
                    <img
                        className='object-cover h-[90vh] absolute -z-10'
                        src='hilux_photo.webp'
                        alt='hilux_photo'
                    />
                    <div className='w-full px-[10px] flex items-center justify-center absolute top-[80px] bg-orange/[0.6]'>
                        <h2 className='cursor-default text-[35px] font-medium'>
                            Специализированный магазин тюнинга для <span>Toyota Hilux</span>
                        </h2>
                    </div>
                    <Button asChild className='absolute top-[80vh]'>
                        <div
                            onClick={navigateToShop}
                            className='cursor-pointer w-[200px] h-[50px] !text-white !border-orange/[0.1] border-[2px] !bg-orange/[0.7]  hover:!text-white hover:!border-orange hover:!bg-orange active:animate-ping'>
                            <p className='text-lg font-bold'>Перейти в каталог</p>
                        </div>
                    </Button>
                </div>
                <div
                    onClick={handleScrollDown}
                    className='text-white cursor-pointer absolute top-[93vh] left-[46vw] animate-bounce'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                        stroke='currentColor'
                        className='size-10 rotate-[35deg] '>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181'
                        />
                    </svg>
                </div>
            </section>
            <section className='h-screen w-full flex flex-col items-center'>
                {state.mostPopular.length === 0 ? (
                    <Loader />
                ) : (
                    <div>
                        <div className='mt-[80px]'>
                            <h3 className='text-2xl font-bold px-[15px]'>
                                <span className='text-orange'>Самые </span>продоваемые
                            </h3>
                            <div className='h-fit rounded-md flex flex-col antialiased bg-transparent dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
                                <InfiniteMovingCards
                                    className='w-screen  bg-transparent'
                                    items={state.mostPopular}
                                    direction='left'
                                    speed='slow'
                                />
                            </div>
                        </div>
                        <div className='mt-[40px]'>
                            <h3 className='text-2xl font-bold text-orange px-[15px]'>Новое</h3>
                            <div className='h-fit rounded-md flex flex-col antialiased bg-transparent dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
                                <InfiniteMovingCards
                                    className='w-screen'
                                    items={state.newest}
                                    direction='right'
                                    speed='slow'
                                />
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default SectionAbout;
