import { IoLocationOutline } from "react-icons/io5";
import { LiaBedSolid } from "react-icons/lia";
import { FaShower } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { RxMixerVertical } from "react-icons/rx";
import { useState, useEffect } from "react";
import PropertyFilters from "../../../components/FrontComponents/PropertyFilters";

const Index = () => {
    const [toggle,  setToggle] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    const handleOptions = () => {
        setToggle(!toggle)
    }
    const categories = [
        {
            id: 0,
            name:"house"
        },
        {
            id: 1,
            name:"Appartment"
        },
        {
            id: 2,
            name:"Condo"
        },
        {
            id: 3,
            name:"villa"
        },
        {
            id: 4,
            name:"two story"
        },
    ]
    const cities = [
        {
            id: 0,
            name:"winnipeg"
        },
        {
            id: 1,
            name:"brandon"
        },
        {
            id: 2,
            name:"morden"
        },
    ]
    const neighbourhoods = [
        {
            id: 0,
            name:"st vital"
        },
        {
            id: 1,
            name:"east St Paul"
        },
        {
            id: 2,
            name:"bridgewater"
        },
        {
            id: 3,
            name:"island lakes"
        },
        {
            id: 4,
            name:"transcona"
        },
    ]
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
            id:1,
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
            id:2,
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
            id:3,
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
        <section className={'mt-2'}>
            <div className="flex items-center justify-center gap-x-1 sm:gap-x-3 shadow-lg pt-2 pb-3">
                <div className="hidden sm:flex justify-center items-center">
                     <select className="border rounded-lg p-3 w-full space-x-1"> 
                        <option className="">Neighbourhoods</option>
                            {neighbourhoods.map(neigh => (
                            <option className="" key={neigh.id}>
                                {neigh.name}
                            </option>

                        ))}
                    </select>
                </div>
                <div className="hidden sm:flex justify-center items-center">
                     <select className="border rounded-lg p-3 space-x-1"> 
                        <option>Categories</option>
                            {categories.map(category => (
                            <option key={category.id}>
                                {category.name}
                            </option>

                        ))}
                    </select>
                </div>
                <div className="hidden sm:flex justify-center items-center">
                     <select className="border rounded-lg p-3 space-x-1"> 
                        <option>Cities</option>
                            {cities.map(city => (
                            <option key={city.id}>
                                {city.name}
                            </option>

                        ))}
                    </select>
                </div>
                <button onClick={handleOptions} className="flex items-center gap-1 sm:hidden bg-primary bg-opacity-50 rounded-md p-3 sm:py-3 sm:px-9">
                    <RxMixerVertical className="text-lg font-extrabold" /> <p className="font-extrabold">Filters</p>
                </button>
                <button className="flex items-center gap-1 bg-primary p-3 sm:py-3 sm:px-9  bg-opacity-50 rounded-md">
                    <IoIosSearch className="text-lg font-extrabold"  /> <p className="font-extrabold">Search </p>
                </button>
                
            </div>
                {toggle && isMobile&&
                        <div className="w-full z-30 transition-all duration-300 shadow-lg flex justify-center">
                            <div className="bg-white w-full rounded-lg flex justify-center">
                                <PropertyFilters />
                            </div>
                        </div>
                    }
            <div className={' p-3 gap-4 text-center'}>
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