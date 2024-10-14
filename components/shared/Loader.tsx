import React from "react";

const Loader = () => {
    return (
        <div className='w-full h-[85vh] bg-black flex items-center justify-center'>
            <div className='w-[50px] h-[50px] rounded-full border-[8px] border-[#fff]/[0.03] border-r-orange animate-spin'></div>
        </div>
    );
};

export default Loader;
