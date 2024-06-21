import { TiMessages } from "react-icons/ti";
import one from "../../assets/images/testimonial1.jpg"

const Testimonials = () => {
    return (
            <div className="flex flex-col items-center p-5">
                <div className=" text-center p-10 font-bold text-3xl sm:text-5xl">
                <h1 className={'font-bold text-3xl sm:text-5xl'}>From our Customers</h1>
                    <p className={'font-light text-sm'}>Hear some seasons why you should choose us</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 container">
                    <div className="grid grid-col-1 bg-white">
                        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg">
                            <div className="p-5">
                                <TiMessages className="text-primary text-3xl" />
                            </div>
                            <div className="w-2/3 text-center pb-5">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus
                            </div>
                            
                        </div>
                        <div className="flex pt-10 justify-center">
                            <img src={one} alt="image" className="rounded-full w-10 h-10"/>
                        </div>
                        <div className="text-center font-bold">
                            Ashley Conway
                        </div>
                        <div className="text-center text-xs pb-10">
                            Customer
                        </div>
                    </div>
                    <div className="grid grid-col-1 bg-white">
                        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg">
                            <div className="p-5">
                                <TiMessages className="text-primary text-3xl" />
                            </div>
                            <div className="w-2/3 text-center pb-5">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus
                            </div>
                            
                        </div>
                        <div className="flex pt-10 justify-center">
                            <img src={one} alt="image" className="rounded-full w-10 h-10"/>
                        </div>
                        <div className="text-center font-bold">
                            Ashley Conway
                        </div>
                        <div className="text-center text-xs pb-10">
                            Customer
                        </div>
                    </div>
                    <div className="grid grid-col-1 bg-white">
                        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg">
                            <div className="p-5">
                                <TiMessages className="text-primary text-3xl" />
                            </div>
                            <div className="w-2/3 text-center pb-5">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus
                            </div>
                            
                        </div>
                        <div className="flex pt-10 justify-center">
                            <img src={one} alt="image" className="rounded-full w-10 h-10"/>
                        </div>
                        <div className="text-center font-bold">
                            Ashley Conway
                        </div>
                        <div className="text-center text-xs pb-10">
                            Customer
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Testimonials;