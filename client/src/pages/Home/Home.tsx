import React from "react";

import Hero from "../../components/Home/Hero/Hero.tsx";
import Stats from "../../components/Home/Stats/Stats.tsx";
import Features from "../../components/Home/Features/Features.tsx";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks.tsx";
import CTA from "../../components/Home/CTA/CTA.tsx";


const Home: React.FC = () => {
    return (
        <div className="bg-(--bg-main) text-(--text-primary) font-['Montserrat'] min-h-screen overflow-x-hidden w-full">
            <Hero/>
            <Stats/>
            <Features/>
            <HowItWorks/>
            <CTA/>
        </div>
    );
};

export default Home;
