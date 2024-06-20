import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { TbHomeDollar } from "react-icons/tb";
import { PiLineVerticalThin } from "react-icons/pi";

const Header = () => {
    return (
        <header className={'bg-white shadow-md p-3 py-6 sm:py-3'}>
            <div className={'container mx-auto flex justify-between items-center'}>
                <div>
                    <h1 className={'text-3xl text-primary font-bold'}>logo</h1>
                </div>

                <div className={'hidden md:block text-md font-medium'}>
                    <ul className={'flex space-x-4 items-center'}>
                        <li>
                            <div className={'flex items-center space-x-1 hover:cursor-pointer text-primary'}>
                                <span>Home</span>
                                <IoIosArrowDown size={12}/>
                            </div>

                        </li>
                        <li>
                            <div className={'flex items-center space-x-1 hover:cursor-pointer hover:text-primary'}>
                                <span>Page</span>
                                <IoIosArrowDown size={12}/>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center space-x-1 hover:cursor-pointer hover:text-primary'}>
                                <span>Real Estate</span>
                                <IoIosArrowDown size={12}/>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center space-x-1 hover:cursor-pointer hover:text-primary'}>
                                <span>Blog</span>
                                <IoIosArrowDown size={12}/>
                            </div>
                        </li>
                        <li>
                            <span className={'hover:cursor-pointer hover:text-primary'}>Contact</span>
                        </li>

                        <li>
                            <ul className={'flex items-center space-x-1 bg-primary p-4 rounded-lg font-semibold text-white'}>
                                <li>
                                    <TbHomeDollar/>
                                </li>
                                <li>
                                    <PiLineVerticalThin/>
                                </li>
                                <li>
                                    <span>Sell Properties</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/*Mobile View*/}
                <div className={'flex md:hidden items-center space-x-3'}>
                    <div>
                    <FiMenu className={'text-primary'} size={32} />
                    </div>
                </div>


            </div>
        </header>
    );
};

export default Header;