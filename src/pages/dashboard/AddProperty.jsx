import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api.js";
import GlobalContext from "../../context/Global.js";

const AddProperty = () => {
    const { categories } = useContext(GlobalContext);
    const [newProperty, setNewProperty] = useState({
        title: '',
        address: '',
        price: '',
        image: '',
        bed: '',
        bath: '',
        category: '',
        media: [],
        sqft: '',
        description: '',
        yearBuilt: '',
        landArea: '',
    });
    const [errors, setErrors] = useState('');
    const [selectedProperty, setSelectedProperty] = useState(null); // State for the selected property
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/secure/listings');
    }

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'media') {
            setNewProperty({
                ...newProperty,
                [name]: files,
            });
        } else {
            setNewProperty({
                ...newProperty,
                [name]: value,
            });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!newProperty.title || !newProperty.address || !newProperty.price
            || !newProperty.image || !newProperty.sqft || !newProperty.bath
            || !newProperty.bed || !newProperty.description || !newProperty.category
            || !newProperty.media || !newProperty.media) {
            setErrors('All fields are required');
            return;
        }

        try {
            if (selectedProperty) {
                // Update property
                const res = await api.put(`/property/${selectedProperty._id}`, newProperty);
                if (res.status === 200) {
                    setProperties(properties.map(property => property._id === selectedProperty._id ? res.data : property));
                    setSelectedProperty(null);
                }
            } else {
                // Upload media files
                const formData = new FormData();
                for (let i = 0; i < newProperty.media.length; i++) {
                    formData.append('media', newProperty.media[i]);
                }

                const imgres = await api.post("/file/upload", formData);
                if (imgres.status === 400) {
                    setErrors('Image did not upload properly');
                    return;
                }

                // Create property
                const res = await api.post('/property', newProperty);
                if (res.status === 201) {
                    setProperties([...properties, res.data]);
                    navigate('/secure/listings');
                }
            }
        } catch (e) {
            console.error(e);
            setErrors('There was an error creating/updating the property');
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
                               onChange={handleChange} type='text'
                               placeholder='Enter how many beds the property has' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Sqft</div>
                        <input value={newProperty.sqft} name='sqft'
                               onChange={handleChange} type='text'
                               placeholder='Enter the size of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Description</div>
                        <input value={newProperty.description} name='description'
                               onChange={handleChange} type='text'
                               placeholder='Enter description of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Baths</div>
                        <input value={newProperty.bath} name='bath'
                               onChange={handleChange} type='text'
                               placeholder='Enter how many baths the property has' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Images</div>
                        <input value={newProperty.image} name='image'
                               onChange={handleChange} type='text'
                               placeholder='Add images of the property' className='p-3 border rounded-lg'/>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Category</div>
                        <select value={newProperty.category} name='category' onChange={handleChange} className='p-3 border rounded-lg'>
                            <option value=''>Select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Media</div>
                        <input name='media' onChange={handleChange} type='file' multiple className='p-3 border rounded-lg'/>
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
