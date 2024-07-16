import {IoLocationOutline} from "react-icons/io5";
import {LiaBedSolid} from "react-icons/lia";
import {FaShower} from "react-icons/fa";
import {MdOutlineZoomOutMap} from "react-icons/md";
import {IoIosSearch} from "react-icons/io";
import {RxMixerVertical} from "react-icons/rx";
import {useState, useEffect, useContext} from "react";
import PropertyFilters from "../../../components/FrontComponents/PropertyFilters";
import {useNavigate} from "react-router-dom";
import GlobalContext from "../../../context/Global.js";

const Index = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const {properties, categories, neighbourhoods, loading, getNeighbourhoodName} = useContext(GlobalContext);
    const [newProperty, setNewProperty] = useState({
        city: ''
    });


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewProperty(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOptions = () => {
        setToggle(!toggle);
    };

    return (
        <section className={'mt-2'}>
            <div className="flex items-center justify-center gap-x-1 sm:gap-x-3 shadow-lg pt-2 pb-3">
                <div className="hidden sm:flex justify-center items-center">
                    <select className="border rounded-lg p-3 w-full space-x-1">
                        <option className="">Neighbourhoods</option>
                        {neighbourhoods.map(neigh => (
                            <option className="" key={neigh.id}>
                                {neigh.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:flex justify-center items-center">
                    <select className="border rounded-lg p-3 space-x-1">
                        <option>Categories</option>
                        {categories.map(category => (
                            <option key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:flex justify-center items-center">
                    <select value={newProperty.city} name='city' onChange={handleChange}
                            className='px-5 border py-4 w-full rounded-lg outline-none'>
                        <option value=''>Select a City</option>
                        <option value="winnipeg">Winnipeg</option>
                        <option value="brandon">Brandon</option>
                        <option value="steinbach">Steinbach</option>
                        <option value="thompson">Thompson</option>
                        <option value="portage_la_prairie">Portage la Prairie</option>
                        <option value="winkler">Winkler</option>
                        <option value="selkirk">Selkirk</option>
                        <option value="morden">Morden</option>
                        <option value="dauphin">Dauphin</option>
                        <option value="the_pas">The Pas</option>
                        <option value="flin_flon">Flin Flon</option>
                        <option value="stonewall">Stonewall</option>
                        <option value="neepawa">Neepawa</option>
                        <option value="swan_river">Swan River</option>
                        <option value="virden">Virden</option>
                        <option value="carman">Carman</option>
                    </select>
                </div>
                <button onClick={handleOptions}
                        className="flex items-center gap-1 sm:hidden bg-primary bg-opacity-50 rounded-md p-3 sm:py-3 sm:px-9">
                    <RxMixerVertical className="text-lg font-extrabold"/> <p className="font-extrabold">Filters</p>
                </button>
                <button className="flex items-center gap-1 bg-primary p-3 sm:py-3 sm:px-9 bg-opacity-50 rounded-md">
                    <IoIosSearch className="text-lg font-extrabold"/> <p className="font-extrabold">Search </p>
                </button>
            </div>
            {toggle && isMobile &&
                <div className="w-full z-30 transition-all duration-300 shadow-lg flex justify-center">
                    <div className="bg-white w-full rounded-lg flex justify-center">
                        <PropertyFilters/>
                    </div>
                </div>
            }
            <div className={'p-3 gap-4 text-center'}>
                <h1 className={'font-bold text-3xl sm:text-4xl'}>Property Listings</h1>
                <p className={'font-light text-sm'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>

            {/* Property Listings */}
            <div className={'px-3 mt-5 flex justify-evenly p-5'}>
                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 lg:grid-cols-3 gap-4'}>
                    {properties.map(property => (
                        <div key={property._id} className={'border border-gray-200 bg-white p-5 rounded-lg group'}>
                            <div className={'flex flex-col gap-3 justify-center'}>
                                <div className={'relative rounded-lg h-56'}>
                                    <span
                                        className={'absolute bottom-3 left-3 text-white font-bold text-2xl'}>${property.price}</span>
                                    <div className={'relative overflow-hidden rounded-lg h-56'}>
                                        <img
                                            className={'object-cover h-full w-full cursor-pointer transition-all duration-300 group-hover:brightness-75 group-hover:scale-105'}
                                            src={property.url}
                                            alt="Property Image"/>
                                    </div>
                                    <span
                                        className={'absolute -bottom-6 left-3 text-primary bg-white shadow-2xl rounded-md p-3 text-xl'}>${property.price}</span>
                                </div>
                                <div className="pt-5">
                                    <span onClick={() => navigate(`/properties/listing/${property._id}`)}
                                          className={'hover:cursor-pointer font-semibold text-xl'}>{property.title}</span>
                                </div>
                                <div className={'flex space-x-2 text-sm text-gray-500'}>
                                    <IoLocationOutline/>
                                    <span>{property.address} </span>
                                </div>
                                <ul className={'flex justify-between items-center text-gray-500 text-sm'}>
                                    <li>
                                        <div className={'flex items-center space-x-2'}>
                                            <LiaBedSolid/>
                                            <p>
                                                Beds <span className={'font-medium'}>{property.bed}</span>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={'flex items-center space-x-2'}>
                                            <FaShower/>
                                            <p>
                                                Baths <span className={'font-medium'}>{property.bath} </span>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={'flex items-center space-x-2'}>
                                            <MdOutlineZoomOutMap/>
                                            <p>
                                                SqFt <span className={'font-medium'}>{property.sqft}</span>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <span className={'border-b border-gray-100'}></span>
                                <div className={'flex justify-between items-center font-light text-sm text-gray-500'}>
                                    <div className={'flex items-center space-x-2'}>
                                        <img className={'w-9 rounded-full'}
                                             src={'https://dreamhomewp.themesflat.com/wp-content/uploads/2023/11/user-1-1.jpg'}
                                             alt="Agent Avatar"/>
                                        <span
                                            className={'cursor-pointer transition-all duration-300 hover:text-primary'}>Bukola Bliss</span>
                                    </div>
                                    <div>
                                        {property.yearBuilt && (
                                            <div>
                                                <span>Built in: {property.yearBuilt}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Index;
