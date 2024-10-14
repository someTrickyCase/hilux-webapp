import { useProductID } from "@/store/stroe";
import { useRouter } from "next/navigation";
import parser from "html-react-parser";

import { Button } from "../ui/button";
import { ProductType } from "@/types/dataType";
import Counter from "../ui/quantity-counter";
import Image from "next/image";

const FeedCard = ({ item }: { item: ProductType }) => {
    const navigator = useRouter();

    if (item.status !== "publish") return;

    const { setProductID } = useProductID();

    function handleShowProduct() {
        setProductID(item.id);
        navigator.push(`/shop/${item.slug}`);
    }

    return (
        <div className='justify-self-center flex flex-col w-[300px] h-[418px] gap-[10px] mb-[20px] bg-[#fff]/[0.03] py-[40px] px-[20px] rounded-2xl'>
            <div className='flex justify-between'>
                <div className='relative rounded-xl w-[100px] h-[100px] overflow-x-scroll flex snap-x '>
                    <div className='h-full w-[10px] bg-orange absolute' />
                    {item.images.map((image) => (
                        <Image
                            key={JSON.stringify(image)}
                            className='snap-always snap-start'
                            src={image.src}
                            alt={image.alt}
                            width={150}
                            height={50}
                        />
                        // <img
                        //     key={JSON.stringify(image)}
                        //     className='snap-always snap-start'
                        //     src={image.src}
                        //     alt={image.alt}
                        // />
                    ))}
                </div>
                <div className=' text-sm font-light flex flex-col justify-between'>
                    <div>
                        <p>Артикул:</p>
                        <p>{item.sku}</p>
                    </div>
                    <p className='text-orange text-2xl font-black '>{item.price} руб</p>
                </div>
            </div>
            <h2 className='text-xl font-bold h-[85px] overflow-hidden'>{item.name}</h2>
            <div className='text-sm font-light'>{parser(item.short_description)}</div>

            <Button asChild>
                <div
                    onClick={handleShowProduct}
                    className='cursor-pointer text-xl h-[50px] !bg-black !text-orange'>
                    Подробнее
                </div>
            </Button>
            <div className='flex justify-between gap-[10px]'>
                <Counter item={item} />
            </div>
        </div>
    );
};

export default FeedCard;
