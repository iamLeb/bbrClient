import React from 'react';
import Sale from "../../components/FrontComponents/Sale.jsx";
import Featured from "../../components/FrontComponents/Featured.jsx";

const Home = () => {
    return (
        <div>
            Home page
            <Featured />
            <Sale />
        </div>
    );
};

export default Home;