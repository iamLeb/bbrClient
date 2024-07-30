import {LiaBedSolid} from "react-icons/lia";
import {FaShower} from "react-icons/fa";
import {MdOutlineZoomOutMap} from "react-icons/md";
import {PiDoorOpenThin} from "react-icons/pi";
import {CiCalendar} from "react-icons/ci";
import {MdOutlineCategory} from "react-icons/md";
import {GiHomeGarage} from "react-icons/gi";
import React, {useContext} from "react";
import GlobalContext from "../../context/Global.js";
import {useNavigate} from "react-router-dom";

const Overview = ({property}) => {
    const {getName, getNeighbourhoodName} = useContext(GlobalContext);
    const navigate = useNavigate();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return (
        <div className={'flex justify-between items-center gap-6'}>
            <div className={'md:flex justify-between'}>
                <div className={'p-3 md:p-0 md:w-2/3'}>
                    <div className={'flex flex-col gap-4 bg-white shadow-lg p-5 my-5 rounded-lg'}>
                        <h1 className={'font-bold pb-2 border-b'}>Overview</h1>

                        <ul className={'grid grid-cols-3 '}>
                            <li>
                                <div className={'flex items-center space-x-2 text-xs p-2'}>
                                    <div
                                        className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                        <FaShower size={15}/>
                                    </div>
                                    <div>
                                        <p>Baths</p>
                                        <p className={'font-bold'}>{property.bath}</p>
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
                                        <p className={'font-bold'}>{property.bed}</p>
                                    </div>
                                </div>
                            </li>
                            {property.sqft &&
                                <li>
                                    <div className={'flex items-center space-x-2 text-xs p-2'}>
                                        <div
                                            className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                            <MdOutlineZoomOutMap size={15}/>
                                        </div>
                                        <div>
                                            <p>SqFt</p>
                                            <p className={'font-bold'}>{property.sqft} sqft</p>
                                        </div>
                                    </div>

                                </li>}

                            {property.yearBuilt &&
                                <li>
                                    <div className={'flex items-center space-x-2 text-xs p-2'}>
                                        <div
                                            className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                            <CiCalendar size={15}/>
                                        </div>
                                        <div>
                                            <p>Year Built</p>
                                            <p className={'font-bold'}>{property.yearBuilt}</p>
                                        </div>
                                    </div>
                                </li>
                            }

                            {property.landArea &&
                                <li>
                                    <div className={'flex items-center space-x-2 text-xs p-2'}>
                                        <div
                                            className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                            <CiCalendar size={15}/>
                                        </div>
                                        <div>
                                            <p>Land Area</p>
                                            <p className={'font-bold'}>{property.landArea} acres</p>
                                        </div>
                                    </div>
                                </li>
                            }

                            <li>
                                <div className={'flex items-center space-x-2 text-xs p-2'}>
                                    <div
                                        className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                        <MdOutlineCategory size={15}/>
                                    </div>
                                    <div>
                                        <p>Property Type</p>
                                        <p className={'font-bold'}>{getName(property.category)}</p>
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
                                        <p>Neighbourhood</p>
                                        <p className={'font-bold'}>{getNeighbourhoodName(property.neighbourhood)}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={'flex flex-col gap-4 bg-white shadow-lg p-5  my-5 rounded-lg'}>
                        <h1 className={'font-bold pb-2 border-b'}>Description</h1>
                        <p className={'text-sm md:text-md pb-5'}>
                            {property.description.split('\n').map((line, index) => (
                                <p key={index} className="font-medium text-gray-700 leading-relaxed">
                                    {line}
                                    <br/>
                                </p>
                            ))}
                        </p>
                    </div>

                    <div className={'flex flex-col gap-4 bg-white shadow-lg p-5  my-5 rounded-lg'}>
                        <h1 className={'font-bold pb-2 border-b'}>Location</h1>
                        <div className={'grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-6 text-sm'}>
                            <div>
                                <h3 className={'font-bold'}>Address</h3>
                                <span>{property.address}</span>
                            </div>

                            <div>
                                <h3 className={'font-bold'}>Country</h3>
                                <span>Canada</span>
                            </div>

                            <div>
                                <h3 className={'font-bold'}>Province/City</h3>
                                <span>{capitalizeFirstLetter(property.city)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/3 p-5">
                    <div className="bg-gray-50 border p-5 rounded-lg flex flex-col gap-4 sticky top-1/2">
                        <h1 className="font-bold text-2xl">Interested?</h1>
                        <p className="text-xs">Reach out to us and find out how
                            we can help you secure your dream home with ease and confidence.</p>
                        <button onClick={() => navigate('/contact')}
                                className="bg-primary text-white font-bold w-full py-5 rounded-lg">Apply Now!
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Overview;