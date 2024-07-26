import {FiMenu} from "react-icons/fi";
import {TbHomeDollar} from "react-icons/tb";
import {PiLineVerticalThin} from "react-icons/pi";
import {useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {MdOutlineCancel} from "react-icons/md";
import logo1 from "../../assets/images/logo/Black Bliss Logo.png";
import UserContext from "../../context/UserContext.js";

const Header = ({sidebar, toggleSidebar}) => {
    const {user} = useContext(UserContext);
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

    const handleDashboardClick = () => {
        window.location.href = '/secure';
    };

    return (
        <header className={'fixed w-full z-20 bg-white shadow-md p-3 py-6 sm:py-3'}>
            <div className={'container mx-auto flex justify-between items-center'}>
                <div>
                    <img className={'w-12 md:w-24 md:ml-10'} src={logo1} alt="logo"/>
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

                        {user && (
                            <li onClick={handleDashboardClick}>
                                <div
                                    className={`flex items-center space-x-1 hover:cursor-pointer hover:text-primary `}>
                                    <span>Dashboard</span>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/*Mobile View*/}
                <div className={'flex md:hidden items-center space-x-3'}>
                    <div onClick={toggleSidebar}>
                        {sidebar ? <MdOutlineCancel className={'text-primary'} size={32}/> :
                            <FiMenu className={'text-primary'} size={32}/>}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
