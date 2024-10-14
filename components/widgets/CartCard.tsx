import { ProductType } from "@/types/dataType";
import CartCounter from "../ui/cart-quantity-counter";
import Image from "next/image";

const CartCard = ({
    item,
    deleteHandler,
}: {
    item: ProductType;
    deleteHandler: (item: ProductType) => void;
}) => {
    function onDelete() {
        deleteHandler(item);
    }

    return (
        <div className='flex flex-col w-[300px] gap-[10px] mb-[10px] bg-[#fff]/[0.03] py-[10px] px-[20px] rounded-2xl justify-self-center'>
            <div className='flex gap-[12px] justify-between'>
                <div className='relative rounded-xl overflow-x-scroll flex snap-x '>
                    <div className='h-full w-[10px] bg-orange absolute' />
                    {item.images.map((image) => (
                        <Image
                            key={JSON.stringify(image)}
                            className='snap-always snap-start'
                            src={image.src}
                            alt={image.alt}
                            width={100}
                            height={100}
                        />
                        // <img
                        //     key={JSON.stringify(image)}
                        //     className='snap-always snap-start'
                        //     src={image.src}
                        //     alt={image.alt}
                        // />
                    ))}
                </div>

                <h2 className='text-sm font-bold w-[200px]'>{item.name}</h2>
            </div>
            <div className=' text-sm font-light flex justify-between items-center px-[10px]'>
                <p className='text-orange text-xl font-black '>
                    {item.quantity ? +item.price * item.quantity : item.price} руб
                </p>
                <CartCounter handleDelete={onDelete} item={item} />
            </div>
        </div>
    );
};

export default CartCard;
