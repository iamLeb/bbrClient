import React from 'react';

const OurServices = () => {
    return (
        <div className={'p-4 md:px-20'}>
            <div className={'p-4 py-4'}>
                <p className={'font-semibold text-3xl md:text-4xl lg:text-5xl text-primary'}>Our Services</p>
            </div>

            <div className={'flex flex-col space-y-2'}>
                <div className={'relative md:w-1/2 flex justify-center items-center'}>
                   <img src={'src/assets/images/img_2.png'}/>
                </div>

                <div>
                    Selling
                </div>

                <div>
                    Investing
                </div>
            </div>

        </div>
    );
};

export default OurServices;