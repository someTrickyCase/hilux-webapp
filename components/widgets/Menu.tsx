import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/dataType";
import { getCategories } from "@/api/wooComerce";
import { useCategoryID } from "@/store/stroe";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Loader from "../shared/Loader";

const Menu = ({ className }: { className?: string }) => {
    const { setCategoryID } = useCategoryID();
    const navigator = useRouter();
    const [categories, setCategories] = useState<
        { name: string; id: number; childrens: { id: number; name: string }[] }[]
    >([]);

    useEffect(() => {
        const state = localStorage.getItem("menuState");
        if (state) {
            setCategories(JSON.parse(state));
        }
    }, []);

    function handleMenuButtonClick() {
        if (categories.length !== 0) return;

        const firstLayer: {
            [key: number]: { name: string; childrens: { id: number; name: string }[] };
        } = {};
        const secondLayer: CategoryType[] = [];
        const state: { name: string; id: number; childrens: { id: number; name: string }[] }[] = [];

        getCategories().then((res) => {
            res.map((item: CategoryType) => {
                if (item.parent === 0) {
                    firstLayer[item.id] = { name: item.name, childrens: [] };
                } else {
                    secondLayer.push(item);
                }
            });
            secondLayer.map((item: CategoryType) => {
                if (firstLayer[item.parent]) {
                    firstLayer[item.parent].childrens.push({ id: item.id, name: item.name });
                }
            });
            for (const key in firstLayer) {
                state.push({
                    name: firstLayer[key].name,
                    id: +key,
                    childrens: firstLayer[key].childrens,
                });
            }
            localStorage.setItem("menuState", JSON.stringify(state));
            setCategories(state);
        });
    }

    function handleCategoryLink(id: number) {
        setCategoryID(id);
        navigator.push(`/shop/category/${id}`);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant='link'
                    onClick={handleMenuButtonClick}
                    className={cn("text-white", className)}>
                    <svg
                        width='30'
                        height='30'
                        viewBox='0 0 15 15'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5H12.5C12.7761 5 13 4.77614 13 4.5C13 4.22386 12.7761 4 12.5 4H2.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z'
                            fill='currentColor'
                            fillRule='evenodd'
                            clipRule='evenodd'></path>
                    </svg>
                </Button>
            </SheetTrigger>
            <SheetContent className='bg-black w-screen border-none flex flex-col items-center'>
                <SheetHeader>
                    <SheetTitle className='text-orange text-2xl font-bold mb-[20px]'>
                        Категории
                    </SheetTitle>
                </SheetHeader>
                {categories.length === 0 ? (
                    <Loader />
                ) : (
                    <div className='w-[90%] flex flex-col gap-[10px] font-light overflow-y-scroll'>
                        {categories.map((firstLayerItem) => (
                            <Accordion type='single' collapsible>
                                <AccordionItem className='border-none' value='item-1'>
                                    <AccordionTrigger className='text-lg font-medium'>
                                        {firstLayerItem.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {firstLayerItem.childrens.length === 0 ? (
                                            <p
                                                onClick={() =>
                                                    handleCategoryLink(firstLayerItem.id)
                                                }
                                                className='ml-[5px] mb-[5px] hover:text-orange text-[16px]'>
                                                {firstLayerItem.name}
                                            </p>
                                        ) : (
                                            firstLayerItem.childrens.map((secondLayerItem) => (
                                                <p
                                                    onClick={() =>
                                                        handleCategoryLink(secondLayerItem.id)
                                                    }
                                                    className='ml-[5px] mb-[5px] hover:text-orange text-[16px]'>
                                                    {secondLayerItem.name}
                                                </p>
                                            ))
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                )}
                <SheetFooter>
                    <SheetClose asChild></SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default Menu;
