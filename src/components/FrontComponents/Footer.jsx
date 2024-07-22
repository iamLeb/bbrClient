import React from 'react';
import {LiaPhoneVolumeSolid} from "react-icons/lia";
import {MdOutlineMarkEmailRead} from "react-icons/md";
import {RxCaretRight} from "react-icons/rx";
import {SlSocialTwitter} from "react-icons/sl";
import {FaLinkedinIn} from "react-icons/fa";
import {FiFacebook} from "react-icons/fi";
import {FaInstagram} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import logo1 from "../../assets/images/logo/Bliss logo black white.png";


const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className={'bg-primary'}>
            <div
                className={'relative container mx-auto lg:flex justify-center space-y-9 lg:space-y-0 lg:space-x-4 px-6 py-24 gap-9'}>
                <div className={'relative'}>
                    <div className={'bg-[#d5eaea] rounded-xl px-4 sm:px-10 shadow-lg py-10'}>
                        <div className={'sm:flex justify-center space-x-4 items-center'}>
                            <img src="https://dreamhomewp.themesflat.com/wp-content/uploads/2023/08/selecbox-2-1-2.png"
                                 alt="photo"/>
                            <div className={'flex flex-col gap-4 pb-2'}>
                                <h1 className={'font-bold text-3xl'}>Need a house</h1>
                                <p className={'text-xs text-gray-600 w-72'}>
                                    Tell us your needs, we will give you
                                    thousands of suggestions for the dream home.</p>
                            </div>
                            <button onClick={() => navigate('/contact')}
                                    className={'sm:absolute -bottom-7 bg-white px-8 py-4 rounded-md text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold'}>Contact
                                Seller
                            </button>
                        </div>
                    </div>
                </div>

                <div className={'relative'}>
                    <div className={'bg-[#d5eaea] rounded-xl px-4 sm:px-10 shadow-lg py-10'}>
                        <div className={'sm:flex justify-center space-x-4 items-center'}>
                            <img src="https://dreamhomewp.themesflat.com/wp-content/uploads/2023/08/selecbox-1-1-2.png"
                                 alt="photo"/>
                            <div className={'flex flex-col gap-4 pb-2'}>
                                <h1 className={'font-bold text-3xl'}>Sell your house</h1>
                                <p className={'text-xs text-gray-600 w-72'}>We will connect you to thousands of people
                                    who need to buy a home.</p>
                            </div>
                            <button onClick={() => navigate('/contact')}
                                    className={'sm:absolute -bottom-7 bg-white px-8 py-4 rounded-md text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold'}>Contact
                                Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'container mx-auto hidden lg:flex justify-around py-16'}>
                <div>
                    <h1 className={'font-bold text-white py-5'}>Office Address</h1>

                    <ul className={'flex flex-col gap-4 pb-2 px-6'}>
                        <li>
                            <span className={'text-sm text-neutral-900'}>Head office:</span>
                            <p className={'text-white text-sm'}>663-A Stafford Street ,Winnipeg Manitoba, R3M2X7</p>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1 className={'font-bold text-white py-5'}>Contact Information</h1>

                    <ul className={'flex flex-col text-neutral-900 gap-4 pb-2 px-6'}>
                        <li>
                            <div className={'flex items-center space-x-4'}>
                                <LiaPhoneVolumeSolid className={'text-neutral-800'} size={36}/>
                                <div>
                                    <p>Hotline:</p>
                                    <span className={'text-white'}>
                                        <a href="tel:4319969920">(431) 996-9920</a>
                                    </span>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className={'flex items-center space-x-4'}>
                                <MdOutlineMarkEmailRead className={'text-neutral-800'} size={36}/>
                                <div>
                                    <p>Email:</p>
                                    <span className={'text-white'}>
                                        <a target='_blank' href="mailto:Bbliss@sutton.com">Bbliss@sutton.com</a>
                                    </span>
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
                                <span onClick={() => navigate('/')}
                                      className={'text-sm text-white hover:text-black'}>Home</span>
                            </div>
                        </li>

                        <li>
                            <div className={'flex items-center space-x-2 hover:text-primary cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span onClick={() => navigate('/about')}
                                      className={'text-sm text-white hover:text-black'}>About Us</span>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center space-x-2 hover:text-primary cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span onClick={() => navigate('/blog')}
                                      className={'text-sm text-white hover:text-black'}>Blog</span>
                            </div>
                        </li>

                        <li>
                            <div className={'flex items-center space-x-2 cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span onClick={() => navigate('/contact')}
                                      className={'text-sm text-white hover:text-black'}>Contact Us</span>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center space-x-2 hover:text-primary cursor-pointer'}>
                                <RxCaretRight className={'text-primary'}/>
                                <span onClick={() => navigate('/properties/listing')}
                                      className={'text-sm text-white hover:text-black'}>Listings</span>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>

            <div className={'hidden sm:block'}>
                <div className={'flex justify-around py-9'}>
                    <div>
                        <img className={'w-24 ml-20'} src={logo1} alt="logo"/>
                    </div>
                    <div className={'flex items-center space-x-4'}>
                    <span onClick={() => window.open('https://www.linkedin.com/in/bukola-bliss-b50335b4/', '_blank')}
                          className={'border border-gray-100 hover:bg-gray-500 transition-all duration-300 cursor-pointer text-white p-3 rounded-full'}>
                        <FaLinkedinIn/></span>
                        <span onClick={() => window.open('https://www.facebook.com/olubukola.akinjo', '_blank')}
                              className={'border border-gray-100 hover:bg-gray-500 transition-all duration-300 cursor-pointer text-white p-3 rounded-full'}><FiFacebook/></span>
                        <span
                            onClick={() => window.open('https://www.instagram.com/olubukolablissrealtor/?locale=id', '_blank')}
                            className={'border border-gray-100 hover:bg-gray-500 transition-all duration-300 cursor-pointer text-white p-3 rounded-full'}><FaInstagram/></span>
                    </div>
                </div>

                <p className="text-center py-5 text-white text-sm">
                    Copyright © 2024 All Rights Reserved, Bukola Bliss Realtor
                </p>
            </div>

            <div className="lg:hidden flex justify-center flex-col items-center py-9">
                <div className={'pb-6'}>
                    <img className={'w-24'} src={logo1} alt="logo"/>
                </div>
                <div className={'flex items-center space-x-4'}>
                    <span onClick={() => window.open('https://www.linkedin.com/in/bukola-bliss-b50335b4/', '_blank')}
                          className={'border border-neutral-800 hover:bg-primary text-white p-3 rounded-full'}><FaLinkedinIn/></span>
                    <span onClick={() => window.open('https://www.facebook.com/olubukola.akinjo', '_blank')}
                          className={'border border-neutral-800 hover:bg-primary text-white p-3 rounded-full'}><FiFacebook/></span>
                    <span
                        onClick={() => window.open('https://www.instagram.com/olubukolablissrealtor/?locale=id', '_blank')}
                        className={'border border-neutral-800 hover:bg-primary text-white p-3 rounded-full'}><FaInstagram/></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;