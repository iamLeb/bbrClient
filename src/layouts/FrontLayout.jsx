import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/FrontComponents/Header.jsx";
import Footer from "../components/FrontComponents/Footer.jsx";

const FrontLayout = () => {
    return (
        <>
            <Header />
            <div className={'pt-20'}>
                <Outlet /> {/*This is the children that will inherit the header & footer*/}
            </div>
            <Footer />
        </>
    );
};

export default FrontLayout;