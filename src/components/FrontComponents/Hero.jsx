import {FaHouseChimney} from "react-icons/fa6";
import {useContext, useState} from "react";
import GlobalContext from "../../context/Global.js";
import {useNavigate} from "react-router-dom";
import api from "../../services/api.js";
import image from '../../assets/images/BukolaBliss.png';

const Hero = ({searchResult, toggleSearch}) => {

    const navigate = useNavigate();
    const {neighbourhoods, categories, setListings, fetchMedia} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        category: '',
        city: '',
        neighbourhood: ''
    });

    const getSortedListings = async () => {
        setLoading(true);

        let res;
        if (values.category === '' && values.city === '' && values.neighbourhood === '') {
            res = await api.get('/property');
        } else {
            res = await api.post('/property/search', values);
        }

        const listingData = res.data;

        // Fetch media for each blog
        const listingWithMedia = await Promise.all(
            listingData.map(async (listing) => {
                const mediaResponse = await fetchMedia(listing._id);
                const url = mediaResponse.data.url ?? 'default.png';
                return {...listing, url};
            })
        );

        setListings(listingWithMedia);
        setLoading(false);
    };
    const handleChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const handleSearch = async (e) => {
        setLoading(true);
        e.preventDefault();
        await getSortedListings();
        toggleSearch(true);
        setLoading(false);
    }

    return (
        <section className="relative pb-20 py-14">
            <div

                className={'w-full h-[600px] bg-cover bg-center bg-[url("https://tunatheme.com/tf/html/quarter-preview/quarter/img/slider/13.jpg")] relative '}>
                {/* Overlay */}
                {/*<div className="absolute inset-0 bg-neutral-900 opacity-10"></div>*/}
                <div
                    className={'flex justify-center md:justify-between items-center text-center md:text-start h-[400px] md:h-[600px] text-white '}>
                    <div className={'flex flex-col gap-2 items-center md:items-start md:w-full px-5'}>
                        <div className={'flex space-x-4 items-center'}>
                            <FaHouseChimney/>
                            <p>Real Estate Agency</p>
                        </div>
                        <h1 className={'text-4xl md:text-6xl  font-bold'}>Find your dream <br/> house by us
                        </h1>
                        <p>Your perfect home awaits. Browse through our collection of beautiful properties and let us
                            assist you in finding the one that suits you best.</p>

                        <div onClick={() => navigate('contact')}>
                            <button className={'bg-primary text-white p-4'}>Schedule
                                Appointment
                            </button>
                        </div>
                    </div>


                    <div className={'hidden md:block overflow-hidden h-full w-1/2'}>
                        <img src={image} className={'relative object-top h-full w-full object-cover'}/>
                        {/*<div className={'bg-black inset-0 absolute opacity-25'}></div>*/}
                    </div>
                </div>

                <div
                    className={'absolute bottom-0 translate-y-1/2 right-1/2 transform translate-x-1/2 container mx-auto bg-white shadow-lg p-9'}>
                    <form onSubmit={handleSearch} className={'md:flex space-y-4 md:space-y-0 md:space-x-4'}>
                        <select onChange={handleChange} name="category"
                                className={'px-5 border py-4 w-full rounded-lg outline-none'}>
                            <option value='' selected={true}>Select Categories</option>
                            {categories.map((category, i) => (
                                <option key={i} value={category._id}>{category.name}</option>
                            ))}
                        </select>

                        <select onChange={handleChange} name={"city"}
                                className={'px-5 border py-4 w-full rounded-lg outline-none'}>
                            <option value='' selected={true}>Select Cities</option>
                            <option value="winnipeg">Winnipeg</option>
                            <option value="brandon">Brandon</option>
                            <option value="steinbach">Steinbach</option>
                            <option value="thompson">Thompson</option>
                            <option value="portage_la_prairie">Portage la Prairie</option>
                            <option value="winker">Winkler</option>
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

                        <select onChange={handleChange} name={"neighbourhood"} defaultValue={'Select Neighbourhood'}
                                className={'px-5 border py-4 w-full rounded-lg outline-none'}>
                            <option value='' selected={true}>Select Neighbourhood</option>
                            {neighbourhoods.map((neighbourhood, i) => (
                                <option key={i}
                                        value={neighbourhood._id}>{neighbourhood.name}</option>
                            ))}
                        </select>

                        <button disabled={loading} type={'submit'}
                                className={'disabled:bg-gray-400 disabled:cursor-no-drop flex justify-center items-center bg-primary text-white h-14 rounded-lg w-full'}>
                            Search Now
                            {loading && <span
                                className='ml-2 animate-spin border-2 border-t-2 border-white border-t-transparent rounded-full w-4 h-4'></span>}
                        </button>
                    </form>
                </div>
            </div>
        </section>

    );
}

export default Hero;
