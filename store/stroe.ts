import { ProductType, UserType } from "@/types/dataType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create<ProductType & any>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (newProduct: ProductType) => {
                const newCart = [...get().cart, newProduct];
                set({ cart: newCart });
            },
            removeFromCart: (product: ProductType) => {
                const newCart = get().cart.filter((item: ProductType) => {
                    return item.sku !== product.sku;
                });
                set({ cart: newCart });
            },
        }),
        {
            name: "cart",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useProductID = create<any>()(
    persist(
        (set, get) => ({
            productID: null,
            setProductID: (id: number) => {
                const productID = id;
                set({ productID });
            },
        }),
        {
            name: "productID",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useCategoryID = create<any>()(
    persist(
        (set, get) => ({
            categoryID: null,
            setCategoryID: (id: number) => {
                const categoryID = id;
                set({ categoryID });
            },
        }),
        {
            name: "categoryID",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useSearch = create<any>()(
    persist(
        (set, get) => ({
            searchedText: "",
            setSearchedText: (text: string) => {
                const searchedText = text;
                set({ searchedText });
            },
        }),
        {
            name: "searchedText",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useUser = create<any>()(
    persist(
        (set, get) => ({
            user: {},
            setUser: (data: UserType) => {
                const user = data;
                set({ user });
            },
        }),
        {
            name: "user",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
