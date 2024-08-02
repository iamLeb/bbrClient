import {CiPlay1} from "react-icons/ci";
import {MdOutlineHandshake} from "react-icons/md";
import video from '../../assets/videos/AboutVideo.mp4';

const AboutHero = () => {
    return (
        <div
            className={'flex flex-col md:flex-row space-y-12 md:space-x-0  px-3 md:px-2  lg:px-20 items-center justify-center'}>

            <div className={'p-4 md:pt-20 relative flex flex-col space-y-2'}>
                <p className={'font-bold text-center text-3xl'}> Get to Know Us</p>
                <div className={'w-full h-full '}>
                    <video className={'h-full w-full rounded-lg object-cover '}
                           src={video} controls/>
                </div>
            </div>
        </div>
    )
}

export default AboutHero;