import {useContext} from "react";
import UserContext from "../../context/UserContext.js";
import {IoLayersOutline} from "react-icons/io5";
import {CiCircleList} from "react-icons/ci";
import {FaBlog} from "react-icons/fa";
import {TbUsersGroup} from "react-icons/tb";
import GlobalContext from "../../context/Global.js";
import {useNavigate} from "react-router-dom";
import {RiCommunityFill} from "react-icons/ri";
import {MdEventAvailable} from "react-icons/md";

const Admin = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const {categories} = useContext(GlobalContext);
    const {properties} = useContext(GlobalContext);
    const {neighbourhoods} = useContext(GlobalContext);
    const {contacts} = useContext(GlobalContext);
    const {blogs} = useContext(GlobalContext);
    const {bookings} = useContext(GlobalContext);

    const boxes = [
        {
            id: 1,
            title: 'Total Listings',
            count: properties.length,
            linkLabel: 'View all Listings',
            path: "listings",
            icon: <CiCircleList/>,
            color: 'bg-yellow-600'
        },

        {
            id: 2,
            title: 'Total Categories',
            count: categories.length,
            linkLabel: 'View categories',
            path: "category",
            icon: <IoLayersOutline/>,
            color: 'bg-purple-200'
        },

        {
            id: 3,
            title: 'Total Neighbourhoods',
            count: neighbourhoods.length,
            linkLabel: 'View Neighbourhoods',
            path: "neighbourhoods",
            icon: <RiCommunityFill/>,
            color: 'bg-green-200'
        },

        {
            id: 4,
            title: 'Total Contacts',
            count: contacts.length,
            linkLabel: 'View contacts',
            path: "contacts",
            icon: <TbUsersGroup/>,
            color: 'bg-blue-200'
        },
        {
            id: 5,
            title: 'Total Blogs',
            count: blogs.length,
            linkLabel: 'View blogs',
            path: "blog",
            icon: <FaBlog/>,
            color: 'bg-red-200'
        },
        {
            id: 6,
            title: 'Total Bookings',
            count:bookings.length,
            linkLabel: 'View availability',
            path: "availability",
            icon: <MdEventAvailable/>,
            color: 'bg-purple-200'
        }
    ];

    return (
        <main className={'p-4 py-9'}>
            <div className={'md:flex justify-between items-center sm:space-y-4 space-y-4'}>
                <div>
                    <h2 className={'font-light'}>Good Morning, {user && user.name}!</h2>
                    <p className={'text-sm'}>Here's what's happening with your app today.</p>
                </div>
            </div>

            <div
                className={'grid gr id-col-1 sm:grid-cols-1 md:grid-cols-2 gap-4 my-5'}>
                {boxes.map(box => (
                    <div key={box.id} className={'bg-white p-4 rounded-md shadow-md flex-1 duration-300'}>
                        <div className={'flex justify-between'}>
                            <h3 className={'font-light'}>{box.title}</h3>
                        </div>

                        <h1 className={'font-extrabold mt-3 text-xl'}>{box.count}</h1>

                        <div className={'flex justify-between items-end'}>
                            <a onClick={() => {
                                navigate(box.path);
                            }}
                               className={'text-sm hover:underline'}>{box.linkLabel}</a>
                            <div
                                className={`w-9 h-9 ${box.color} rounded-md text-white flex justify-center items-center`}>{box.icon}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </main>
    );
};

export default Admin;