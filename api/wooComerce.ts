const consumerKey = process.env.WC_KEY;
const consumerSecret = process.env.WC_SECRET;

type Params = {
    orderby?: string;
    order?: string;
    page?: string;
    perPage?: string;
};

function configurateParams(params?: Params) {
    if (!params) return;
    return `orderby=${params.orderby ? params.orderby : "date"}&order=${
        params.order ? params.order : "asc"
    }&page=${params.page ? params.page : "1"}&per_page=${params.perPage ? params.perPage : "10"}`;
}

export const getProductsList = async (params?: {
    orderby?: string;
    order?: string;
    page?: string;
    perPage?: string;
}) => {
    try {
        const res = await fetch(
            `https://hiluxtoyota.ru/wp-json/wc/v3/products/?${configurateParams(params)}`,
            {
                headers: {
                    authorization: `Basic ${btoa(consumerKey + ":" + consumerSecret)}`,
                    "content-type": "application/json",
                },
            }
        );
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export const getProductsInCategory = async (
    id: number,
    params?: {
        orderby?: string;
        order?: string;
        page?: string;
        perPage?: string;
    }
) => {
    try {
        const res = await fetch(
            `https://hiluxtoyota.ru/wp-json/wc/v3/products/?category=${id}&${configurateParams(
                params
            )}`,
            {
                headers: {
                    authorization: `Basic ${btoa(consumerKey + ":" + consumerSecret)}`,
                    "content-type": "application/json",
                },
            }
        );
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export const getCategories = async () => {
    try {
        const res = await fetch(
            "https://hiluxtoyota.ru/wp-json/wc/v3/products/categories?per_page=60",
            {
                headers: {
                    authorization: `Basic ${btoa(consumerKey + ":" + consumerSecret)}`,
                    "content-type": "application/json",
                },
            }
        );
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export const getProduct = async (id: number) => {
    try {
        const res = await fetch(`https://hiluxtoyota.ru/wp-json/wc/v3/products/${id.toString()}`, {
            headers: {
                authorization: `Basic ${btoa(consumerKey + ":" + consumerSecret)}`,
                "content-type": "application/json",
            },
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export const getSearchedProducts = async (
    query: string,
    params?: {
        orderby?: string;
        order?: string;
        page?: string;
        perPage?: string;
    }
) => {
    try {
        const res = await fetch(
            `https://hiluxtoyota.ru/wp-json/wc/v3/products/?search=${query}&${configurateParams(
                params
            )}`,
            {
                headers: {
                    authorization: `Basic ${btoa(consumerKey + ":" + consumerSecret)}`,
                    "content-type": "application/json",
                },
            }
        );
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export const postNewOrder = async (data: any) => {
    try {
        const res = await fetch(`https://hiluxtoyota.ru/wp-json/wc/v3/orders`, {
            method: "post",
            headers: {
                authorization: `Basic ${btoa(consumerKey + ":" + consumerSecret)}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};
