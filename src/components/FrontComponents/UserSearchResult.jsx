import {IoLocationOutline} from "react-icons/io5";
import {LiaBedSolid} from "react-icons/lia";
import {FaShower} from "react-icons/fa";
import {MdOutlineZoomOutMap} from "react-icons/md";
import {useContext} from "react";
import GlobalContext from "../../context/Global.js";
import ViewMore from "./ViewMore.jsx";

const UserSearchResult = () => {
    const search = [
        {
            id: 0,
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$146,000',
            title: 'Sage Creek',
            address: '15 Berwick crt, Winnipeg, Manitoba',
            beds: 4,
            baths: 4,
            sqft: 900,
        },
        {
            id: 1,
            image: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$106,000',
            title: 'Sage Creek',
            address: '252 Pinnacle dr, Winnipeg, Manitoba',
            beds: 2,
            baths: 2,
            sqft: 600,
        },
        {
            id: 2,
            image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$106,000',
            title: 'Sage Creek',
            address: '1225 Yellow Moon Rd, Winnipeg, Manitoba',
            beds: 19,
            baths: 17,
            sqft: '8,500',
        },
        {
            id: 3,
            image: 'https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$106,000',
            title: 'Sage Creek',
            address: '252 Tanager Trail, Winnipeg, Manitoba',
            beds: 1,
            baths: 1,
            sqft: 600,
        },
    ];

    return (
        <section className={'pt-28 sm:pt-9 pb-9 bg-white'}>
            <div className={'flex items-center justify-center space-x-4 font-light text-sm text-center'}>
                <button className={'tag text-black font-bold'}>Apartment</button>
                <button className={'tag text-black font-bold'}>Winnipeg</button>
                <button className={'tag text-black font-bold'}>Sage Creek</button>
            </div>

            <div className={'px-3 mt-5'}>
                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}>
                    {search.map(feat => (
                        <div key={feat.id} className={'border border-gray-200 bg-white p-5 rounded-lg'}>
                            <div className={'flex flex-col gap-3 justify-center'}>
                                <div className={'relative overflow-hidden rounded-lg h-56'}>
                                    <img
                                        className={'object-cover h-full w-full cursor-pointer transition-all duration-300 hover:brightness-75 hover:scale-105'}
                                        src={feat.image}
                                        alt={feat.title}/>
                                </div>
                                <div>
                                    <span className={'font-semibold text-xl'}>{feat.title}</span>
                                </div>
                                <div className={'flex space-x-2 text-sm text-gray-500'}>
                                    <IoLocationOutline/>
                                    <span>{feat.address} </span>
                                </div>
                                <ul className={'flex justify-between items-center text-gray-500 text-sm'}>
                                    <li>
                                        <div className={'flex items-center space-x-2'}>
                                            <LiaBedSolid/>
                                            <p>
                                                Beds <span className={'font-medium'}>{feat.beds}</span>
                                            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className={'flex items-center space-x-2'}>
                                            <FaShower/>
                                            <p>
                                                Baths <span className={'font-medium'}>{feat.baths}</span>
                                            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className={'flex items-center space-x-2'}>
                                            <MdOutlineZoomOutMap/>
                                            <p>
                                                SqFt <span className={'font-medium'}>{feat.sqft}</span>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <span className={'border-b border-gray-100'}></span>
                                <div className={'flex justify-between items-center font-light text-sm text-gray-500'}>
                                    <div className={'flex items-center space-x-2'}>
                                        <img className={'w-9 rounded-full'}
                                             src="https://dreamhomewp.themesflat.com/wp-content/uploads/2023/11/user-1-1.jpg"
                                             alt="user"/>
                                        <span
                                            className={'cursor-pointer transition-all duration-300 hover:text-primary'}>Alexia Putellas</span>
                                    </div>
                                    <div>
                                        <span>Build in: 2022</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserSearchResult;
