import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Allert = () => {
    return (
        <div className='cursor-default'>
            <Alert className='bg-black w-[300px] absolute left-[50%] translate-x-[-50%] bottom-[10vh] flex flex-col p-[5px] items-center justify-center'>
                <AlertTitle className='text-lg'>Пожалуйста </AlertTitle>
                <AlertDescription className='text-md'>
                    корректно заполните обязательные поля
                </AlertDescription>
            </Alert>
        </div>
    );
};

export default Allert;
