export const postNewLead = async (data: any) => {
    try {
        const res = await fetch(
            "https://troffi.bitrix24.ru/rest/253/8qh76a58yasowacf/crm.lead.add.json/",
            {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export const updateProductRowsInLead = async (id: number, productRows: any) => {
    try {
        const res = await fetch(
            `https://troffi.bitrix24.ru/rest/253/8qh76a58yasowacf/crm.lead.productrows.set/?id=${id}`,
            {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(productRows),
            }
        );
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export const updateLeadHonorific = async (id: number) => {
    try {
        const res = await fetch(
            `https://troffi.bitrix24.ru/rest/253/8qh76a58yasowacf/crm.lead.productrows.set/?id=${id}`,
            {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ fields: { HONORIFIC: `${id}` } }),
            }
        );
        return res.json();
    } catch (error) {
        console.error(error);
    }
};
