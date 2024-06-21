import React from 'react';
import Hero from "../../components/FrontComponents/Hero.jsx";
import Featured from "../../components/FrontComponents/Featured.jsx";
import Explore from "../../components/FrontComponents/Explore.jsx";
import Sale from "../../components/FrontComponents/Sale.jsx";
import Rent from "../../components/FrontComponents/Rent.jsx";
import Testimonials from '../../components/FrontComponents/Testimonials.jsx';

const Home = () => {
    return (
        <div>
            <Hero />
            <Featured />
            <Explore />
            <Sale />
            <Rent />
            <Testimonials />
        </div>
    );
};

export default Home;