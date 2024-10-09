"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/types/dataType";
import { useSearch } from "@/store/stroe";
import { getSearchedProducts } from "@/api/wooComerce";

import Feed from "@/components/shared/Feed";
import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";

const SearchResultPage = () => {
    const { searchedText } = useSearch();

    const [state, setState] = useState<ProductType[]>();
    const [searchText, setSearchText] = useState<string | undefined>();

    useEffect(() => {
        setSearchText(searchedText);
        getSearchedProducts(searchedText).then((res) => setState(res));
    }, []);

    return (
        <div>
            <Header navigateBack={true} />
            {!state ? (
                <Loader />
            ) : (
                <div className='flex flex-col items-center justify-center mt-[80px]'>
                    <p className='text-lg'>{`Результаты поиска по запросу "${searchText}"`}</p>
                    {state.length === 0 ? (
                        <p className='text-[#3d3d3d] mt-[60px] text-lg font-bold'>
                            По вашему запросу ничего 😟
                        </p>
                    ) : (
                        <Feed className='mt-[20px]' products={state} />
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResultPage;
