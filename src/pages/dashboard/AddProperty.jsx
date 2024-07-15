import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../../services/api.js";
import GlobalContext from "../../context/Global.js";

const AddProperty = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const {categories} = useContext(GlobalContext);
    const {neighbourhoods} = useContext(GlobalContext);

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
    });

    const handleCancel = () => {
        navigate('/secure/listings');
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setNewProperty(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = e => {
        setNewProperty(prevValues => ({
            ...prevValues,
            file: e.target.files[0]
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
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
        formData.append('file', newProperty.file);

        if (!newProperty.title || !newProperty.address || !newProperty.bed || !newProperty.bath || !newProperty.category || !newProperty.city || !newProperty.neighbourhood || !newProperty.description) {
            setLoading(true)
            setErrors('All Fields are required');
            setLoading(false);
            return;
        }

        try {
            // Upload the file to AWS
            const response = await api.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const url = response.data.url; // response url

            // Create the gallery
            const propertyRes = await api.post('/property/create', {
                title: newProperty.title,
                address: newProperty.address,
                price: newProperty.price,
                bed: newProperty.bed,
                bath: newProperty.bath,
                category: newProperty.category,
                city: newProperty.city,
                neighbourhood: newProperty.neighbourhood,
                sqft: newProperty.sqft,
                yearBuilt: newProperty.yearBuilt,
                landArea: newProperty.landArea,
                description: newProperty.description,
            });

            const propertyId = propertyRes.data._id;

            // Store the URL and blog ID in the media collection
            await api.post('/media/create', {
                type: 'image',
                url,
                ownerId: propertyId,
                name: 'Property',
            });
            setLoading(false);
            navigate('/secure/listings');

        } catch (error) {
            setErrors(error.response.data.error)
            setLoading(false)
        }
    };

    return (
        <div className='m-5 border rounded-b-lg'>
            <div className='bg-gray-100 p-3 font-extrabold text-center'>
                Add new property
            </div>
            {errors && <p className="text-red-500 pl-3 mt-2">{errors}</p>}
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2'>
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
                            <option value=''>Select a category</option>
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
                            <option value=''>Select a neighbourhood</option>
                            {neighbourhoods.map(neighbourhood => (
                                <option key={neighbourhood._id} value={neighbourhood._id}>{neighbourhood.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Sqft</div>
                        <input value={newProperty.sqft} name='sqft'
                               onChange={handleChange} type='number'
                               placeholder='Enter the size of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Year Built</div>
                        <input value={newProperty.yearBuilt} name='yearBuilt'
                               onChange={handleChange} type='number'
                               placeholder='Year the property was built' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Land Area</div>
                        <input value={newProperty.landArea} name='landArea'
                               onChange={handleChange} type='number'
                               placeholder='Land area of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Description</div>
                        <textarea value={newProperty.description} name='description'
                                  onChange={handleChange} placeholder='Enter description of the property'
                                  className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Image</div>
                        <input onChange={handleFileChange} type='file' name='file' multiple
                               className='p-3 border rounded-lg'/>
                    </div>
                </div>
                <div className="p-5 flex justify-center space-x-5 text-xs">
                    <button type="button" onClick={handleCancel}
                            className="px-5 py-3 w-1/5 rounded bg-gray-100">Cancel
                    </button>
                    <button type="submit" className="px-6 py-3 rounded bg-primary w-1/5 text-white">Create Property
                    </button>
                </div>
            </form>
        </div>


    );
};

export default AddProperty;
