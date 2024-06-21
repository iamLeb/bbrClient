import {FaSortAmountDownAlt} from "react-icons/fa";
import {IoIosSearch} from "react-icons/io";
import {PiLineVerticalThin} from "react-icons/pi";
import {useState} from 'react';
import PropertyType from "./PropertyType.jsx";
import Province from "./Province.jsx";

const Hero = () => {
    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const [switchSale, setSwitchSale] = useState(false)

    const handleSwitchSale = () => {
        setSwitchSale(!switchSale)
    }


    return (//parent div
        <div
            className={'h-screen flex flex-col justify-center space-y-10 p-5 bg-gradient-to-br from-white to-[#fdeccf] to-100%'}>

            {/*top div*/}
            <div className={'flex flex-col space-y-4 mt-10 sm:mt-0'}>
                <p className={'tracking-wide text-4xl md:text-7xl font-bold md:w-1/2'}>We'll help you find a place
                    you'll love
                </p>
                <p> With the most complete source of homes for sale & properties near you.</p>
            </div>

            {/*middle div*/}
            <div className={'flex flex-col space-y-1'}>

                {/*for rent and for sale div*/}
                <div>
                    <ul className={'flex space-x-0.5 font-semibold'}>
                        <li><span
                            className={`shadow-md rounded-tl p-3 hover:cursor-pointer ${switchSale ? 'bg-white text-black hover:text-white hover:bg-primary' : 'text-white bg-primary'}`}
                            onClick={handleSwitchSale}>For Rent</span></li>
                        <li><span
                            className={`shadow-md rounded-tr p-3 transition duration-800 hover:ease-in hover:cursor-pointer ${switchSale ? 'bg-primary text-white' : 'text-black bg-white hover:bg-primary hover:text-white'} `}
                            onClick={handleSwitchSale}>For Sale</span>
                        </li>
                    </ul>
                </div>

                <div className={'bg-white rounded-r-lg rounded-bl-lg md:w-2/3 p-8 space-y-2'}>
                    <ul className={'flex justify-center items-center gap-2'}>

                        <li className={'block lg:hidden bg-[#FFF7EB] hover:bg-primary p-3 rounded-lg text-primary hover:text-white'}
                            onClick={handleToggle}>
                            <FaSortAmountDownAlt/>
                        </li>

                        <li className={'flex-1 lg:flex-none border rounded-lg'}>
                            <input id="searchKey" className={'focus:outline-primary rounded-lg p-3 w-[100%]'}
                                   type={"text"}
                                   placeholder={"  Enter keyword..."}/>
                        </li>


                        <li className={'flex-1 hidden lg:block'}>
                            <PropertyType/>
                        </li>

                        <li className={'flex-1 hidden lg:block'}>
                            <Province/>
                        </li>

                        <li className={'flex justify-center items-center bg-primary rounded-lg text-white p-3 md:space-x-2 hover:bg-black hover:cursor-pointer'}>
                            <span className={'font-semibold text-sm hidden md:block'}>Search Now</span>
                            <IoIosSearch size={24}/>
                        </li>
                    </ul>

                    <div
                        className={toggle ? 'block' : 'hidden'}>
                        <ul className={'flex flex-col space-y-2 lg:hidden'}>
                            <li><PropertyType/></li>
                            <li><Province/></li>
                        </ul>
                    </div>
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

        </div>)
}

export default Hero