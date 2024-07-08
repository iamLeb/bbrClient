import { FaHouseChimney } from "react-icons/fa6";
import {useContext} from "react";
import GlobalContext from "../../context/Global.js";
import {useNavigate} from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    const {neighbourhoods, categories, loading} = useContext(GlobalContext)

    return (
        <section className="relative pb-20 py-8">
            <div

                className={'w-full h-[600px] bg-cover bg-center bg-[url("https://tunatheme.com/tf/html/quarter-preview/quarter/img/slider/13.jpg")] relative'}>
                {/* Overlay */}
                {/*<div className="absolute inset-0 bg-neutral-900 opacity-50"></div>*/}
                <div className={'flex justify-center items-center h-[400px] md:h-[600px] text-white relative '}>
                    <div className={'flex flex-col gap-2 items-center text-center'}>
                        <div className={'flex space-x-4 items-center'}>
                            <FaHouseChimney/>
                            <p>Real Estate Agency</p>
                        </div>
                        <h1 className={'text-4xl md:text-6xl text-center font-bold'}>Find your dream <br/> house by us
                        </h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quaerat veritatis
                            voluptas?</p>
                        <button onClick={() => navigate('contact')} className={'bg-primary text-white p-4'}>Schedule Appointment</button>
                    </div>
                </div>

                <div
                    className={'absolute bottom-0 translate-y-1/2 right-1/2 transform translate-x-1/2 container mx-auto bg-white shadow-lg p-9'}>
                    <div className={'md:flex space-y-4 md:space-y-0 md:space-x-4'}>

                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div
                                    className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <select className={'px-5 border py-4 w-full rounded-lg outline-none'}>
                                <option>Select Search Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        )}

                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div
                                    className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <select defaultValue={'Select Neighbourhood'} className={'px-5 border py-4 w-full rounded-lg outline-none'}>
                                <option>Select Neighbourhood</option>
                                {neighbourhoods.map((neighbourhood) => (
                                    <option key={neighbourhood._id}
                                            value={neighbourhood.name}>{neighbourhood.name}</option>
                                ))}
                            </select>
                        )}
                        <select className={'px-5 border py-4 w-full rounded-lg outline-none'}>
                            <option value={""}>Select City</option>
                        </select>
                        <button className={'bg-primary text-white h-14 rounded-lg w-full'}>Find Now</button>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Hero;
