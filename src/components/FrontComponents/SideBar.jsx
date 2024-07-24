import {useLocation, useNavigate} from "react-router-dom";
import {MdOutlineCancel} from "react-icons/md";
import {IoCameraSharp, IoHome, IoMailOpenSharp} from "react-icons/io5";
import {CiBoxList} from "react-icons/ci";
import {FaCircleInfo} from "react-icons/fa6";
import {TbHomeDollar} from "react-icons/tb";
import React, {useContext} from "react";
import logo1 from "../../assets/images/logo/Bliss logo black white.png";
import {AiOutlineDashboard} from "react-icons/ai";
import UserContext from "../../context/UserContext.js";


const SideBar = ({sidebar, toggleSidebar}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useContext(UserContext);

    const items = [
        {
            id: 0,
            name: 'Home',
            active: true,
            onClick: () => navigate('/'),
            icon: <IoHome/>,
        },
        {
            id: 1,
            name: 'About',
            onClick: () => navigate('/about'),
            icon: <FaCircleInfo/>,
        },
        {
            id: 2,
            name: 'Blog',
            onClick: () => navigate('/blog'),
            icon: <IoCameraSharp/>,
        },
        {
            id: 3,
            name: 'Contact',
            onClick: () => navigate('/contact'),
            icon: <IoMailOpenSharp/>,
        },
        {
            id: 4,
            name: 'Listings',
            onClick: () => navigate('/properties/listing'),
            icon: <CiBoxList/>,
        },
        {
            id: 5,
            name: 'Buy | Sell',
            onClick: () => navigate('/contact'),
            icon: <TbHomeDollar/>,
        },
        ...(user ? [
            {
                id: 6,
                name: 'Dashboard',
                onClick: () => navigate('/secure'),
                icon: <AiOutlineDashboard/>,
            }
        ] : []),
    ];

    return (
        <aside
            className={`overflow-y-auto fixed lg:static lg:hidden top-0 left-0 bg-neutral-800 text-white h-screen w-80 sm:w-[500px] lg:w-80 transition-transform duration-300 ease-in-out py-2
            ${sidebar ? 'translate-x-0' : '-translate-x-full'} lg:transform-none`}>

            <div className="py-5 text-center flex items-center space-x-20">
                <div>
                    <img className={'w-24 ml-4'} src={logo1} alt="logo"/>
                </div>
            </div>

            <ul className="flex flex-col gap-2 pt-9">
                {items.map((item) => (
                    <li key={item.id}>
                        <div
                            onClick={() => {
                                item.onClick();
                                toggleSidebar();
                            }}
                            className={`flex space-x-4 items-center cursor-pointer ${
                                location.pathname.split("/")[2] === item.name.toLowerCase() && "bg-primary"
                            } hover:bg-primary text-white p-4`}
                        >
                            <span className="text-neutral-500 text-2xl">{item.icon}</span>
                            <span>{item.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SideBar;
