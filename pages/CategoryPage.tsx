"use client";

import { fetchCategoryPageData } from "@/api/apiController";
import React, { useEffect, useState } from "react";

import Feed from "@/components/shared/Feed";
import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";
import PaginationBar from "@/components/widgets/PaginationBar";

const CategoryPage = () => {
    const initialState: { menu: {}; products: [] } = { menu: {}, products: [] };
    const [state, setState] = useState<{ menu: {}; products: [] }>(initialState);
    const [page, setPage] = useState(1);
    let url: string | null = "";

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        url = localStorage.getItem("category-troffi");
        if (!url) return;
        fetchCategoryPageData(url, page).then((res) => setState(res));
    }, [page]);

    function pageChanger(toPage: number) {
        setPage(toPage);
    }

    return (
        <div>
            <Header menu={state.menu} />
            {state.products?.length === 0 ? (
                <Loader />
            ) : (
                <>
                    <Feed products={state.products} />
                    <PaginationBar curPage={page} handleChangePage={pageChanger} />
                </>
            )}
        </div>
    );
};

export default CategoryPage;
