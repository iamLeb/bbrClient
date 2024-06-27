import { AiOutlineDashboard } from "react-icons/ai";
import { IoLayersOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { IoCameraSharp } from "react-icons/io5";
import { CiMap } from "react-icons/ci";
import { IoMailOpenSharp } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";

const items = [
    {
        icon: <AiOutlineDashboard  />,
        name: 'Dashboard',
    }, {
        icon: <IoLayersOutline />,
        name: 'My Categories',
    }, {
        icon: <CiBoxList  />,
        name: 'My Listings',
    }, {
        icon: <IoCameraSharp />,
        name: 'Blog'
    }, {
        icon: <CiMap />,
        name: 'Provinces'
    },{
        icon: <IoMailOpenSharp  />,
        name: 'Contacts'
    }, {
        icon: <GrGallery />,
        name: 'Gallery'
    },{
        icon: <FaRegUserCircle  />,
        name: 'My Profile'
    }
];
const Sidebar = () => {
    return (
        <aside className={'hidden md:block bg-neutral-800 text-white h-screen w-80'}>
            <div className={'py-9 text-center border-b border-gray-50'}>
                <h1 className={'text-3xl text-primary font-bold'}>logo</h1>
            </div>

            <ul className={'flex flex-col gap-2 pt-9'}>
                {items.map(item => (
                    <li key={<item className="name"></item>}>
                        <div className={'flex space-x-4 items-center cursor-pointer hover:bg-primary text-white p-4'}>
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