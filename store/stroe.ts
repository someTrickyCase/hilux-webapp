import { FeedCardType } from "@/types/dataType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create<FeedCardType & any>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (newProduct: FeedCardType) => {
                const newCart = [...get().cart, newProduct];
                set({ cart: newCart });
            },
            removeFromCart: (product: FeedCardType) => {
                const newCart = get().cart.filter((item: FeedCardType) => {
                    return item.article !== product.article;
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
