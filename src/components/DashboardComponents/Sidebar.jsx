import {AiOutlineDashboard} from "react-icons/ai";
import {IoLayersOutline} from "react-icons/io5";
import {CiBoxList} from "react-icons/ci";
import {IoCameraSharp} from "react-icons/io5";
import {CiMap} from "react-icons/ci";
import {IoMailOpenSharp} from "react-icons/io5";
import {GrGallery} from "react-icons/gr";
import {FaRegUserCircle} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import {FaCalendarAlt} from "react-icons/fa";
import {MdOutlineCancel} from "react-icons/md";

const Sidebar = ({sidebar, toggleSidebar}) => {
    const navigate = useNavigate();
    const location = useLocation();

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
            name: "Provinces",
            path: "provinces",
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
            icon: <FaRegUserCircle/>,
            name: "My Profile",
            path: "profile",
        },
        {
            icon: <FaCalendarAlt/>,
            name: "Create availability",
            path: "availability",
        },
    ];

    return (
        // <aside
        //     className={`overflow-y-auto bg-neutral-800 text-white h-screen w-80 sm:w-[500px] lg:w-80 transition-transform duration-1000 ease-in-out
        //      ${sidebar ? 'block' : 'hidden'} lg:block`}>

        <aside
            className={`fixed lg:static top-0 left-0 bg-neutral-800 text-white h-screen w-80 sm:w-[500px] lg:w-80 transition-transform duration-500 ease-in-out 
            ${sidebar ? 'translate-x-0' : '-translate-x-full'} lg:transform-none`}>

            <div className="py-5 text-center border-b border-gray-50 flex items-center space-x-20">
                <div className={'text-white pl-6 lg:hidden'} onClick={toggleSidebar}> {sidebar ?
                    <MdOutlineCancel size={26}/> : ''}</div>
                <div className={'text-center'}>
                    <h1 className="text-3xl text-primary font-bold">logo</h1>
                </div>
            </div>

            <ul className="flex flex-col gap-2 pt-9">
                {items.map((item) => (
                    <li key={item.name}>
                        <div
                            onClick={() => {
                                navigate(item.path);
                                toggleSidebar();
                            }}
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
