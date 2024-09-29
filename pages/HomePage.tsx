"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/shared/Header";
import CategoryCard from "@/components/widgets/CategoryCard";
import { dataType } from "@/types/dataType";
import Loader from "@/components/shared/Loader";
import { fetchHomePageData } from "@/api/apiController";

const HomePage = () => {
    const [state, setState] = useState<{ vcms: dataType[]; pickups: dataType[] }>({
        vcms: [],
        pickups: [],
    });

    useEffect(() => {
        fetchHomePageData().then((res) => setState(res));
    }, []);

    return (
        <div className='flex justify-center flex-col'>
            <Header />
            {state.pickups.length === 0 ? (
                <Loader />
            ) : (
                <div>
                    <section className='mt-[20px] px-[20px]'>
                        <h2 className='cursor-default mt-[80px] text-[25px] font-bold text-orange leading-7'>
                            Внедорожники
                        </h2>
                        <div className='grid grid-cols-2 gap-[20px] mt-[40px]'>
                            {state.vcms.map((item) => (
                                <CategoryCard
                                    key={JSON.stringify(item)}
                                    title={item.title}
                                    logoSrc={item.logo}
                                    imageSrc={item.img}
                                    link={item.link}
                                />
                            ))}
                        </div>
                    </section>
                    <section className='mt-[20px] px-[20px]'>
                        <h2 className='cursor-default mt-[60px] text-[25px] font-bold text-orange leading-7'>
                            Пикапы
                        </h2>
                        <div className='grid grid-cols-2 gap-[20px] mt-[40px] mb-[20px]'>
                            {state.pickups.map((item) => (
                                <CategoryCard
                                    key={JSON.stringify(item)}
                                    title={item.title}
                                    logoSrc={item.logo}
                                    imageSrc={item.img}
                                    link={item.link}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default HomePage;
