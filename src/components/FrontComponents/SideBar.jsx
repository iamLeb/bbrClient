import {useLocation, useNavigate} from "react-router-dom";
import {MdOutlineCancel} from "react-icons/md";
import {IoCameraSharp, IoHome, IoMailOpenSharp} from "react-icons/io5";
import {FcAbout} from "react-icons/fc";
import {CiBoxList} from "react-icons/ci";

const SideBar = ({sidebar, toggleSidebar}) => {
    const navigate = useNavigate();
    const location = useLocation();

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
            icon: <FcAbout/>,
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
    ];

    return (
        <aside
            className={`overflow-y-auto fixed lg:static lg:hidden top-0 left-0 bg-neutral-800 text-white h-screen w-80 sm:w-[500px] lg:w-80 transition-transform duration-500 ease-in-out py-2
            ${sidebar ? 'translate-x-0' : '-translate-x-full'} lg:transform-none`}>

            <div className="py-5 text-center border-b border-gray-50 flex items-center space-x-20">
                <div className={'text-center text-3xl text-primary font-bold px-3'}>
                    <h1 className="text-3xl text-primary font-bold">logo</h1>
                </div>
            </div>

            <ul className="flex flex-col gap-2 pt-9">
                {items.map((item) => (
                    <li key={item.name}>
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
