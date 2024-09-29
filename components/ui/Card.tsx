import React, { useState } from "react";
import { Button } from "./button";

const Card = ({ data, setCart }: { data?: any; setCart: (item: {}) => void }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    setCart(data);
  };

  return (
    <div
      onClick={handleClick}
      className='flex-col border border-white h-[200px] w-[130px] flex items-center justify-between self-center justify-self-center'>
      <div className='text-sm flex flex-col gap-[5px]'>
        <h1 className='self-center'>{data.title}</h1>
        <p>{`${data.price} руб.`}</p>
        <p>{data.isAvailable ? "В наличии" : "нет в наличии"}</p>
      </div>
      <Button asChild>
        <div
          onClick={handleClick}
          className={`mb-[16px] active:animate-ping transition-all bg-bluedark hover:none ${
            isSelected ? "bg-blue-900" : undefined
          }`}>
          {isSelected ? "В корзине" : "Добавить"}
        </div>
      </Button>
    </div>
  );
};

export default Card;
