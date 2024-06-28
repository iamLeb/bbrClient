import {useContext} from "react";
import UserContext from "../../context/UserContext.js";
import {IoCalendarOutline, IoLayersOutline} from "react-icons/io5";
import {CiCircleList, CiCirclePlus} from "react-icons/ci";
import {FaRegComments} from "react-icons/fa";
import {TbUsersGroup} from "react-icons/tb";

const boxes = [
    {
        id: 1,
        title: 'Total Listings',
        count: '100.00',
        linkLabel: 'View all Listings',
        increase: '+16.24',
        icon: <CiCircleList />,
        color: 'bg-yellow-600'
    },

    {
        id: 2,
        title: 'Total Categories',
        count: '17',
        linkLabel: 'View categories',
        increase: '+16.24',
        icon: <IoLayersOutline />,
        color: 'bg-purple-200'
    },

    {
        id: 3,
        title: 'Total Provinces',
        count: '100.00',
        linkLabel: 'View Provinces',
        increase: '+16.24',
        icon: <FaRegComments />,
        color: 'bg-green-200'
    },

    {
        id: 4,
        title: 'Total Contacts',
        count: '100.00',
        linkLabel: 'View contacts',
        increase: '+16.24',
        icon: <TbUsersGroup />,
        color: 'bg-blue-200'
    }
];

const Admin = () => {
    const { user } = useContext(UserContext);
    return (
        <main className={'p-4 py-9'}>
            <div className={'md:flex justify-between items-center sm:space-y-4 space-y-4'}>
                <div>
                    <h2 className={'font-light'}>Good Morning, iamLeb!</h2>
                    <p className={'text-sm'}>Here's what's happening with your app today.</p>
                </div>
            </div>

            <div
                className={'grid grid-col-1 sm:grid-cols-1 md:grid-cols-2 gap-4 my-5'}>
                {boxes.map(box => (
                    <div key={box.id} className={'bg-white p-4 rounded-md shadow-md flex-1 duration-300'}>
                        <div className={'flex justify-between'}>
                            <h3 className={'font-light'}>{box.title}</h3>
                            <span className={'font-bold text-green-600'}>{box.increase}</span>
                        </div>

                        <h1 className={'font-extrabold mt-3 text-xl'}>{box.count}</h1>

                        <div className={'flex justify-between items-end'}>
                            <a href='/' className={'text-sm hover:underline'}>{box.linkLabel}</a>
                            <div
                                className={`w-9 h-9 ${box.color} rounded-md text-white flex justify-center items-center`}>{box.icon}</div>
                        </div>
                    </div>

                ))}
            </div>
        </main>
    );
};

export default Admin;