import {CiPlay1} from "react-icons/ci";
import {MdOutlineHandshake} from "react-icons/md";

const AboutHero = () => {
    return (
        <div
            className={'flex flex-col md:flex-row  space-y-12 md:space-x-0 py-5 px-3 md:px-2 md:py-28 lg:p-20'}>
            <div className={'md:w-1/2 flex flex-col  text-black space-y-2 md:space-y-8 p-4 '}>
                <h1 className={'font-bold text-3xl md:text-4xl lg:text-5xl text-primary'}>Mission</h1>

                <div className={'p-4 relative h-96 bg-primary rounded-lg sm:rounded-r-lg flex flex-col space-y-8'}>
                    <div className={'pt-3 sm:pt-8 flex flex-col font-semibold space-y-2'}>
                        <p className={'text-white'}>Trusted partner</p>
                        <p className={'font-light'}>In realizing our clients' real estate dreams</p>
                    </div>

                    <div className={'flex flex-col font-semibold space-y-2'}>
                        <p className={'text-white'}>Unwavering Support</p>
                        <p className={'font-light'}>To exceeding expectations by offering tailored solutions through
                            expert guidance</p>
                    </div>

                    <div className={'flex flex-col font-semibold space-y-2'}>
                        <p className={'text-white'}>Commitment</p>
                        <p className={'font-light'}>Throughout every step of the journey.</p>
                    </div>

                    <div className={'absolute bottom-0 right-0'}>
                        <MdOutlineHandshake size={50} sm:size={60} className={'text-white'}/>
                    </div>
                </div>
            </div>


            <div className={'md:w-1/2 p-4 relative'}>

                <div>
                    <p className={'font-semibold text-xl lg:text-3xl text-black'}>Your trusted partner in real
                        estate</p>
                </div>

                <div className={'overflow-hidden w-full h-80'}>
                    <img className={'h-full w-full rounded-lg object-cover object-center'}
                         src={'src/assets/images/img_1.png'}/>
                </div>

                <div className={'flex flex-row space-x-32'}>
                    <div className={'h-1/3 overflow-hidden absolute left-0 bottom-3.5 lg:bottom-50'}>
                        <img className={'object-cover object-center w-full h-full'}
                             src={'src/assets/images/bliss.png'}/>
                    </div>

                    <div>
                        <p className={'text-2xl lg:text-3xl text-primary'}>Bukola Bliss</p>
                        <p className={'text-black text-xl lg:text-2xl'}>Realtor</p>
                    </div>
                </div>

            </div>
            {/*<div className={'relative md:w-1/2'}>*/}
            {/*    <div className={'overflow-hidden w-full md:h-full lg:h-96'}>*/}
            {/*        <img className={'h-full w-full rounded-lg object-cover object-center'}*/}
            {/*             src={'src/assets/images/img.png'}/>*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        className={'hover:cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 md:top-[50%] lg:top-[35%]'}>*/}
            {/*        <CiPlay1 className={'p-2.5 text-primary bg-white rounded-full hover:bg-primary hover:text-white'}*/}
            {/*                 size={48}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default AboutHero;