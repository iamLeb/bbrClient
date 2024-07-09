import {IoChatboxEllipsesOutline} from "react-icons/io5";
import PropertyType from "./PropertyType.jsx";
import {FaRegUser} from "react-icons/fa";
import {MdOutlineEmail} from "react-icons/md";
import {FaPhoneAlt} from "react-icons/fa";
import {GrMapLocation} from "react-icons/gr";
import {RxSlash} from "react-icons/rx";
import {MdOutlinePermPhoneMsg} from "react-icons/md";
import {RiMailSendLine} from "react-icons/ri";

const ContactHero = () => {
    return (
        <section className={'py-9 px-5 bg-[#d5eaea]'}>
            <div className={'flex flex-col md:flex-row justify-around items-center pt-12 space-y-10'}>

                <div className={'md:w-1/2 flex flex-col space-y-12 sm:pl-20 '}>
                    <div className={'flex flex-col justify-center w-full sm:w-1/2 text-black'}>
                        <h1 className={'text-3xl lg:text-4xl font-semibold'}>We Provide The Most
                            Suitable And Quality Real
                            Estate.</h1>
                        <p className={'font-light'}>Our team of experts will help you find the best property that suits
                            your needs.</p>
                    </div>

                    <div className={'flex flex-col space-y-5 sm:space-y-2'}>
                        <div className={'flex flex-col sm:flex-row'}>
                            <div>
                                <GrMapLocation size={36}/>
                            </div>
                            <div className={'hidden sm:block'}>
                                <RxSlash size={36}/>
                            </div>
                            <div className={'flex flex-col'}>
                                <p className={'text-gray-500 text-lg'}>Office address</p>
                                <p>2715 Ash Dr. San Jose, South Dakota 83475</p>
                            </div>
                        </div>

                        <div className={'flex flex-col sm:flex-row'}>
                            <div>
                                <MdOutlinePermPhoneMsg size={36}/>
                            </div>
                            <div className={'hidden sm:block'}>
                                <RxSlash size={36}/>
                            </div>
                            <div className={'flex flex-col'}>
                                <p className={'text-gray-500 text-lg'}>Office address</p>
                                <p className={'text-3xl font-semibold text-primary'}>314-555-0123</p>
                            </div>
                        </div>

                        <div className={'flex flex-col sm:flex-row'}>
                            <div>
                                <RiMailSendLine size={36}/>
                            </div>
                            <div className={'hidden sm:block'}>
                                <RxSlash size={36}/>
                            </div>
                            <div className={'flex flex-col'}>
                                <p className={'text-gray-500 text-lg'}>Email us</p>
                                <p className={'font-semibold text-primary'}>hellosupport@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'flex-1 sm:w-2/3'}>
                    <div className={'bg-white rounded-lg shadow-2xl p-10'}>
                        <div className={'flex justify-between items-center space-x-4'}>
                            <div>
                                <h1 className={'text-3xl font-bold'}>Contact us</h1>
                                <p className={'text-gray-500 text-sm pt-3'}>We will respond as soon as we receive your
                                    message.</p>
                            </div>
                            <IoChatboxEllipsesOutline className={'text-primary '} size={32}/>
                        </div>

                        <form className={'flex flex-col gap-2'}>
                            <div className={'flex flex-col md:flex-row pt-2 space-x-4'}>
                                <div className={''}>
                                    <div className={'font-medium pt-2'}>Your name</div>
                                    <div className={'relative'}>
                                    <span
                                        className={'absolute text-primary flex items-center top-1/2 -translate-y-1/2 left-1'}>  <FaRegUser
                                        size={18}/></span>
                                        <input
                                            className={'px-9 focus:outline-primary border rounded-lg py-4 w-full placeholder:text-gray-500 text-sm'}
                                            type="text" placeholder={"Your name"}/>
                                    </div>
                                </div>


                                <div className={''}>
                                    <div className={'font-medium pt-2'}>Email</div>
                                    <div className={'relative'}>
                                         <span
                                             className={'absolute text-primary flex items-center top-1/2 -translate-y-1/2 left-1'}>  <MdOutlineEmail
                                             size={18}/></span>
                                        <input
                                            className={'px-9 focus:outline-primary border rounded-lg py-4 w-full placeholder:text-gray-500 text-sm'}
                                            type="text" placeholder={"Your email"}/>
                                    </div>
                                </div>
                            </div>

                            <div className={'flex flex-col md:flex-row pt-2 space-x-4'}>
                                <div className={''}>
                                    <div className={'font-medium pt-2'}>Phone</div>
                                    <div className={'relative'}>
                                        <span
                                            className={'absolute text-primary flex items-center top-1/2 -translate-y-1/2 left-1'}> <FaPhoneAlt
                                            size={18}/></span>
                                        <input
                                            className={'px-9 focus:outline-primary border rounded-lg py-4 w-full placeholder:text-gray-500 text-sm'}
                                            type="text" placeholder={"Your phone"}/>
                                    </div>
                                </div>


                                <div className={'w-1/2'}>
                                    <div className={'font-medium pt-2 w-full'}>Property Type</div>
                                    <div className={'relative'}>
                                        <ul>
                                            <PropertyType className={'px-9 py-4'}/>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className={'flex-1'}>
                                <div className={'font-medium pt-2'}>Message</div>
                                <textarea
                                    className={'resize-none px-3 focus:outline-primary w-full border rounded-lg py-4 w-full placeholder:text-gray-500 text-sm'}
                                    cols="30"
                                    rows="5" placeholder={"Your message"}></textarea>
                            </div>

                            <div>
                                <button className={'w-1/2 border  bg-primary rounded-lg py-4 w-full'}>
                                    <span className={'text-white font-bold'}>Send Request</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactHero;