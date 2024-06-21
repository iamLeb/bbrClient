import {FaSortAmountDownAlt} from "react-icons/fa";
import {IoIosSearch} from "react-icons/io";
import {PiLineVerticalThin} from "react-icons/pi";
import React, {useState} from 'react';
import PropertyType from "./PropertyType.jsx";
import Province from "./Province.jsx";
import Room from "./Room.jsx";
import Bath from "./Bath.jsx";
import PriceRange from "./PriceRange.jsx";
import Size from "./Size.jsx";
import PropertyFeatures from "./PropertyFeatures.jsx";

const Hero = () => {
    const [toggle1, setToggle1] = useState(false)

    const handleToggle1 = () => {
        setToggle1(!toggle1)
    }

    const [toggle2, setToggle2] = useState(false)

    const handleToggle2 = () => {
        setToggle2(!toggle2)
    }

    return (
        //parent div
        <div
            className={'sm:h-screen flex flex-col justify-center space-y-10 p-5 bg-gradient-to-bl from-[#FEFEFC] from-20% to-[#F3D895] to-100%'}>

            {/*top div*/}
            <div className={'flex flex-col space-y-4'}>
                <p
                    className={'text-5xl md:text-7xl font-bold md:w-1/2'}>We'll help you find a place you'll love</p>
                <p> With the most complete source of homes for sale & properties near you.</p>
            </div>

            {/*middle div*/}
            <div className={'flex flex-col space-y-1'}>

                {/*for rent and for sale div*/}
                <div>
                    <ul className={'flex font-semibold'}>
                        <li><span className={'text-white bg-primary rounded-l-lg p-2'}>For Rent</span></li>
                        <li><span
                            className={'text-black bg-white rounded-r-lg p-2 hover:bg-primary transition duration-800 hover:ease-in hover:text-white hover:cursor-pointer'}>For Sale</span>
                        </li>
                    </ul>
                </div>

                <div className={'bg-white rounded-r-lg rounded-bl-lg md:w-2/3 p-8 space-y-2'}>
                    <ul className={'flex justify-center items-center gap-2'}>

                        <li className={'block md:hidden bg-[#FFF7EB] hover:bg-primary p-3 rounded-lg text-primary hover:text-white'}
                            onClick={handleToggle1}>
                            <FaSortAmountDownAlt/>
                        </li>

                        <li className={'flex-1 md:flex-none border rounded-lg p-3'}>
                            <input id="searchKey" className={'outline-none w-[100%]'} type={"text"}
                                   placeholder={"  Enter keyword..."}/>
                        </li>


                        <li className={'flex-1 hidden md:block'}>
                            <PropertyType/>
                        </li>

                        <li className={'flex-1 hidden md:block'}>
                            <Province/>
                        </li>

                        <li className={'hidden md:block bg-[#FFF7EB] hover:bg-primary p-3 rounded-lg text-primary hover:text-white'}
                            onClick={handleToggle2}>
                            <FaSortAmountDownAlt/>
                        </li>

                        <li className={'flex justify-center items-center bg-primary rounded-lg text-white p-3 md:space-x-2 hover:bg-black hover:cursor-pointer'}>
                            <span className={'font-semibold text-sm hidden md:block'}>Search Now</span>
                            <IoIosSearch size={24}/>
                        </li>
                    </ul>

                    <div
                        className={toggle1 ? 'block' : 'hidden'}>
                        <ul className={'flex flex-col space-y-2 md:hidden'}>
                            <li><PropertyType/></li>
                            <li><Province/></li>
                            <li><Room/></li>
                            <li><Bath/></li>
                            <li><PriceRange/></li>
                            <li><Size/></li>
                            <li><PropertyFeatures/></li>
                        </ul>
                    </div>
                </div>

                <div className={toggle2 ? 'block bg-white rounded-md md:w-2/3 p-10 space-y-2 hidden md:block' : 'hidden'}>
                    <ul className={'flex space-x-4 w-full'}>
                        <li className={'w-1/4'}><Room/></li>
                        <li className={'w-1/4'}><Bath/></li>
                        <li className={'w-1/4'}><PriceRange/></li>
                        <li className={'w-1/4'}><Size/></li>
                    </ul>

                    <PropertyFeatures/>
                </div>
            </div>

            {/*bottom div*/}
            <div>
                <ul className={'flex items-center'}>
                    <li className={'flex flex-col'}>
                        <span className={'font-bold text-3xl'}>100+</span>
                        <span className={'opacity-50'}>Property ready</span>
                    </li>

                    <li>
                        <PiLineVerticalThin size={40}/>
                    </li>

                    <li className={'flex flex-col'}>
                        <span className={'font-bold text-3xl'}>100+</span>
                        <span className={'opacity-50'}>Happy customers</span>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Hero