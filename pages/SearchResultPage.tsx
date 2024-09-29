"use client";

import Feed from "@/components/shared/Feed";
import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";
import React, { useEffect, useState } from "react";
import { fetchSearchResultPageData } from "@/api/apiController";
import { FeedCardType } from "@/types/dataType";
import { useSearch } from "@/store/stroe";

const SearchResultPage = () => {
    const { searchedText } = useSearch();

    const [state, setState] = useState<FeedCardType[]>();
    const [searchText, setSearchText] = useState<string | undefined>();

    useEffect(() => {
        const searchRequest = searchedText;

        if (searchRequest) {
            setSearchText(searchRequest);
            fetchSearchResultPageData(searchRequest).then((res) => {
                setState(res);
            });
        }
    }, [searchedText]);

    return (
        <div>
            <Header />
            {!state ? (
                <Loader />
            ) : (
                <div className='flex flex-col items-center justify-center mt-[80px]'>
                    <p className='text-lg'>{`Результаты поиска по запросу "${searchText}"`}</p>
                    {state?.length === 0 ? (
                        <p className='text-[#3d3d3d] mt-[60px] text-lg font-bold'>
                            По вашему запросу ничего <br /> 😟
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
