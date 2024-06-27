import React from 'react';
import Hero from "../../components/FrontComponents/Hero.jsx";
import Featured from "../../components/FrontComponents/Featured.jsx";
import Explore from "../../components/FrontComponents/Explore.jsx";
import Testimonials from '../../components/FrontComponents/Testimonials.jsx';
import Contact from "../../components/FrontComponents/Contact.jsx";
import RegistrationHero from '../../components/FrontComponents/Auth/RegistrationHero.jsx';


const Home = () => {
    return (
        <div>
            <Hero />
            <Featured />
            <Explore />
            <Contact />
            <Testimonials />
        </div>
    );
};

export default Home;