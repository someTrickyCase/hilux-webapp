"use client";

import { useEffect, useState } from "react";
import { getProductsList } from "@/api/wooComerce";

import Header from "@/components/shared/Header";
import Feed from "@/components/shared/Feed";
import SortTypeSelector from "@/components/widgets/SortTypeSelector";
import Loader from "@/components/shared/Loader";
import PaginationBar from "@/components/widgets/PaginationBar";
import Footer from "@/components/shared/Footer";

const ShopPage = () => {
    const [state, setState] = useState([]);
    const [sortType, setSortType] = useState({ orderby: "price", order: "asc" });
    const [page, setPage] = useState("1");

    useEffect(() => {
        scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setState([]);
        getProductsList({
            orderby: sortType.orderby,
            order: sortType.order,
            page: page,
            perPage: "20",
        }).then((res) => setState(res));
    }, [sortType, page]);

    function hadleSortTypeSelecting(sortTypeString: string) {
        switch (sortTypeString) {
            case "Новинки":
                setSortType({ orderby: "date", order: "desc" });
                break;
            case "Сначала дешёвые":
                setSortType({ orderby: "price", order: "asc" });
                break;
            case "Сначала дорогие":
                setSortType({ orderby: "price", order: "desc" });
                break;
        }
    }

    function changePage(page: number) {
        setPage(page.toString());
    }

    return (
        <div>
            <Header />
            <SortTypeSelector callback={hadleSortTypeSelecting} />
            <div>
                {state.length === 0 ? (
                    <Loader />
                ) : (
                    <div>
                        <Feed products={state} />
                        <PaginationBar curPage={+page} handleChangePage={changePage} />
                        <Footer />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
