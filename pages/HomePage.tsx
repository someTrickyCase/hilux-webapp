"use client";

import { useEffect } from "react";
import Header from "@/components/shared/Header";
import SectionAbout from "@/components/widgets/SectionAbout";

const HomePage = () => {
    useEffect(() => {
        scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    return (
        <div className='flex justify-center flex-col'>
            <Header />
            <SectionAbout />
        </div>
    );
};

export default HomePage;
