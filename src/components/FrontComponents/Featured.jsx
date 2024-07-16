import { IoLocationOutline } from "react-icons/io5";
import { LiaBedSolid } from "react-icons/lia";
import { FaShower } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import {useContext} from "react";
import GlobalContext from "../../context/Global.js";
import ViewMore from "./ViewMore.jsx";
import {useNavigate} from "react-router-dom";

const Featured = () => {
    const navigate = useNavigate();
    const {categories, properties} = useContext(GlobalContext)

    return (
        <section className={'pt-28 sm:py-9 bg-sky-100'}>
            <div className={'flex flex-col justify-center items-center gap-5'}>
                <div className={'flex flex-col justify-between gap-4 text-center'}>
                    <h1 className={'font-bold text-4xl sm:text-5xl'}>Featured Properties</h1>
                    <p className={'font-light text-sm'}>Explore all the different types of properties so you can choose
                        the best option for you.</p>
                </div>

                <div className={'grid grid-cols-3 md:grid-cols-7 gap-4 font-light text-sm text-center justify-center'}>
                    {categories.slice(0,8).map(category => (
                        <button key={category._id} className={'tag text-black font-bold'}>{category.name}</button>
                    ))}
                </div>

            </div>

            {/*Featured Properties*/}
            <div className={'px-3 mt-5'}>
                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}>
                    {properties.slice(properties.length -9, properties.length -1).map(feat => (
                        <div key={feat._id} className={'border border-gray-200 bg-white p-5 rounded-lg'}>
                            <div className={'flex flex-col gap-3 justify-center'}>
                                <div className={'relative overflow-hidden rounded-lg h-56'}>
                                    <img
                                        className={'object-cover h-full w-full cursor-pointer transition-all duration-300 hover:brightness-75 hover:scale-105'}
                                        src={feat.url}
                                        alt="image"/>
                                        <span className={'absolute top-3 left-3 bg-primary text-white text-xs rounded-lg px-1.5 py-0.5'}>Featured</span>

                                    <div
                                        className={`${!feat.status ? 'top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2' : 'bottom-3 left-3'} absolute text-white font-bold text-2xl`}>{feat.status ? feat.amount : <span className={'bg-red-500 rounded-lg px-3 text-6xl'}>Sold</span> }</div>
                                </div>
                                <div className={'cursor-pointer'} onClick={() => navigate(`/properties/listing/${feat._id}`)}>
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
                                <div className={'flex justify-between items-center font-light text-sm text-gray-500'}>
                                    <div className={'flex items-center space-x-2'}>
                                        <img className={'w-9 rounded-full'}
                                             src="https://dreamhomewp.themesflat.com/wp-content/uploads/2023/11/user-1-1.jpg"
                                             alt=""/>
                                        <span
                                            className={'cursor-pointer transition-all duration-300 hover:text-primary'}>Bukola Bliss</span>
                                    </div>
                                    {feat.yearBuilt && (
                                        <div>
                                            <span>Built in: {feat.yearBuilt}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ViewMore />
        </section>
    );
};

export default Featured;