import { AiOutlineDashboard } from "react-icons/ai";
import { IoLayersOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { IoCameraSharp } from "react-icons/io5";
import { CiMap } from "react-icons/ci";
import { IoMailOpenSharp } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            icon: <AiOutlineDashboard  />,
            name: 'Dashboard',
            path: '',
        }, {
            icon: <IoLayersOutline />,
            name: 'My Categories',
            path: 'category',
        }, {
            icon: <CiBoxList  />,
            name: 'My Listings',
            path: 'listings',
        }, {
            icon: <IoCameraSharp />,
            name: 'Blog',
            path: 'blog',
        }, {
            icon: <CiMap />,
            name: 'Neighbourhoods',
            path: 'neighbourhoods',
        },{
            icon: <IoMailOpenSharp  />,
            name: 'Contacts',
            path: 'contacts',
        }, {
            icon: <GrGallery />,
            name: 'Gallery',
            path: 'gallery',
        },{
            icon: <FaRegUserCircle  />,
            name: 'My Profile',
            path: 'profile',
        }
    ];

    return (
        <aside className={'hidden lg:block bg-neutral-800 text-white h-screen w-80'}>
            <div className={'py-9 text-center border-b border-gray-50'}>
                <h1 className={'text-3xl text-primary font-bold'}>logo</h1>
            </div>

            <ul className={'flex flex-col gap-2 pt-9'}>
                {items.map(item => (
                    <li key={<item className="name"></item>}>
                        <div onClick={() => navigate(item.path)} className={`flex space-x-4 items-center cursor-pointer ${location.pathname.split('/')[2] === item.path  && 'bg-primary'} hover:bg-primary text-white p-4`}>
                            <span className={'text-neutral-500 text-2xl'}>{item.icon}</span>
                            <span>{item.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;