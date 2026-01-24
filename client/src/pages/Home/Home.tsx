import React from "react";

import Hero from "../../components/Home/Hero.tsx";
import Features from "../../components/Home/Features.tsx";
import Workflow from "../../components/Home/Workflow.tsx";
import CTA from "../../components/Home/CTA.tsx";

const Home: React.FC = () => {
    return (
        <div className="bg-background-main text-text-primary">
            <Hero />
            <Features />
            <Workflow />
            <CTA />
        </div>
    );
};

export default Home;
