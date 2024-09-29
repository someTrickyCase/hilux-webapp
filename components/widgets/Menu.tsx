import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SearchBar from "../shared/SearchBar";

const Menu = ({ menu, className }: { menu?: any; className?: string }) => {
    const [state, setState] = useState<any>([]);

    useEffect(() => {
        const menuRef = [];
        for (let key in menu) {
            menuRef.push({ title: key, link: menu[key].link, tabs: menu[key].tabs });
        }
        setState(menuRef);
    }, [menu]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='link' className={cn("text-white", className)}>
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
                        Меню
                    </SheetTitle>
                </SheetHeader>
                {/* <SearchBar /> */}
                <div className='w-[90%] flex flex-col gap-[16px]'>
                    {state.map((item: any) => (
                        <Accordion type='single' collapsible>
                            <AccordionItem value='item-1' className='border-none mb-[-12px]'>
                                <AccordionTrigger className='text-2xl font-bold'>
                                    <a href={item.link}>{item.title}</a>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='flex flex-col'>
                                        {item.tabs.map((innerItem: any) => (
                                            <a
                                                href={innerItem.link}
                                                className='ml-[10px] mb-[10px] text-lg font-extrabold cursor-pointer hover:text-orange'>
                                                {innerItem.title}
                                            </a>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
                <SheetFooter>
                    <SheetClose asChild>{/* <p>powered by STC</p> */}</SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default Menu;
