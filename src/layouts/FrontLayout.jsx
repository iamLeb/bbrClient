import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import Header from "../components/FrontComponents/Header.jsx";
import Footer from "../components/FrontComponents/Footer.jsx";
import {RxCaretRight} from "react-icons/rx";

const FrontLayout = () => {
    const location = useLocation();

    const pathname = location.pathname;
    const pathSegments = pathname.split('/');
    const firstDirectory = pathSegments[1];
    return (
        <>
            <Header />
            <div className={'pt-20'}>
                {location.pathname !== '/' && (
                    <div className={'container mx-auto flex flex-col text-xs'}>
                        <ul className={'flex space-x-4 text-gray-500 border-b p-5'}>
                            <li>
                                <div className={'flex items-center space-x-2 text-primary cursor-pointer'}>
                                    <a href={'/'}>Home</a>
                                    <RxCaretRight/>
                                </div>
                            </li>
                            <li>
                                <span>{firstDirectory}</span>
                            </li>
                        </ul>
                    </div>
                )}
                <Outlet/> {/*This is the children that will inherit the header & footer*/}
            </div>
            <Footer/>
        </>
    );
};

export default FrontLayout;