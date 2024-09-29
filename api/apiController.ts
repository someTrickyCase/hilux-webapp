export const fetchHomePageData = async () => {
    try {
        const resJSON = await fetch("http://95.213.229.56:8000/get-categories", {
            method: "get",
            headers: {
                "Constent-Type": "application/json",
            },
        });
        const res = await resJSON.json();
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const fetchCategoryPageData = async (categoryLink: string, page: number) => {
    try {
        const resJSON = await fetch("http://95.213.229.56:8000/product-category", {
            method: "get",
            headers: {
                "Constent-Type": "application/json",
                categoryLink: categoryLink,
                page: `${page}`,
            },
        });
        const res = await resJSON.json();
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const fetchSearchResultPageData = async (searchRequest: string) => {
    try {
        const resJSON = await fetch("http://95.213.229.56:8000/search", {
            method: "get",
            headers: {
                "Constent-Type": "application/json",
                searchrequest: searchRequest,
            },
        });
        const res = await resJSON.json();
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const sendOrderData = async (sendedData: any) => {
    try {
        const resJSON = await fetch("http://95.213.229.56:8000/order", {
            method: "post",
            headers: {
                "Constent-Type": "application/json",
            },
            body: JSON.stringify(sendedData),
        });
        const res = await resJSON.json();
        return res;
    } catch (error) {
        console.log(error);
    }
};
