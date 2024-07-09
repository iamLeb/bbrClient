import React from 'react';

const OurServices = () => {
    return (
        <div className={'p-4 md:px-20'}>
            <div className={'p-4 py-4'}>
                <p className={'font-semibold text-3xl md:text-4xl lg:text-5xl text-primary'}>Our Services</p>
            </div>

            <div className={'flex flex-col lg:flex-row space-y-2 lg:space-x-8'}>
                <div className={'relative md:w-1/2 flex items-center justify-center'}>
                    <img src={'src/assets/images/img_2.png'}/>

                    <p className={'absolute text-3xl font-semibold text-white right-10 top-1/2'}>Buying</p>
                    <button
                        className={'absolute bg-neutral-50 rounded-lg p-1.5 text-primary font-medium right-10 top-2/3'}> Learn
                        more
                    </button>
                </div>

                <div className={'relative md:w-1/2 flex items-center justify-center'}>
                    <img src={'src/assets/images/img_3.png'}/>

                    <p className={'absolute text-3xl font-semibold text-white right-10 top-1/2'}>Selling</p>
                    <button
                        className={'absolute bg-neutral-50 rounded-lg p-1.5 text-primary font-medium right-10 top-2/3'}> Learn
                        more
                    </button>

                </div>


            </div>

        </div>
    );
};

export default OurServices;