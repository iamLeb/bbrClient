import {CiPlay1} from "react-icons/ci";

const AboutHero = () => {
    return (
        <div className={'lg:h-screen flex flex-col md:flex-row  space-y-12 md:space-x-12 py-5 px-3 md:px-2 md:py-28 lg:p-20'}>
            <div className={'md:w-1/2 flex flex-col  text-black space-y-2 md:space-y-8 p-4 '}>
                <h1 className={'font-bold text-3xl md:text-4xl lg:text-5xl'}>Better lives with better homes</h1>
                <p className={'font-semibold'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda optio
                    quisquam sunt!</p>
                <p className={'font-light'}>Donec bibendum nibh quis nisl luctus, at aliquet ipsum bibendum. Fusce at
                    dui tincidunt nulla semper
                    venenatis at et magna. Mauris turpis lorem, ultricies vel justo sed, ultrices auctor nisi.</p>

                <div className={'flex items-center space-x-5'}>
                    <p className={'italic border-l-4 border-primary pl-5'}>Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse auctor, mi euismod dignissim scelerisque, eros augue vehicula
                        lectus, quis vestibulum enim augue ut est</p>
                </div>
            </div>

            <div className={'relative md:w-1/2'}>
                <div className={'overflow-hidden w-full md:h-96'}>
                    <img className={'h-full w-full rounded-lg object-cover object-center'}
                         src={'src/assets/images/img.png'}/>
                </div>
                <div className={'hover:cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 md:top-[40%] lg:top-[30%]'}>
                    <CiPlay1 className={'p-2.5 text-primary bg-white rounded-full hover:bg-primary hover:text-white'}
                             size={48}/>
                </div>
            </div>
        </div>
    )
}

export default AboutHero;