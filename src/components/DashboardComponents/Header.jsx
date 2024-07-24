import React from 'react';
import {GoArrowRight, GoArrowLeft} from "react-icons/go";
import {useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import UserContext from "../../context/UserContext";
import {MdOutlineCancel} from "react-icons/md";
import {useState} from 'react';

// eslint-disable-next-line react/prop-types
const Header = ({sidebar, toggleSidebar}) => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const location = useLocation();

    return (
        <header>
            <div className="bg-white w-full shadow-md">
                <div className="flex justify-between items-center px-5">
                    {/* Mobile view toggle */}
                    <div onClick={toggleSidebar} className="block lg:hidden">
                        {sidebar ? '' : <GoArrowRight size={26}/>}
                    </div>

                    <div className={'flex space-x-4'}>
                        {/* Manage Roles and Permissions button */}
                        <button
                            onClick={() => navigate('/secure/addAgent')}
                            className="hidden md:block text-sm transition-all duration-300 border border-primary hover:text-white hover:bg-primary text-primary rounded-full py-3 px-5"
                        >
                            Manage Roles and Permissions
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="hidden md:block text-sm transition-all duration-300 border border-primary hover:text-white hover:bg-primary text-primary rounded-full py-3 px-5"
                        >
                            Website
                        </button>
                    </div>

                    {/* User profile section */}
                    <div className="flex space-x-2 items-center cursor-pointer bg-gray-200 p-4 justify-center">
                        <div className="overflow-hidden w-9 rounded-full">
                            <img
                                className="object-center object-cover w-full h-full"
                                src="https://themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg"
                                alt="photo"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium">{user && user.name}</p>
                            <p className="text-xs font-light">{user && user.type}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditional Go Back button */}
            {location.pathname !== '/secure' && (
                <button onClick={() => navigate('/secure')}
                        className="flex space-x-2 items-center text-primary px-4 pt-4">
                    <GoArrowLeft/>
                    <span>Back to dashboard</span>
                </button>
            )}
        </header>
    );
};

export default Header;
