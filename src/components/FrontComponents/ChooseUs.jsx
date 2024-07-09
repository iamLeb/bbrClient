// import React from 'react';
// import {FaPersonRays} from "react-icons/fa6";
// import { VscTasklist } from "react-icons/vsc";
// import { RiCommunityFill } from "react-icons/ri";
// import { GiLovers } from "react-icons/gi";
//
// const ChooseUs = () => {
//     return (
//         <div className={'p-4 md:px-20'}>
//             <div className={'p-4 py-4'}>
//                 <p className={'font-semibold text-right text-3xl md:text-4xl lg:text-5xl text-primary'}>Why Choose
//                     Us</p>
//             </div>
//
//             <div className={'flex space-x-10'}>
//                 <div className={'bg-primary w-1/2 h-[1/2] rounded-lg'}>
//
//                 </div>
//
//                 <div className={'flex flex-col space-y-10'}>
//                     <div className={'flex space-x-4'}>
//                     <span>
//                         <FaPersonRays size={24}/>
//                     </span>
//                         <p>
//                             <span className={'font-bold'}>Personalized Approach:</span>
//                             <br/>
//                             We understand that every client is unique, which is why we tailor our
//                             services to meet your specific needs and preferences.
//                         </p>
//                     </div>
//
//                     <div className={'flex space-x-4'}>
//                     <span>
//                       <GiLovers size={24} />
//                     </span>
//                         <p>
//                             <span className={'font-bold'}>Dedicated Support:</span>
//                             <br/>
//                             From the initial consultation to closing and beyond, our dedicated team provides unwavering
//                             support, guidance, and advocacy every step of the way.
//                         </p>
//                     </div>
//
//                     <div className={'flex space-x-4'}>
//                     <span>
//                          <RiCommunityFill size={24}/>
//                     </span>
//                         <p>
//                             <span className={'font-bold'}>Local Expertise:</span>
//                             <br/>
//                             With a deep understanding of the Manitoba local market dynamics, trends, and neighborhoods,
//                             we offer invaluable insights and guidance to help you make informed decisions
//                         </p>
//                     </div>
//
//                     <div className={'flex space-x-4'}>
//                     <span>
//                       <VscTasklist size={24} />
//                     </span>
//                         <p>
//                             <span className={'font-bold'}>Results-Driven:</span>
//                             <br/>
//                             Our track record of success speaks for itself. We are committed to achieving optimal
//                             outcomes for our clients and exceeding their expectations..
//                         </p>
//                     </div>
//
//
//                 </div>
//
//
//             </div>
//         </div>
//     );
// };
//
// export default ChooseUs;

import React from 'react';
import { FaPersonRays } from "react-icons/fa6";
import { VscTasklist } from "react-icons/vsc";
import { RiCommunityFill } from "react-icons/ri";
import { GiLovers } from "react-icons/gi";

const ChooseUs = () => {
    return (
        <div className="p-4 md:px-20">
            <div className="p-4 py-4">
                <p className="font-semibold text-right text-3xl md:text-4xl lg:text-5xl text-primary">
                    Why Choose Us
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-10">
                <div className="bg-primary w-full md:w-1/2 h-80 rounded-lg"></div>

                <div className="flex flex-col space-y-10 mt-10 md:mt-0">
                    <div className="flex space-x-4 items-start">
                        <FaPersonRays size={24} />
                        <p>
                            <span className="font-bold">Personalized Approach:</span>
                            <br />
                            We understand that every client is unique, which is why we tailor our services to meet your specific needs and preferences.
                        </p>
                    </div>

                    <div className="flex space-x-4 items-start">
                        <GiLovers size={24} />
                        <p>
                            <span className="font-bold">Dedicated Support:</span>
                            <br />
                            From the initial consultation to closing and beyond, our dedicated team provides unwavering support, guidance, and advocacy every step of the way.
                        </p>
                    </div>

                    <div className="flex space-x-4 items-start">
                        <RiCommunityFill size={24} />
                        <p>
                            <span className="font-bold">Local Expertise:</span>
                            <br />
                            With a deep understanding of the Manitoba local market dynamics, trends, and neighborhoods, we offer invaluable insights and guidance to help you make informed decisions.
                        </p>
                    </div>

                    <div className="flex space-x-4 items-start">
                        <VscTasklist size={24} />
                        <p>
                            <span className="font-bold">Results-Driven:</span>
                            <br />
                            Our track record of success speaks for itself. We are committed to achieving optimal outcomes for our clients and exceeding their expectations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;
