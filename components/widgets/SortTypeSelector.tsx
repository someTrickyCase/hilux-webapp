import { cn } from "@/lib/utils";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRef } from "react";

const SortTypeSelector = ({
    className,
    callback,
}: {
    className?: string;
    callback: (sortType: string) => void;
}) => {
    const selectorRef: any = useRef(null);

    const handleClick = () => {
        callback(selectorRef.current.children[1].innerText);
    };

    return (
        <div className={cn("mt-[80px] ml-[15px]", className)}>
            <Select>
                <SelectTrigger className='w-[180px] border-orange'>
                    <SelectValue placeholder='Сначала дешёвые' />
                </SelectTrigger>
                <SelectContent className='bg-black/[0.6] text-white backdrop:blur-lg border-orange'>
                    <SelectItem onClick={handleClick} ref={selectorRef} value='Сначала дешёвые'>
                        Сначала дешёвые
                    </SelectItem>
                    <SelectItem onClick={handleClick} ref={selectorRef} value='Сначала дорогие'>
                        Сначала дорогие
                    </SelectItem>
                    <SelectItem onClick={handleClick} ref={selectorRef} value='Новинки'>
                        Новинки
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SortTypeSelector;
