import React, { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/FrontComponents/Header.jsx";
import Footer from "../components/FrontComponents/Footer.jsx";
import { RxCaretRight } from "react-icons/rx";
import SideBar from "../components/FrontComponents/SideBar.jsx";

const FrontLayout = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const pathSegments = pathname.split('/');
    const firstDirectory = pathSegments[1];
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    return (
        <>
            <Header sidebar={sidebar} toggleSidebar={toggleSidebar} />
            <div className="relative lg:static flex">
                <div className="flex-1 z-0 lg:z-auto">
                    {location.pathname !== '/' && (
                        <div className={'container mx-auto flex flex-col text-xs'}>
                            <ul className={'flex space-x-4 text-gray-500 border-b p-5'}>
                                <li>
                                    <div className={'flex items-center space-x-2 text-primary cursor-pointer'}>
                                        <a href={'/'}>Home</a>
                                        <RxCaretRight />
                                    </div>
                                </li>
                                <li>
                                    <span>{firstDirectory}</span>
                                </li>
                            </ul>
                        </div>
                    )}
                    <Outlet /> {/* This is the children that will inherit the header & footer */}
                </div>
                <div className="fixed z-10 right-0 lg:static lg:z-auto">
                    <SideBar sidebar={sidebar} toggleSidebar={toggleSidebar} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FrontLayout;
