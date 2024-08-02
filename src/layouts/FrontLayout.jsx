import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
    const sidebarRef = useRef(null);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    useEffect(() => {
        // Function to handle clicks outside of sidebar
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setSidebar(false); // Close sidebar if click is outside
            }
        };

        // Adding event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Cleaning up event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBreadcrumbClick = () => {
        if (firstDirectory === 'properties') {
            navigate('/properties/listing');
        } else {
            navigate(`/${firstDirectory}`);
        }
    };

    return (
        <>
            <div className="relative lg:static flex">
                <div className="fixed z-50 lg:static lg:z-auto" ref={sidebarRef}>
                    <SideBar sidebar={sidebar} toggleSidebar={toggleSidebar} />
                </div>

                <div className="flex-1 lg:z-auto">
                    <div className={'mb-6'}>
                        <Header sidebar={sidebar} toggleSidebar={toggleSidebar} />
                    </div>
                    {location.pathname !== '/' && (
                        <div className="mt-[100px]">
                            <div className={'container mx-auto flex flex-col text-xs'}>
                                <ul className={'flex space-x-4 text-gray-500 border-b p-5'}>
                                    <li>
                                        <div className={'flex items-center space-x-2 text-primary cursor-pointer'}>
                                            <a href={'/'}>Home</a>
                                            <RxCaretRight />
                                        </div>
                                    </li>
                                    <li>
                                        <span onClick={handleBreadcrumbClick} className={'cursor-pointer'}>
                                            {firstDirectory}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    <Outlet /> {/* This is the children that will inherit the header & footer */}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FrontLayout;
