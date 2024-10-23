import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const ProductImagesCarousel = ({ images }: { images: any[] }) => {
    return (
        <Carousel className='w-[250px] '>
            <div className='rounded-xl overflow-hidden '>
                <CarouselContent>
                    {images.map((image: any) => (
                        <CarouselItem className='flex justify-center' key={JSON.stringify(image)}>
                            <Image
                                width={250}
                                height={250}
                                key={JSON.stringify(image)}
                                alt={image.alt}
                                src={image.src}
                                className='h-[250px] rounded-xl'
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </div>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default ProductImagesCarousel;
