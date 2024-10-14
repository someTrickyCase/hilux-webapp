import { cn } from "@/lib/utils";
import parser from "html-react-parser";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


const TabsTable = ({ className, description }: { className?: string; description: string }) => {
    function validateHTML() {
        if (description.includes("sectioclass")) {
            return <p>Нет описания</p>;
        } else {
            return parser(description);
        }
    }

    return (
        <div className={cn("w-full flex items-center justify-center", className)}>
            <Tabs defaultValue='description' className='w-full px-[20px]'>
                <TabsList className='w-full flex justify-between px-[5px] mb-[20px] bg-[#3d3d3d] h-[50px]'>
                    <TabsTrigger className='h-[40px] w-[50%] text-lg' value='description'>
                        Описание
                    </TabsTrigger>
                    <TabsTrigger className='h-[40px] w-[50%] text-lg' value='registry-help'>
                        Регистрация
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='description'>{validateHTML()}</TabsContent>
                <TabsContent value='registry-help'>
                    <div className='mb-[20px]'>
                        <h2 className='text-lg font-bold'>
                            Оставляйте заявку, чтобы провести бесплатную техническую экспертизу и
                            узнать:
                        </h2>
                        <ul className='list-disc mt-[10px] ml-[30px]'>
                            <li>Стоимость оформления документов</li>
                            <li>Точные сроки регистрации</li>
                            <li>Этапы и нюансы взаимодействия с ГИБДД</li>
                            <li>Особенности регистрации этого вида изменений</li>
                        </ul>
                    </div>
                    <p className='text-sm'>
                        <span className='text-orange text-xl'>* </span> Оставить заявку на
                        проведение экспертизы Вы можете воспользовавшись контекстным меню бота
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TabsTable;
