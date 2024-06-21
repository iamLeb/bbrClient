import React from 'react';
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { RxCaretRight } from "react-icons/rx";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { SlSocialTwitter } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={'bg-neutral-900'}>
            <div
                className={'relative container mx-auto lg:flex justify-center space-y-9 lg:space-y-0 lg:space-x-4 px-6 py-24 gap-9'}>
                <div className={'relative'}>
                    <div className={'bg-[#fff5e0] rounded-xl px-4 sm:px-10 shadow-lg py-10'}>
                        <div className={'sm:flex justify-center space-x-4 items-center'}>
                            <img src="https://dreamhomewp.themesflat.com/wp-content/uploads/2023/08/selecbox-2-1-2.png"
                                 alt="photo"/>
                            <div className={'flex flex-col gap-4 pb-2'}>
                                <h1 className={'font-bold text-3xl'}>You need a house</h1>
                                <p className={'text-xs text-gray-600 w-72'}>
                                    Tell us your needs, we will give you
                                    thousands of suggestions for the dream home.</p>
                            </div>
                            <button
                                className={'sm:absolute -bottom-7 bg-[#ffaa20] px-8 py-4 rounded-md text-white font-bold'}>Contact
                                Seller
                            </button>
                        </div>
                    </div>
                </div>

                <div className={'relative'}>
                    <div className={'bg-[#fff5e0] rounded-xl px-4 sm:px-10 shadow-lg py-10'}>
                        <div className={'sm:flex justify-center space-x-4 items-center'}>
                            <img src="https://dreamhomewp.themesflat.com/wp-content/uploads/2023/08/selecbox-1-1-2.png"
                                 alt="photo"/>
                            <div className={'flex flex-col gap-4 pb-2'}>
                                <h1 className={'font-bold text-3xl'}>Sell your house</h1>
                                <p className={'text-xs text-gray-600 w-72'}>We will connect you to thousands of people
                                    who need to buy a home.</p>
                            </div>
                            <button
                                className={'sm:absolute -bottom-7 bg-[#ffaa20] px-8 py-4 rounded-md text-white font-bold'}>Contact
                                Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr className={'border-neutral-500'}/>
            <div className={'container mx-auto hidden lg:flex justify-around py-16'}>
                <div>
                    <h1 className={'font-bold text-white py-5'}>Office Address</h1>

                    <ul className={'flex flex-col gap-4 pb-2 px-6'}>
                        <li>
                            <span className={'text-sm text-[#808081]'}>Head office:</span>
                            <p className={'text-white text-sm'}>2118 Thornridge Cir. Syracuse, Connecticut
                                35624</p>
                        </li>
                        <li>
                            <span className={'text-sm text-[#808081]'}>Head office:</span>
                            <p className={'text-white text-sm'}>2118 Thornridge Cir. Syracuse, Connecticut
                                35624</p>
                        </li>
                        <li className={'border-t border-neutral-500'}>
                            <p className={'text-white text-sm'}>3517 W. Gray St. Utica, Pennsylvania 57867</p>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1 className={'font-bold text-white py-5'}>Contact Information</h1>

                    <ul className={'flex flex-col gap-4 pb-2 px-6'}>
                        <li>
                            <div className={'flex items-center space-x-4'}>
                                <LiaPhoneVolumeSolid size={36}/>
                                <div>
                                    <p>Hotline:</p>
                                    <span className={'text-white'}>(201) 555-0124</span>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className={'flex items-center space-x-4'}>
                                <MdOutlineMarkEmailRead size={36}/>
                                <div>
                                    <p>Email:</p>
                                    <span className={'text-white'}>(201) 555-0124</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h1 className={'font-bold text-white py-5'}>Our Company</h1>

                    <ul className={'flex flex-col gap-4 pb-2 px-6'}>
                        <li>
                            <div className={'flex items-center space-x-2 hover:text-primary cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span className={'text-sm text-white'}>Property For Sale</span>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center space-x-2 hover:text-primary cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span className={'text-sm text-white'}>Property For Rent</span>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center space-x-2 hover:text-primary cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span className={'text-sm text-white'}>About Us</span>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center space-x-2 hover:text-primary cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span className={'text-sm text-white'}> Our Agents</span>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center space-x-2 hover:text-primary cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span className={'text-sm text-white'}>Our Agency</span>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center space-x-2 cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span className={'text-sm text-white'}>Contact Us</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={'flex flex-col gap-4'}>
                    <h1 className={'font-bold text-white py-3'}>Newsletter</h1>
                    <p className={'text-xs text-white px-6'}>Sign up to receive the latest articles</p>

                    <form className={'flex flex-col gap-4 px-6'}>
                        <input
                            className={'bg-white text-xs py-4 rounded-lg px-5 w-full'}
                            placeholder={'Your email address'}
                            type="text"/>

                        <button
                            className={'hover:bg-neutral-900 transition-all duration-300 flex space-x-4 items-center justify-center rounded-lg py-4 text-white font-medium bg-[#333335] border border-gray-700'}>
                            <span>Sign up</span>
                            <HiOutlineArrowNarrowRight/>
                        </button>

                    </form>
                </div>
            </div>

            <hr className={'border-neutral-500'}/>

            {/*Mobile view*/}
            <div className={'hidden sm:block'}>
                <div className={'flex justify-around py-9'}>
                    <h1 className={'text-4xl text-white font-bold'}>logo</h1>
                    <ul className={'flex items-center space-x-6 text-white font-bold'}>
                        <li>
                            <div className={'cursor-pointer hover:text-primary'}>Property</div>
                        </li>
                        <li>
                            <div className={'cursor-pointer hover:text-primary'}>Page</div>
                        </li>
                        <li>
                            <div className={'cursor-pointer hover:text-primary'}>Blog</div>
                        </li>
                        <li>
                            <div className={'cursor-pointer hover:text-primary'}>Contact</div>
                        </li>
                    </ul>
                    <div className={'flex items-center space-x-4'}>
                    <span
                        className={'border border-neutral-800 hover:bg-primary text-white p-3 rounded-full'}><SlSocialTwitter/></span>
                        <span
                            className={'border border-neutral-800 hover:bg-primary text-white p-3 rounded-full'}><FiFacebook/></span>
                        <span
                            className={'border border-neutral-800 hover:bg-primary text-white p-3 rounded-full'}><FaInstagram/></span>
                    </div>
                </div>

                <hr className={'border-neutral-500'}/>
                <p className="text-center py-5 text-white text-sm">
                    Copyright © 2024 Real estate CP. Designed & Developed by Group II
                </p>
            </div>

            <div className="lg:hidden text-center py-9">
                <h1 className={'text-4xl text-white font-bold'}>logo</h1>
                <p className={'text-xs text-neutral-500 font-light py-5'}>Lorem ipsum dolor sit amet.</p>
                <div className={'flex items-center justify-center space-x-4'}>
                    <span
                        className={'border border-neutral-800 hover:bg-primary text-white p-3 rounded-full'}><SlSocialTwitter/></span>
                    <span
                        className={'border border-neutral-800 hover:bg-primary text-white p-3 rounded-full'}><FiFacebook/></span>
                    <span
                        className={'border border-neutral-800 hover:bg-primary text-white p-3 rounded-full'}><FaInstagram/></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;