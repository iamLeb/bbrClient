import React from 'react';
import buying from "../../assets/images/img_4.png";
import selling from "../../assets/images/img_5.png";

const OurServices = () => {
    return (
        <div className="p-4 md:px-20">
            <div className="p-4 py-4">
                <p className="font-semibold text-3xl md:text-4xl lg:text-5xl text-primary">Our Services</p>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                <div className="relative md:w-1/2 flex items-center justify-center">
                    <img className="w-full h-80 object-cover rounded-lg" src={buying} alt="Buying" />
                    <div className={'bg-black inset-0 absolute opacity-25'}></div>

                    <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start">
                        <p className="text-3xl font-semibold text-white">Buying</p>
                        {/*<button className="mt-2 bg-neutral-50 rounded-lg px-4 py-2 text-primary font-medium">*/}
                        {/*    Learn more*/}
                        {/*</button>*/}
                    </div>
                </div>

                <div className="relative md:w-1/2 flex items-center justify-center">
                    <img className="w-full h-80 object-cover rounded-lg" src={selling} alt="Selling" />
                    <div className={'bg-black inset-0 absolute opacity-25'}></div>

                    <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start">
                        <p className="text-3xl font-semibold text-white">Selling</p>
                        {/*<button className="mt-2 bg-neutral-50 rounded-lg px-4 py-2 text-primary font-medium">*/}
                        {/*    Learn more*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;
