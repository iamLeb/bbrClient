import { IoLocationOutline } from "react-icons/io5";
import { LiaBedSolid } from "react-icons/lia";
import { FaShower } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { useContext } from "react";
import GlobalContext from "../../context/Global.js";
import {useNavigate} from "react-router-dom";

const UserSearchResult = () => {
    const navigate = useNavigate();
    const { listings } = useContext(GlobalContext);

    return (
        <section className={'pt-28 sm:pt-2 pb-2 bg-white'}>
            <div className={'px-3 mt-5'}>
                {listings.length === 0 ? (
                    <div>
                        <div className={'flex items-center justify-center space-x-4 font-light text-sm text-center'}>
                        </div>
                        <p className="text-center text-gray-500">No listings found.</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-center text-4xl pb-5">Search Result</h1>
                        <div
                            className={'grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}>
                            {listings.map((feat) => (

                                <div key={feat.id} className={'border border-gray-200 bg-white p-5 rounded-lg'}>
                                    <div className={'flex flex-col gap-3 justify-center'}>
                                        <div className={'relative overflow-hidden rounded-lg h-56'}>
                                            <img
                                                className={'object-cover h-full w-full cursor-pointer transition-all duration-300 hover:brightness-75 hover:scale-105'}
                                                src={feat.url}
                                                alt={feat.title}
                                            />
                                        </div>
                                        <div className={'cursor-pointer'}
                                             onClick={() => navigate(`/properties/listing/${feat._id}`)}>
                                            <span className={'font-semibold text-xl'}>{feat.title}</span>
                                        </div>
                                        <div className={'flex space-x-2 text-sm text-gray-500'}>
                                            <IoLocationOutline/>
                                            <span>{feat.address}</span>
                                        </div>
                                        <ul className={'flex justify-between items-center text-gray-500 text-sm'}>
                                            <li>
                                                <div className={'flex items-center space-x-2'}>
                                                    <LiaBedSolid/>
                                                    <p>
                                                        Beds <span className={'font-medium'}>{feat.bed}</span>
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={'flex items-center space-x-2'}>
                                                    <FaShower/>
                                                    <p>
                                                        Baths <span className={'font-medium'}>{feat.bath}</span>
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
                                        <div
                                            className={'flex justify-between items-center font-light text-sm text-gray-500'}>
                                            <div className={'flex items-center space-x-2'}>
                                                <img
                                                    className={'w-9 rounded-full'}
                                                    src="https://dreamhomewp.themesflat.com/wp-content/uploads/2023/11/user-1-1.jpg"
                                                    alt="user"
                                                />
                                                <span
                                                    className={'cursor-pointer transition-all duration-300 hover:text-primary'}>Bukola Bliss</span>
                                            </div>
                                            <div>
                                                <span>Build in: {feat.yearBuilt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserSearchResult;
