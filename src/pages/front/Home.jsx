import React from 'react';
import Hero from "../../components/FrontComponents/Hero.jsx";
import Featured from "../../components/FrontComponents/Featured.jsx";
import Explore from "../../components/FrontComponents/Explore.jsx";
import Rent from "../../components/FrontComponents/Rent.jsx";

const Home = () => {
    return (
        <div>
            <Hero />
            <Featured />
            <Explore />
            <Rent />
        </div>
    );
};

export default Home;