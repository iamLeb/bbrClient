import {FaSortAmountDownAlt} from "react-icons/fa";
import {IoIosSearch} from "react-icons/io";
import {PiLineVerticalThin} from "react-icons/pi";
import React, {useState} from 'react';
import PropertyType from "./PropertyType.jsx";

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
        <div
            className={'h-screen flex flex-col justify-center space-y-10 p-5 bg-gradient-to-br from-[#FEFEFC] from-20% to-[#F3D895] to-100%'}>

            <div className={'flex flex-col space-y-4'}>
                <span
                    className={'text-5xl md:text-7xl font-bold md:w-1/2'}>We'll help you find a place you'll love</span>
                <span> With the most complete source of homes for sale & properties near you.</span>
            </div>


            <div className={'flex flex-col space-y-1'}>

                <div>
                    <ul className={'flex font-semibold'}>
                        <li><span className={'text-white bg-primary rounded-l-lg p-2'}>For Rent</span></li>
                        <li><span
                            className={'text-black bg-white rounded-r-lg p-2 hover:bg-primary transition duration-800 hover:ease-in hover:text-white hover:cursor-pointer'}>For Sale</span>
                        </li>
                    </ul>
                </div>

                <div className={'bg-white rounded-r-lg rounded-bl-lg md:w-2/3'}>
                    <ul className={'flex justify-center items-center gap-2 p-5'}>

                        <li className={'block md:hidden bg-[#FFF7EB] hover:bg-primary p-3 rounded-lg text-primary hover:text-white'}
                            onClick={handleToggle1}>
                            <FaSortAmountDownAlt/>
                        </li>

                        <li className={'flex-1 md:flex-none border rounded-lg p-2'}>
                            <input id="searchKey" className={'outline-none w-[100%]'} type={"text"}
                                   placeholder={"  Enter keyword..."}/>
                        </li>


                        <li className={'flex-1 hidden md:block'}>
                            <PropertyType/>
                        </li>

                        <li className={'hidden md:block bg-[#FFF7EB] hover:bg-primary p-3 rounded-lg text-primary hover:text-white'}
                            onClick={handleToggle2}>
                            <FaSortAmountDownAlt/>
                        </li>

                        <li className={'flex justify-center items-center bg-primary rounded-lg text-white p-2 md:space-x-1'}>
                            <span className={'font-semibold text-sm hidden md:block'}>Search Now</span>
                            <IoIosSearch size={20}/>
                        </li>
                    </ul>
                </div>

            </div>

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