import {CiPlay1} from "react-icons/ci";
import {MdOutlineHandshake} from "react-icons/md";
import video from '../../assets/videos/AboutVideo.mp4';

const AboutHero = () => {
    return (
        <div
            className={'flex flex-col md:flex-row space-y-12 md:space-x-0  px-3 md:px-2  lg:px-20 items-center justify-center'}>

            <div className={'p-4 md:pt-20 relative flex flex-col space-y-2'}>
                <p className={'font-bold text-center text-3xl'}> About Us</p>
                <div className={'w-full h-full '}>
                    <video className={'h-full w-full rounded-lg object-cover '}
                           src={video} controls/>
                </div>

            </div>

            {/*<div className={'md:w-1/2 p-4 overflow-hidden h-96'}>*/}
            {/*    <img src={image} className={'rounded-lg w-full h-full object-cover object-top'}/>*/}
            {/*</div>*/}
            {/*<div className={'md:w-1/2 flex flex-col text-black space-y-2 md:space-y-4 p-4 justify-center'}>*/}
            {/*    <h1 className={'font-bold text-3xl md:text-4xl lg:text-5xl text-primary'}>Mission</h1>*/}

            {/*    <div className={'p-4 relative h-96 bg-primary rounded-lg sm:rounded-r-lg flex flex-col space-y-6'}>*/}
            {/*        <div className={'pt-3 sm:pt-8 flex flex-col font-semibold space-y-2'}>*/}
            {/*            <p className={'text-white'}>Trusted partner</p>*/}
            {/*            <p className={'font-light'}>In realizing our clients' real estate dreams</p>*/}
            {/*        </div>*/}

            {/*        <div className={'flex flex-col font-semibold space-y-2'}>*/}
            {/*            <p className={'text-white'}>Unwavering Support</p>*/}
            {/*            <p className={'font-light'}>To exceeding expectations by offering tailored solutions through*/}
            {/*                expert guidance</p>*/}
            {/*        </div>*/}

            {/*        <div className={'flex flex-col font-semibold space-y-2'}>*/}
            {/*            <p className={'text-white'}>Commitment</p>*/}
            {/*            <p className={'font-light'}>Throughout every step of the journey.</p>*/}
            {/*        </div>*/}

            {/*        <div className={'absolute bottom-0 right-0'}>*/}
            {/*            <MdOutlineHandshake size={60} sm:size={40} className={'text-white'}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default AboutHero;