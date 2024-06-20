import neigh from "../../assets/images/neighbourhoodpic.jpg"
import { PiPlusThin } from "react-icons/pi";


const Explore = () => {
    return (
        <div>
            <span className="flex justify-center items-center text-5xl font-bold p-20">Discover Different Neighbourhoods</span><br/>
            <div className="sm:flex sm:h-64 sm:overflow-hidden">
                <div className="group sm:h-full sm:w-1/4 relative"> 
                    <div className="overflow-hidden bg-black h-full sm:absolute sm:inset-0">
                        <img className="object-cover h-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" src={neigh} alt =''/>
                    </div>
                    
                    <div className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>St Vital</p>
                        <p className="text-xs">4 properties</p>
                    </div>
                    <div className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-1/4 relative"> 
                    <div className="overflow-hidden bg-black h-full sm:absolute sm:inset-0">
                        <img className="object-cover h-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" src={neigh} alt =''/>
                    </div>
                    <div className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Sage Creek</p>
                        <p className="text-xs">5 properties</p>
                    </div>
                    <div className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-1/4 relative"> 
                    <div className="overflow-hidden bg-black h-full sm:absolute sm:inset-0">
                        <img className="object-cover h-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" src={neigh} alt =''/>
                    </div>
                    <div className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Island Lakes</p>
                        <p className="text-xs">3 properties</p>
                    </div>
                    <div className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-1/4 relative"> 
                    <div className="overflow-hidden bg-black h-full sm:absolute sm:inset-0">
                        <img className="object-cover h-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" src={neigh} alt =''/>
                    </div>
                    <div className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>St Vital</p>
                        <p className="text-xs">4 properties</p>
                    </div>
                    <div className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
            </div>
            <div className="sm:flex sm:h-64 sm:overflow-hidden">
                <div className="group sm:h-full sm:w-1/4 relative"> 
                    <div className="overflow-hidden bg-black h-full sm:absolute sm:inset-0">
                        <img className="object-cover h-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" src={neigh} alt =''/>
                    </div>
                    <div className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Fort Richmond</p>
                        <p className="text-xs">4 properties</p>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-1/4 relative"> 
                    <div className="overflow-hidden bg-black h-full sm:absolute sm:inset-0">
                        <img className="object-cover h-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" src={neigh} alt =''/>
                    </div>
                    <div className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Bridgewater</p>
                        <p className="text-xs">1 property</p>
                    </div>
                    <div className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-1/4 relative"> 
                    <div className="overflow-hidden bg-black h-full sm:absolute sm:inset-0">
                        <img className="object-cover h-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" src={neigh} alt =''/>
                    </div>
                    <div className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Richmond West</p>
                        <p className="text-xs">4 properties</p>
                    </div>
                    <div className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
                <div className="group sm:h-full sm:w-1/4 relative"> 
                    <div className="overflow-hidden bg-black h-full sm:absolute sm:inset-0">
                        <img className="object-cover h-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" src={neigh} alt =''/>
                    </div>
                    <div className=" sm:flex flex-col absolute bottom-0 justify-end p-5 sm:h-full bg-opacity-0 sm:relative text-white">
                        <p>Pembina</p>
                        <p className="text-xs">4 properties</p>
                    </div>
                    <div className="transition-all duration-500 h-full flex flex-col justify-center items-center absolute inset-0 opacity-0 group-hover:opacity-100 p-5 sm:inset-0 text-white">
                        <PiPlusThin className="text-6xl"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;