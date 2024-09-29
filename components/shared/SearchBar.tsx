import React, { useRef } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useSearch } from "@/store/stroe";

const SearchBar = () => {
    const { setSearchedText } = useSearch();
    const navigator = useRouter();
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    function handleSearch() {
        const searchRequest = inputRef.current?.value;
        if (!searchRequest) return;

        setSearchedText(searchRequest);
        navigator.push("/search");
    }

    return (
        <div>
            <div className='border-orange border-[1px] rounded-lg flex  items-center  h-[30px] overflow-hidden px-[4px] mr-[20px] transition-all'>
                <Input
                    spellCheck={false}
                    ref={inputRef}
                    className='group w-[0px] focus:w-[110px] transitiaon-all border-none text-[16px]  font-medium placeholder:text-[16px] placeholder:font-medium'
                />
                <div
                    onClick={handleSearch}
                    className='w-[30px] h-[20px] bg-orange rounded-lg flex items-center justify-center text-black'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='size-5'>
                        <path
                            fillRule='evenodd'
                            d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
                            clipRule='evenodd'
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
