import {useContext, useState, useEffect} from "react";
import {IoLocationOutline} from "react-icons/io5";
import {LiaBedSolid} from "react-icons/lia";
import {FaShower} from "react-icons/fa";
import {MdOutlineZoomOutMap} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import GlobalContext from "../../context/Global.js";
import ViewMore from "./ViewMore.jsx";
import api from "../../services/api.js";
import image from '../../assets/images/BukolaBliss.png';

const Featured = () => {
    const navigate = useNavigate();
    const {categories, fetchMedia} = useContext(GlobalContext);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

    const getProperties = async (id) => {
        let res;
        setLoading(true);
        if (!id) {
            res = await api.get('property');
        } else {
            res = await api.get(`/property/category/${id}`);
        }

        const propertiesData = res.data;

        // Fetch media for each property
        const propertiesWithMedia = await Promise.all(
            propertiesData.map(async (property) => {
                const mediaResponse = await fetchMedia(property._id);
                const url = mediaResponse.data.url ?? 'default.png';
                return {...property, url};
            })
        );

        if (propertiesWithMedia.length > 8) {
            setProperties(propertiesWithMedia.slice(propertiesWithMedia.length - 9, propertiesWithMedia.length - 1));
        } else {
            setProperties(propertiesWithMedia);
        }

        setLoading(false);
    };

    useEffect(() => {
        getProperties();
    }, [fetchMedia]);

    return (
        <section className={'pt-28 sm:py-9 bg-sky-100'}>
            <div className={'flex flex-col justify-center items-center gap-5'}>
                <div className={'flex flex-col justify-between gap-4 text-center'}>
                    <h1 className={'font-bold text-4xl sm:text-5xl'}>Featured Properties</h1>
                    <p className={'font-light text-sm'}>Explore all the different types of properties so you can choose
                        the best option for you.</p>
                </div>

                <div
                    className={'grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8  gap-4 font-light text-sm text-center justify-center'}>
                    <button
                        onClick={() => {
                            getProperties('');
                            setSelectedCategory(null); // Deselect all
                        }}
                        className={`tag font-bold ${selectedCategory === null ? 'text-primary' : 'text-black'}`}
                    >
                        All
                    </button>
                    {categories.slice(0, 8).map(category => (
                        <button
                            onClick={() => {
                                getProperties(category._id);
                                setSelectedCategory(category._id); // Set the selected category
                            }}
                            key={category._id}
                            className={`tag font-bold ${selectedCategory === category._id ? 'text-primary' : 'text-black'}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div
                        className="w-8 h-8 border-4 border-t-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-xl font-semibold">Loading...</span>
                </div>
            ) : (
                <div className={'px-3 mt-5'}>
                    {properties.length === 0 && (
                        <div className={'flex justify-center items-center py-10'}>
                            <span className={'text-xl text-center font-semibold'}>No properties found</span>
                        </div>
                    )}

                    <div
                        className={'grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}>
                        {properties.map(feat => (
                            <div key={feat._id} className={'border border-gray-200 bg-white p-5 rounded-lg'}>
                                <div className={'flex flex-col gap-3 justify-center'}>
                                    <div className={'relative overflow-hidden rounded-lg h-56'}>
                                        <img
                                            className={'object-cover h-full w-full cursor-pointer transition-all duration-300 hover:brightness-75 hover:scale-105'}
                                            src={feat.url}
                                            alt="image"
                                        />
                                        <span
                                            className={'absolute top-3 left-3 bg-primary text-white text-xs rounded-lg px-1.5 py-0.5'}>Featured</span>
                                        {!feat.status && (
                                            <div
                                                className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-lg px-3">
                                                <span className="text-white text-6xl font-bold">Sold</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={'cursor-pointer'}
                                         onClick={() => navigate(`/properties/listing/${feat._id}`)}>
                                        <span className={'font-semibold text-xl'}>{feat.title}</span>
                                    </div>
                                    <div className={'flex space-x-2 text-sm text-gray-500'}>
                                        <IoLocationOutline/>
                                        <span>{feat.address} </span>
                                    </div>
                                    <ul className={'flex justify-between items-center text-gray-500 text-sm'}>
                                        <li>
                                            <div className={'flex items-center space-x-2'}>
                                                <LiaBedSolid/>
                                                <p>
                                                    Beds <span className={'font-medium'}>{feat.bed}</span>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={'flex items-center space-x-2'}>
                                                <FaShower/>
                                                <p>
                                                    Baths <span className={'font-medium'}>{feat.bath}</span>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={'flex items-center space-x-2'}>
                                                <MdOutlineZoomOutMap/>
                                                <p>
                                                    SqFt <span className={'font-medium'}>{feat.sqft}</span>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                    <span className={'border-b border-gray-100'}></span>
                                    <div
                                        className={'flex justify-between items-center font-light text-sm text-gray-500'}>
                                        <div className={'flex items-center space-x-2'}>
                                            <div className={'overflow-hidden w-9 h-9 rounded-full'}>
                                                <img className={'w-full h-full object-cover object-top'}
                                                     src={image}
                                                     alt=""/>
                                            </div>
                                            <span
                                                className={'cursor-pointer transition-all duration-300 hover:text-primary'}>Bukola Bliss</span>
                                        </div>
                                        {feat.yearBuilt && (
                                            <div>
                                                <span>Built in: {feat.yearBuilt}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <ViewMore/>
        </section>
    );
};

export default Featured;
