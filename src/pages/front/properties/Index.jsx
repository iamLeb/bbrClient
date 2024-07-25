import {IoLocationOutline} from "react-icons/io5";
import {LiaBedSolid} from "react-icons/lia";
import {FaShower} from "react-icons/fa";
import {MdOutlineZoomOutMap} from "react-icons/md";
import GlobalContext from "../../../context/Global.js";
import image from "../../../assets/images/BukolaBliss.png";

const Index = () => {
    const navigate = useNavigate();
    const {properties} = useContext(GlobalContext);


    return (
        <section className={'mt-2'}>
            <div className={'p-3  space-y-2 flex flex-col text-center'}>
                <h1 className={'font-bold text-3xl sm:text-4xl'}>Property Listings</h1>
                <p className={'font-light text-sm'}>Explore our property listings to discover the home of your
                    dreams.</p>
            </div>
            
            <div className={'px-3 mt-3 flex justify-evenly p-5'}>
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

                                        {!property.status && (
                                            <div
                                                className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-lg px-3">
                                                <span className="text-white text-6xl font-bold">Sold</span>
                                            </div>
                                        )}
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
                                        <div className={'overflow-hidden w-9 h-9 rounded-full'}>
                                            <img className={'w-full h-full object-cover object-top'}
                                                 src={image}
                                                 alt=""/>
                                        </div>
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
