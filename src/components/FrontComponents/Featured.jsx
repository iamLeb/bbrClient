import { IoLocationOutline } from "react-icons/io5";
import { LiaBedSolid } from "react-icons/lia";
import { FaShower } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Featured = () => {
    const featured = [
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
            image: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$106,000',
            title: 'The Pinnacle Dr',
            address: '252 Pinnacle dr, Winnipeg, Manitoba',
            beds: 2,
            baths: 2,
            sqft: 600,
        },
        {
            id:2,
            featured: true,
            image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$106,000',
            title: 'St Vital Centre',
            address: '1225 St Mary Rd, Winnipeg, Manitoba',
            beds: 19,
            baths: 17,
            sqft: '8,500',
        },
        {
            id:3,
            featured: true,
            image: 'https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$106,000',
            title: 'Kiloradian Place',
            address: '252 Kildonan Mall, Winnipeg, Manitoba',
            beds: 1,
            baths: 1,
            sqft: 600,
        },
        {
            id:4,
            featured: true,
            image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$106,000',
            title: 'Garden City',
            address: '888 Garden City, Winnipeg, Manitoba',
            beds: 2,
            baths: 2,
            sqft: 600,
        },
        {
            id:5,
            featured: true,
            image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$900,000',
            title: 'Portage Place',
            address: '323 Portage Ave, Winnipeg, Manitoba',
            beds: 4,
            baths: 4,
            sqft: 900,
        },
        {
            id:6,
            featured: true,
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$600,000',
            title: 'Smith West Place',
            address: '323 Smith West PL, Winnipeg, Manitoba',
            beds: 4,
            baths: 4,
            sqft: 900,
        },
        {
            id:7,
            featured: true,
            image: 'https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$190,000',
            title: 'The Place',
            address: '323 The Place RD, Winnipeg, Manitoba',
            beds: 6,
            baths: 6,
            sqft: '1,800',
        },
    ];
    return (
        <section className={'mt-2'}>
            <div className={'flex flex-col justify-center items-center gap-5'}>
                <div className={'flex flex-col justify-between gap-4 text-center'}>
                    <h1 className={'font-bold text-4xl sm:text-5xl'}>Featured Properties</h1>
                    <p className={'font-light text-sm'}>Explore all the different types of properties so you can choose
                        the best option for you.</p>
                </div>

                <div className={'grid grid-cols-3 md:grid-cols-7 gap-4 font-light text-sm text-center justify-center'}>
                    <button className={'tag text-primary'}>All</button>
                    <button className={'tag'}>Apartments</button>
                    <button className={'tag'}>Bungalow</button>
                    <button className={'tag'}>House</button>
                    <button className={'tag'}>Office</button>
                    <button className={'tag'}>Smart Home</button>
                    <button className={'tag'}>Villa</button>
                </div>

            </div>

            {/*Featured Properties*/}
            <div className={'px-3 mt-5'}>
                <div className={'grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}>
                    {featured.map(feat => (
                        <div key={feat.id} className={'border border-gray-200 p-5 rounded-lg'}>
                            <div className={'flex flex-col gap-3 justify-center'}>
                                <div className={'relative overflow-hidden rounded-lg h-56'}>
                                    <img
                                        className={'h-full w-full cursor-pointer transition-all duration-300 hover:brightness-75 hover:scale-105'}
                                        src={feat.image}
                                        alt="image"/>
                                    {feat.featured && (
                                        <span
                                            className={'absolute top-3 left-3 bg-primary text-white text-xs rounded-lg px-1.5 py-0.5'}>Featured</span>
                                    )}

                                    <span
                                        className={'absolute bottom-3 left-3 text-white font-bold text-2xl'}>{feat.amount}</span>
                                    <ul className={'flex absolute right-3 bottom-3 space-x-2'}>
                                        <li>
                                            <div
                                                className={'cursor-pointer transition-all duration-300 bg-neutral-700 p-2 rounded-full hover:bg-primary'}>
                                                <FaArrowRightArrowLeft size={12} className={'rounded-full text-white'}/>
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className={'cursor-pointer transition-all duration-300 bg-neutral-700 p-2 rounded-full hover:bg-primary'}>
                                                <IoBookmarkOutline size={12} className={'rounded-full text-white'}/>
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className={'cursor-pointer transition-all duration-300 bg-neutral-700 p-2 rounded-full hover:bg-primary'}>
                                                <IoIosSearch size={12} className={'rounded-full text-white'}/>
                                            </div>
                                        </li>
                                    </ul>
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

export default Featured;