import { IoFolderOpenOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { AiOutlineComment } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";

const Single = () => {
    return (
        <section className={'container mx-auto'}>
            <div className={'md:flex justify-between gap-4 py-9 px-4 md:px-0 space-x-6'}>
                <div className={'md:w-2/3'}>
                    <div className={'pb-9'}>
                        <h1 className={'text-3xl font-bold'}>We are hiring ‘moderately,’ says Compass CEO</h1>
                        <ul className={'flex space-x-4 items-center py-2 text-xs md:text-sm font-light'}>
                            <li>
                                <div className={'flex space-x-2 items-center'}>
                                    <IoFolderOpenOutline/>
                                    <span>Apartment</span>
                                </div>
                            </li>
                            <li>
                                <div className={'flex space-x-2 items-center'}>
                                    <AiOutlineComment/>
                                    <span>No Comments</span>
                                </div>
                            </li>
                            <li>
                                <div className={'flex space-x-2 items-center'}>
                                    <CiCalendar/>
                                    <span>February 15, 2022</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={'overflow-hidden rounded-lg'}>
                        <img className={'object-cover object-center'}
                             src="https://dreamhomewp.themesflat.com/wp-content/uploads/2024/02/blog8_3.webp"
                             alt="photo"/>
                    </div>

                    <div className={'pt-9 font-light'}>
                        <p>
                            The average contract interest rate for 30-year fixed-rate mortgages with conforming loan
                            balances ($726,200 or less) decreased to 6.40% from 6.45%, with points falling to 0.59 from
                            0.62 (including the origination fee) for loans with a 20% down payment. It had been over 7%
                            just a month ago.
                            The average contract interest rate for 30-year fixed-rate mortgages with conforming loan
                            balances ($726,200 or less) decreased to 6.40% from 6.45%, with points falling to 0.59 from
                            0.62 (including the origination fee) for loans with a 20% down payment. It had been over 7%
                            just a month ago.
                            The average contract interest rate for 30-year fixed-rate mortgages with conforming loan
                            balances ($726,200 or less) decreased to 6.40% from 6.45%, with points falling to 0.59 from
                            0.62 (including the origination fee) for loans with a 20% down payment. It had been over 7%
                            just a month ago.
                        </p>
                    </div>
                </div>

                <div className="md:w-1/3 p-5">
                    <div className="bg-gray-50 border p-5 rounded-lg flex flex-col gap-4 sticky top-1/2">
                        <h1 className="font-bold text-2xl">Categories?</h1>

                        <ul>
                            <li>
                                <div className={'hover:text-primary flex justify-between space-x-2 items-center border-b'}>
                                    <p className={'py-3'}>Apartment</p>
                                    <IoIosArrowRoundForward size={28}/>
                                </div>
                            </li>

                            <li>
                                <div className={'hover:text-primary flex justify-between space-x-2 items-center border-b'}>
                                    <p className={'py-3'}>Apartment</p>
                                    <IoIosArrowRoundForward size={28}/>
                                </div>
                            </li>

                            <li>
                                <div className={'hover:text-primary flex justify-between space-x-2 items-center border-b'}>
                                    <p className={'py-3'}>Apartment</p>
                                    <IoIosArrowRoundForward size={28}/>
                                </div>
                            </li>
                        </ul>

                        <button className="bg-primary text-white font-bold w-full py-5 rounded-lg">Apply Now!</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Single;