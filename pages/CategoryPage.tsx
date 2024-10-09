"use client";

import { useEffect, useState } from "react";
import { getProductsInCategory } from "@/api/wooComerce";
import { useCategoryID } from "@/store/stroe";

import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";
import SortTypeSelector from "@/components/widgets/SortTypeSelector";
import Feed from "@/components/shared/Feed";

const CategoryPage = () => {
    const { categoryID } = useCategoryID();
    const [state, setState] = useState([]);
    const [page] = useState("1");
    const [sortType, setSortType] = useState({ orderby: "price", order: "asc" });

    useEffect(() => {
        scrollTo({
            top: 0,
            behavior: "smooth",
        });
        getProductsInCategory(categoryID, {
            orderby: sortType.orderby,
            order: sortType.order,
            page: page,
            perPage: "100",
        }).then((res) => {
            setState(res);
        });
    }, [sortType, page, categoryID]);

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

    return (
        <div>
            <Header navigateBack={true} />
            <SortTypeSelector callback={hadleSortTypeSelecting} />
            {state.length === 0 ? (
                <Loader />
            ) : (
                <div>
                    <Feed products={state} />
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
