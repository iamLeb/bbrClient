import {FiMenu} from "react-icons/fi";
import {IoIosArrowDown} from "react-icons/io";
import {TbHomeDollar} from "react-icons/tb";
import {PiLineVerticalThin} from "react-icons/pi";
import {useNavigate} from "react-router-dom";
import {GoArrowRight} from "react-icons/go";
import React from "react";

const Header = ({sidebar, toggleSidebar}) => {
    const navigate = useNavigate();

    const links = [
        {
            id: 0,
            name: 'Home',
            active: true,
            onClick: () => navigate('/'),
        },
        {
            id: 1,
            name: 'About',
            onClick: () => navigate('/about'),

        },
        {
            id: 2,
            name: 'Blog',
            onClick: () => navigate('/blog'),

        },
        {
            id: 3,
            name: 'Contact',
            onClick: () => navigate('/contact'),
        },
        {
            id: 4,
            name: 'Listings',
            onClick: () => navigate('/properties/listing'),
        },

    ];
    return (
        <header className={'fixed w-full z-20 bg-white shadow-md p-3 py-6 sm:py-3'}>
            <div className={'container mx-auto flex justify-between items-center'}>
                <div>
                    <h1 className={'text-3xl text-primary font-bold'}>logo</h1>
                </div>

                <div className={'hidden md:block text-md font-medium'}>
                    <ul className={'flex space-x-4 items-center'}>
                        {links.map(link => (
                            <li onClick={() => link.onClick()} key={link.id}>
                                <div
                                    className={`flex items-center space-x-1 hover:cursor-pointer hover:text-primary ${link.active && 'text-primary'} `}>
                                    <span>{link.name}</span>
                                </div>

                            </li>
                        ))}

                        <li>
                            <ul onClick={() => navigate('/contact')}
                                className={'cursor-pointer flex items-center space-x-1 bg-primary p-4 rounded-lg font-semibold text-white'}>
                                <li>
                                    <TbHomeDollar/>
                                </li>
                                <li>
                                    <PiLineVerticalThin/>
                                </li>
                                <li>
                                    <span>Buy | Sell</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/*Mobile View*/}
                <div className={'flex md:hidden items-center space-x-3'}>
                    <div onClick={toggleSidebar}>
                       <FiMenu className={'text-primary'} size={32}/>
                    </div>
                </div>


            </div>
        </header>
    );
};

export default Header;