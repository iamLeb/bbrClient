import AboutHero from "../../components/FrontComponents/AboutHero.jsx";
import CoreValues from "../../components/FrontComponents/CoreValues.jsx";
import ChooseUs from "../../components/FrontComponents/ChooseUs.jsx";
import OurServices from "../../components/FrontComponents/OurServices.jsx";

const About = () => {
    return (
        <section className={''}>
            <AboutHero />
            <CoreValues />
            <ChooseUs/>
            <OurServices/>
        </section>
    );
};

export default About;