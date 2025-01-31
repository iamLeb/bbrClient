import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import api from "../../../services/api.js";
import GlobalContext from "../../../context/Global.js";

const EditProperty = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // State variables
    const [loading, setLoading] = useState(false);
    const {categories, neighbourhoods, getNeighbourhoodName, getName} = useContext(GlobalContext);
    const [newProperty, setNewProperty] = useState({
        title: '',
        address: '',
        price: '',
        bed: '',
        bath: '',
        category: '',
        city: '',
        neighbourhood: '',
        sqft: '',
        yearBuilt: '',
        landArea: '',
        description: '',
        files: []
    });
    const [medias, setMedias] = useState([]);
    const [errors, setErrors] = useState('');
    const statusOptions = [
        {value: true, label: 'Active'},
        {value: false, label: 'Sold'}
    ];
    const currentPage = location.state?.currentPage;

    const fetchMedias = async (ownerId) => {
        setLoading(true);
        try {
            const res = await api.get(`/media/getMultipleMedia/${ownerId}`);
            setLoading(false);
            return res.data.map(media => media._id); // Return an array of media IDs
        } catch (error) {
            setLoading(false);
            console.error('Error fetching medias:', error);
            return [];
        }
    };

    const getProperty = async (id) => {
        try {
            setLoading(true);
            const res = await api.get(`/property/${id}`);
            setNewProperty(res.data);
            const mediaIds = await fetchMedias(id);
            setMedias(mediaIds);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching property:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProperty(id);
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewProperty({
            ...newProperty,
            [name]: value
        });
    };

    const handleFileChange = e => {
        setNewProperty(prevValues => ({
            ...prevValues,
            files: e.target.files
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate form fields
        if (!newProperty.title || !newProperty.address || !newProperty.bed || !newProperty.bath || !newProperty.category || !newProperty.city || !newProperty.neighbourhood || !newProperty.description) {
            setErrors('All fields are required');
            setLoading(false);
            return;
        }

        try {
            if (newProperty.files && medias.length > 0) {
                const formData = new FormData();
                formData.append('title', newProperty.title);
                formData.append('address', newProperty.address);
                formData.append('price', newProperty.price);
                formData.append('bed', newProperty.bed);
                formData.append('bath', newProperty.bath);
                formData.append('category', newProperty.category);
                formData.append('city', newProperty.city);
                formData.append('neighbourhood', newProperty.neighbourhood);
                formData.append('sqft', newProperty.sqft);
                formData.append('yearBuilt', newProperty.yearBuilt);
                formData.append('landArea', newProperty.landArea);
                formData.append('description', newProperty.description);

                // Append multiple files
                for (let i = 0; i < newProperty.files.length; i++) {
                    formData.append('files', newProperty.files[i]);
                }

                const response = await api.post('/file/upload-multiple', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const urls = response.data.map(file => file.url); // array of URLs

                // Delete existing media entries
                for (let i = 0; i < medias.length; i++) {
                    await api.delete(`/media/${medias[i]}`);
                }

                // Create new media entries
                for (const url of urls) {
                    await api.post('/media/create', {
                        type: 'image',
                        url,
                        ownerId: id,
                        name: 'Property',
                    });
                }
            }

            // Update property
            const res = await api.put(`/property/${id}`, newProperty);
            if (res.status === 200) {
                navigate('/secure/listings', {state: {currentPage}});
            }
        } catch (error) {
            setErrors(error.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='m-5 border rounded-lg'>
            <div className='bg-gray-100 p-3 font-extrabold text-center'>
                Update Property
            </div>
            {errors && <p className="text-red-500 pl-3 mt-2">{errors}</p>}
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Title</div>
                        <input value={newProperty.title} name='title'
                               onChange={handleChange} type='text'
                               placeholder='Enter the title of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Address</div>
                        <input value={newProperty.address} name='address'
                               onChange={handleChange} type='text'
                               placeholder='Enter the address of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Price</div>
                        <input value={newProperty.price} name='price'
                               onChange={handleChange} type='text'
                               placeholder='Enter the price of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Beds</div>
                        <input value={newProperty.bed} name='bed'
                               onChange={handleChange} type='number'
                               placeholder='Enter how many beds the property has' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Baths</div>
                        <input value={newProperty.bath} name='bath'
                               onChange={handleChange} type='number'
                               placeholder='Enter how many baths the property has' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Category</div>
                        <select name='category' onChange={handleChange}
                                className='p-3 border rounded-lg'>
                            <option value=''>{getName(newProperty.category)}</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>City</div>
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
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Neighbourhood</div>
                        <select name='neighbourhood' onChange={handleChange}
                                className='p-3 border rounded-lg'>
                            <option value=''>{getNeighbourhoodName(newProperty.neighbourhood)}</option>
                            {neighbourhoods.map(neighbourhood => (
                                <option key={neighbourhood._id} value={neighbourhood._id}>{neighbourhood.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Sqft</div>
                        <input value={newProperty.sqft} name='sqft'
                               onChange={handleChange} type='text'
                               placeholder='Enter the size of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Year Built</div>
                        <input value={newProperty.yearBuilt} name='yearBuilt'
                               onChange={handleChange} type='text'
                               placeholder='Year the property was built' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Land Area</div>
                        <input value={newProperty.landArea} name='landArea'
                               onChange={handleChange} type='text'
                               placeholder='Land area of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Status</div>
                        <select value={newProperty.status} name='status' onChange={handleChange}
                                className='px-5 border py-4 w-full rounded-lg outline-none'>
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Image</div>
                        <input onChange={handleFileChange} type='file' name='file' multiple
                               className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Description</div>
                        <textarea value={newProperty.description} name='description' cols="30"
                                  rows="5"
                                  onChange={handleChange} placeholder='Enter description of the property'
                                  className='resize-none p-3 border rounded-lg'/>
                    </div>
                </div>
                <div className="p-5 flex justify-center space-x-5 text-xs">
                    <button type='submit'
                            disabled={loading}
                            className='px-6 py-3 rounded bg-primary text-white flex items-center justify-center'>
                        <span>Update Property</span>
                        {loading && <span
                            className='ml-2 animate-spin border-2 border-t-2 border-white border-t-transparent rounded-full w-4 h-4'></span>}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default EditProperty;
