"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/stroe";

import Menu from "../widgets/Menu";
import SearchBar from "./SearchBar";
import Image from "next/image";

const Header = ({ navigateBack }: { navigateBack?: boolean }) => {
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const { cart } = useStore();
    const navigator = useRouter();

    useEffect(() => {
        if (cart.length !== 0) setIsCartEmpty(false);
        if (cart.length === 0) setIsCartEmpty(true);
    }, [cart.length]);

    function handleLogo() {
        navigator.push("/");
    }

    function handleCart() {
        navigator.push("/cart");
    }

    function handleBack() {
        navigator.back();
    }

    return (
        <div className='max-w-full z-50 cursor-pointer w-screen h-[60px] px-[10px] flex items-center justify-between fixed top-0 left-0 bg-black/[0.85] !backdrop-blur-[5px]'>
            {navigateBack ? (
                <div onClick={handleBack} className='flex items-center gap-[24px]'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='size-6'>
                        <path
                            fillRule='evenodd'
                            d='M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z'
                            clipRule='evenodd'
                        />
                    </svg>
                    <p className='text-xl font-[600]'>Hilux Toyota</p>
                </div>
            ) : (
                <div onClick={handleLogo} className='flex items-center gap-[4px]'>
                    <Image
                        width={55}
                        height={35}
                        role='presentation'
                        src={"/logo.png"}
                        alt='toyota-logo'
                    />
                    {/* <img
                        className='h-[35px] flex items-center justify-center'
                        src='/logo.png'
                        alt='logo'
                    /> */}
                    <p className='text-xl font-[600]'>Hilux Toyota</p>
                </div>
            )}

            <div className='flex items-center'>
                <SearchBar />
                <div className=' relative' onClick={handleCart}>
                    <div
                        className={`${
                            isCartEmpty ? "hidden" : "block"
                        } h-[12px] w-[12px] rounded-full bg-orange absolute right-[-10px] top-[-5px] flex items-center justify-center`}>
                        <p className='text-[12px]'>{cart.length}</p>
                    </div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='size-6 hover:text-orange transition-all'>
                        <path d='M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z' />
                    </svg>
                </div>
                <Menu className=' hover:text-orange transition-all' />
            </div>
        </div>
    );
};

export default Header;
