import { cn } from "@/lib/utils";
import React from "react";

const Footer = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "mt-[20px] mb-[20px] border-t border-t-[#3d3d3d]/[0.2] text-[#3d3d3d] text-[12px] font-light flex flex-col gap-[5px]",
                className
            )}>
            <div className='flex flex-col gap-[5px] px-[10px] mt-[20px]'>
                <div className='flex gap-[10px] items-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='size-5'>
                        <path
                            fillRule='evenodd'
                            d='m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
                            clipRule='evenodd'
                        />
                    </svg>
                    <p>426065, Удмуртская Республика, г. Ижевск, пер. Спартаковский, д. 13</p>
                </div>
                <div className='flex gap-[10px] items-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='size-4'>
                        <path d='M19.5 22.5a3 3 0 0 0 3-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 1 1-.712 1.321l-5.683-3.06a1.5 1.5 0 0 0-1.422 0l-5.683 3.06a.75.75 0 0 1-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 0 0 3 3h15Z' />
                        <path d='M1.5 9.589v-.745a3 3 0 0 1 1.578-2.642l7.5-4.038a3 3 0 0 1 2.844 0l7.5 4.038A3 3 0 0 1 22.5 8.844v.745l-8.426 4.926-.652-.351a3 3 0 0 0-2.844 0l-.652.351L1.5 9.589Z' />
                    </svg>
                    <p>zsa@troffi.ru</p>
                </div>
                <div className='flex flex-col text-[12px] mt-[10px]'>
                    <a href='https://hiluxtoyota.ru/offer/'>Договор публичной оферты</a>
                    <a href='https://hiluxtoyota.ru/policy/'>Политика конфиденциальности</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
