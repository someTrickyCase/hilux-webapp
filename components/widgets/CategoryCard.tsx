import React from "react";
import { useRouter } from "next/navigation";

const CategoryCard = ({
    logoSrc,
    imageSrc,
    title,
    link,
}: {
    logoSrc: string;
    imageSrc: string;
    title: string;
    link: string;
}) => {
    const navigator = useRouter();
    const handleClick = () => {
        localStorage.setItem("category-troffi", link);
        navigator.push(`/${title.split(" ").join("-").toLowerCase()}`);
    };

    return (
        <div
            onClick={handleClick}
            className=' overflow-clip h-[240px] w-[200px] mt-[20px] cursor-pointer justify-self-center self-center flex items-center justify-center flex-col gap-[10px] bg-[#fff]/[0.1] px-[10px] rounded-2xl outline-orange/[0.6] outline-[2px] runded-2xl hover:outline'>
            <img src={logoSrc} alt={logoSrc} />
            <img src={imageSrc} alt={imageSrc} />
            <p className='text-md font-bold text-nowrap self-start'>{title}</p>
        </div>
    );
};

export default CategoryCard;
