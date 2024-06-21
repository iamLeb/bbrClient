import one from "../../assets/images/neighbourhoodpic.jpg"
import two from "../../assets/images/testingdiv.jpg"
import three from "../../assets/images/explore3.jpg"
import four from "../../assets/images/explore4.jpg"
import five from "../../assets/images/explore5.jpg"
import six from "../../assets/images/explore6.jpg"
import seven from "../../assets/images/explore7.jpg"
import eight from "../../assets/images/explore8.jpg"
import { PiPlusThin } from "react-icons/pi";


const Explore = () => {
    return (
        <div className={'py-9'}>
            <div className={'flex flex-col justify-between gap-4 text-center'}>
                <h1 className={'font-bold text-4xl sm:text-5xl'}>Discover The Perfect Neighbourhood</h1>
                <p className={'font-light text-sm'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolorum, error perspiciatis quas tempora velit?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 h-[160rem] lg:grid-cols-4 md:h-[75rem] lg:h-[35rem]">
                <div className="group h-full w-full relative overflow-hidden hover:cursor-pointer">
                    <div className="overflow-hidden w-full bg-black h-full sm:absolute sm:inset-0">
                        <img
                            className="object-cover h-full w-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                            src={one} alt=''/>
                    </div>
                    <div
                        className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>St Vital</p>
                        <p className="text-xs">3 properties</p>
                    </div>
                    <div
                        className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-full relative overflow-hidden hover:cursor-pointer">
                    <div className="overflow-hidden w-full bg-black h-full sm:absolute sm:inset-0">
                        <img
                            className="object-cover h-full w-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                            src={two} alt=''/>
                    </div>
                    <div
                        className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>St James</p>
                        <p className="text-xs">6 properties</p>
                    </div>
                    <div
                        className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-full relative overflow-hidden hover:cursor-pointer">
                    <div className="overflow-hidden w-full bg-black h-full sm:absolute sm:inset-0">
                        <img
                            className="object-cover h-full w-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                            src={three} alt=''/>
                    </div>
                    <div
                        className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Tuxedo</p>
                        <p className="text-xs">2 properties</p>
                    </div>
                    <div
                        className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-full relative overflow-hidden hover:cursor-pointer">
                    <div className="overflow-hidden w-full bg-black h-full sm:absolute sm:inset-0">
                        <img
                            className="object-cover h-full w-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                            src={four} alt=''/>
                    </div>
                    <div
                        className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Down Town</p>
                        <p className="text-xs">4 properties</p>
                    </div>
                    <div
                        className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-full relative overflow-hidden hover:cursor-pointer">
                    <div className="overflow-hidden w-full bg-black h-full sm:absolute sm:inset-0">
                        <img
                            className="object-cover h-full w-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                            src={five} alt=''/>
                    </div>
                    <div
                        className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>St Boniface</p>
                        <p className="text-xs">1 propertys</p>
                    </div>
                    <div
                        className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-full relative overflow-hidden hover:cursor-pointer">
                    <div className="overflow-hidden w-full bg-black h-full sm:absolute sm:inset-0">
                        <img
                            className="object-cover h-full w-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                            src={six} alt=''/>
                    </div>
                    <div
                        className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Transcona</p>
                        <p className="text-xs">2 properties</p>
                    </div>
                    <div
                        className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-full relative overflow-hidden hover:cursor-pointer">
                    <div className="overflow-hidden w-full bg-black h-full sm:absolute sm:inset-0">
                        <img
                            className="object-cover h-full w-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                            src={seven} alt=''/>
                    </div>
                    <div
                        className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>South Point</p>
                        <p className="text-xs">7 properties</p>
                    </div>
                    <div
                        className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-full relative overflow-hidden hover:cursor-pointer">
                    <div className="overflow-hidden w-full bg-black h-full sm:absolute sm:inset-0">
                        <img
                            className="object-cover h-full w-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                            src={eight} alt=''/>
                    </div>
                    <div
                        className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Bridgewater</p>
                        <p className="text-xs">5 properties</p>
                    </div>
                    <div
                        className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Explore;