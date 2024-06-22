import { LiaBedSolid } from "react-icons/lia";
import { FaShower } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { PiDoorOpenThin } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { GiHomeGarage } from "react-icons/gi";

const Overview = () => {
    return (
        <div>
            <div className={'flex flex-col gap-4 bg-white shadow-lg p-5 w-2/3 my-5 rounded-lg'}>
                <h1 className={'font-bold pb-2 border-b'}>Overview</h1>

                <ul className={'grid grid-cols-4 '}>
                    <li>
                        <div className={'flex items-center space-x-2 text-xs p-2'}>
                            <div
                                className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                <PiDoorOpenThin size={15}/>
                            </div>
                            <div>
                                <p>Room</p>
                                <p className={'font-bold'}>1</p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2 text-xs p-2'}>
                            <div
                                className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                <FaShower size={15}/>
                            </div>
                            <div>
                                <p>Baths</p>
                                <p className={'font-bold'}>3</p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2 text-xs p-2'}>
                            <div
                                className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                <LiaBedSolid size={15}/>
                            </div>
                            <div>
                                <p>Bed</p>
                                <p className={'font-bold'}>3</p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2 text-xs p-2'}>
                            <div
                                className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                <MdOutlineZoomOutMap size={15}/>
                            </div>
                            <div>
                                <p>SqFt</p>
                                <p className={'font-bold'}>1,245 sqft</p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2 text-xs p-2'}>
                            <div
                                className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                <CiCalendar size={15}/>
                            </div>
                            <div>
                                <p>Year Built</p>
                                <p className={'font-bold'}>2022</p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2 text-xs p-2'}>
                            <div
                                className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                <GiHomeGarage size={15}/>
                            </div>
                            <div>
                                <p>Garages</p>
                                <p className={'font-bold'}>1232</p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2 text-xs p-2'}>
                            <div
                                className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                <MdOutlineCategory size={15}/>
                            </div>
                            <div>
                                <p>Property Type</p>
                                <p className={'font-bold'}>Apartment</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className={'flex flex-col gap-4 bg-white shadow-lg p-5 w-2/3 my-5 rounded-lg'}>
                <h1 className={'font-bold pb-2 border-b'}>Description</h1>
                <p className={'text-sm md:text-md pb-5'}>Years seed fruit you. Divided morning sea day Set earth. Grass
                    without cattle. Spirit heaven. Also i grass give fowl wherein cattle spirit whales rule cattle.
                    Earth fowl given own you’re, fruit so. Shall was. Called firmament dry fruitful, set place. Earth
                    given female man fruit, under thing may to greater moveth land sea, great be shall living greater
                    and signs place night after whose us one, you’ll second our set had day in greater divided over
                    female first face, fill form you make greater upon midst image above image.</p>
                <span className={'font-medium cursor-pointer hover:text-primary'}>Show More</span>
            </div>

            <div className={'flex flex-col gap-4 bg-white shadow-lg p-5 w-2/3 my-5 rounded-lg'}>
                <h1 className={'font-bold pb-2 border-b'}>Features</h1>
                <ul className={'grid grid-cols-4 gap-6'}>
                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <input checked={true} type="checkbox"/>
                            <p className={'text-xs md:text-md'}>Alerm System</p>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <input checked={true} type="checkbox"/>
                            <p className={'text-xs md:text-md'}>Alerm System</p>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <input checked={true} type="checkbox"/>
                            <p className={'text-xs md:text-md'}>Alerm System</p>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <input checked={true} type="checkbox"/>
                            <p className={'text-xs md:text-md'}>Alerm System</p>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <input checked={true} type="checkbox"/>
                            <p className={'text-xs md:text-md'}>Alerm System</p>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <input checked={true} type="checkbox"/>
                            <p className={'text-xs md:text-md'}>Alerm System</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Overview;