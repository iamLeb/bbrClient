import { IoLocationOutline } from "react-icons/io5";
import { LiaBedSolid } from "react-icons/lia";
import { FaShower } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { RxMixerVertical } from "react-icons/rx";

const Index = () => {
    const listing = [
        {
            id:0,
            featured: true,
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$146,000',
            title: 'Lot 6',
            address: '15 Berwick crt, Winnipeg, Manitoba',
            beds: 4,
            baths: 4,
            sqft: 900,
        },
        {
            id:0,
            featured: true,
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$146,000',
            title: 'Lot 6',
            address: '15 Berwick crt, Winnipeg, Manitoba',
            beds: 4,
            baths: 4,
            sqft: 900,
        },
        {
            id:0,
            featured: true,
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$146,000',
            title: 'Lot 6',
            address: '15 Berwick crt, Winnipeg, Manitoba',
            beds: 4,
            baths: 4,
            sqft: 900,
        },
        {
            id:0,
            featured: true,
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$146,000',
            title: 'Lot 6',
            address: '15 Berwick crt, Winnipeg, Manitoba',
            beds: 4,
            baths: 4,
            sqft: 900,
        },

    ]
    return (
        <section className={'mt-2 py-9 '}>
            <div className=" flex items-center justify-evenly pb-3">
                <ul className="flex gap-1">
                    <li className={'flex lg:flex-none border rounded-lg lg:w-1/2'}>
                        <input id="searchKey" className={'focus:outline-primary rounded-lg p-3'}
                            type={"text"}
                            placeholder={"Address"}/>
                    </li>
                    <li className={'flex lg:flex-none border rounded-lg lg:w-1/2'}>
                        <input id="searchKey" className={'focus:outline-primary rounded-lg p-3'}
                            type={"text"}
                            placeholder={"Enter keyword..."}/>
                    </li>
                </ul>
                <div className="flex items-center gap-1 bg-primary bg-opacity-50 rounded-md py-2 px-5">
                    <RxMixerVertical className="text-3xl font-bold" /> <p className="text-xl">Filters</p>
                </div>
                <div className="flex items-center gap-1 bg-primary py-2 px-5  bg-opacity-50 rounded-md">
                    <IoIosSearch className="text-3xl font-bold"  /> <p className="text-xl">Search </p>
                </div>
                
            </div>
            <div className={' px-3 gap-4 text-center'}>
                <h1 className={'font-bold text-3xl sm:text-4xl'}>Property Listings</h1>
                <p className={'font-light text-sm'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            {/*Featured Properties*/}
            <div className={'px-3 mt-5 flex justify-evenly'}>
                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 lg:grid-cols-3 gap-4'}>
                    {listing.map(feat => (
                        <div key={feat.id} className={'border border-gray-200 bg-white p-5 rounded-lg group'}>
                            <div className={'flex flex-col gap-3 justify-center'}>
                                <div className={'relative rounded-lg h-56'}>
                                    <span className={'absolute bottom-3 left-3 text-white font-bold text-2xl'}>{feat.amount}</span>
                                    <div className={'relative overflow-hidden rounded-lg h-56'}>
                                        <img
                                            className={'object-cover h-full w-full cursor-pointer transition-all duration-300 group-hover:brightness-75 group-hover:scale-105'}
                                            src={feat.image}
                                            alt="image"/>
                                        <ul className={'transition-all duration-500 flex absolute top-0 h-full w-full justify-center items-center space-x-2 opacity-0 group-hover:opacity-100'}>
                                            <li className="text-primary bg-white hover:text-white rounded-full hover:bg-primary">
                                                <div
                                                    className={'cursor-pointer transition-all duration-300 bg-white p-4 rounded-full  hover:bg-primary'}>
                                                    <FaArrowRightArrowLeft  className={'rounded-full text-xl'}/>
                                                </div>
                                            </li>
                                            <li className="text-primary bg-white hover:text-white rounded-full hover:bg-primary">
                                                <div
                                                    className={'cursor-pointer transition-all duration-300 bg-white p-4 rounded-full hover:text-white hover:bg-primary'}>
                                                    <IoBookmarkOutline className={'rounded-full text-xl'}/>
                                                </div>
                                            </li>
                                            <li className="text-primary bg-white hover:text-white rounded-full hover:bg-primary">
                                                <div
                                                    className={'cursor-pointer transition-all duration-300 bg-white p-4 rounded-full item hover:bg-primary '}>
                                                    <IoIosSearch className={'rounded-full  text-xl'}/>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <span className={'absolute -bottom-6 left-3 text-primary bg-white shadow-2xl rounded-md p-3 text-xl'}>{feat.amount}</span>
                                </div>
                                <div className="pt-5">
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
                                             alt=""/>
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

export default Index;