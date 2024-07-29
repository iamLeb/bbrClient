import {AiOutlineDashboard} from "react-icons/ai";
import {IoLayersOutline} from "react-icons/io5";
import {CiBoxList} from "react-icons/ci";
import {IoCameraSharp} from "react-icons/io5";
import {CiMap} from "react-icons/ci";
import {IoMailOpenSharp} from "react-icons/io5";
import {GrGallery} from "react-icons/gr";
import {FaChrome, FaRegUserCircle} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import {FaCalendarAlt} from "react-icons/fa";
import {MdOutlineCancel} from "react-icons/md";
import {GiMicrophone} from "react-icons/gi";
import {GrUserManager} from "react-icons/gr";
import logo1 from "../../assets/images/logo/Bliss logo black white.png";
import React from "react";


const Sidebar = ({sidebar, toggleSidebar}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        if (path === "/") {
            window.location.href = path;
        } else {
            navigate(path);
        }
        toggleSidebar();
    };

    const items = [
        {
            icon: <AiOutlineDashboard/>,
            name: "Dashboard",
            path: "",
        },
        {
            icon: <IoLayersOutline/>,
            name: "My Categories",
            path: "category",
        },
        {
            icon: <CiBoxList/>,
            name: "My Listings",
            path: "listings",
        },
        {
            icon: <IoCameraSharp/>,
            name: "Blog",
            path: "blog",
        },
        {
            icon: <CiMap/>,
            name: "Neighbourhoods",
            path: "neighbourhoods",
        },
        {
            icon: <IoMailOpenSharp/>,
            name: "Contacts",
            path: "contacts",
        },
        {
            icon: <GrGallery/>,
            name: "Gallery",
            path: "gallery",
        },
        {
            icon: <GiMicrophone/>,
            name: "Testimonials",
            path: "testimonials",
        },
        {
            icon: <GrUserManager/>,
            name: "Manage Roles",
            path: "addAgent",
            mobile: true,
        },
        {
            icon: <FaRegUserCircle/>,
            name: "My Profile",
            path: "profile",
        },
        {
            icon: <FaCalendarAlt/>,
            name: "Create availability",
            path: "availability",
        },
        {
            icon: <FaChrome/>,
            name: "Website",
            path: "/",
            mobile: true,
        },
    ];

    return (
        <aside
            className={`overflow-y-auto no-scrollbar fixed lg:static top-0 left-0 bg-neutral-800 text-white h-screen w-80 sm:w-[500px] lg:w-80 transition-transform duration-500 ease-in-out 
            ${sidebar ? 'translate-x-0' : '-translate-x-full'} lg:transform-none`}>

            <div className="py-5 border-b border-gray-50 flex items-center space-x-20">
                <div className={'text-white pl-6 lg:hidden'} onClick={toggleSidebar}>
                    {sidebar ? <MdOutlineCancel size={26}/> : ''}
                </div>

                <div>
                    <img className={'w-24 ml-4'} src={logo1} alt="logo"/>
                </div>

            </div>

            <ul className="flex flex-col gap-2 pt-9">
                {items.map((item) => (
                    <li key={item.name} className={item.mobile ? 'block md:hidden' : ''}>
                        <div
                            onClick={() => handleNavigation(item.path)}
                            className={`flex space-x-4 items-center cursor-pointer ${
                                location.pathname.split("/")[2] === item.path && "bg-primary"
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

export default Sidebar;
