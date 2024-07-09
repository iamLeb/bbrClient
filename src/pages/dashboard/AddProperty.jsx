import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api.js";

const AddProperty = () => {
    const [newProperty, setNewProperty] = useState({ title: '', address: '', price: '', image:'',bed: '',bath: '',category: '',media: []});
    const [errors, setErrors] = useState('');
    const [categories, setCategories] = useState([])
    const [selectedProperty, setSelectedProperty] = useState(null); // State for the selected property
    const navigate = useNavigate();
    
    
    const fetchCategories = async () => {
        try {
            const res = await api.get('/category');
            setCategories(res.data);
        } catch (error) {
            setErrors('There was an error fetching categories');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    
    const handleCancel = () => {
        navigate('/secure/listings')
    }

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'media'){
            setNewProperty({
                ...newProperty,
                [name]: [value],
                
                
               
            }); console.log(newProperty)
        } else{
            setNewProperty({
            ...newProperty,
            [name]: value,
            
            
           
        });
        }
         console.log(newProperty)
    };
    const handleSubmit = async e => {
        //setNewProperty({ title: '',address: '',price: '',image: '',bed:'',bath: '',sqft: '',description: '',category: '',media: []});
        // console.log(newProperty.media)
        e.preventDefault();
        if (!newProperty.title || !newProperty.address || !newProperty.price 
        || !newProperty.image || !newProperty.sqft || !newProperty.bath 
        || !newProperty.bed|| !newProperty.description|| !newProperty.category
        || !newProperty.media || !newProperty.media) {
            setErrors('all fields required');
        } else {
            try {
                if (selectedProperty) {
                    // Update property
                    const res = await api.put(`/property/${selectedProperty._id}`, newProperty);
                    if (res.status === 200) {
                        setProperties(properties.map(property => property._id === selectedProperty._id ? res.data : property));
                        setSelectedTestiomnial(null);
                    }
                } else {
                    //addImg();
                    // Create property
                    console.log(typeof newProperty.media)
                    const imgres = await api.post("/file/upload", newProperty.media)
                    if(imgres.status ===400){
                        setErrors('image did not upload properly')
                    }
                    const res = await api.post('/property', newProperty);
                    if (res.status === 201) {
                        setProperties([...properties, res.data]);
                        console.log(res.data);
                    }
                }
                //setNewProperty({ title: '',address: '',price: '',image: '',bed:'',bath: '',sqft: '',description: '',category: '',media: []});
                // console.log(typeof newProperty.media)
                navigate('/secure/listings');
            } catch (e) {
                console.log(e)
                setErrors('There was an error creating/updating the property');
            }
        }
        //setLoading(false)
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
                        placeholder='enter the title of the property' className='p-3 border rounded-lg' />
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Address</div>
                        <input value={newProperty.address} name='address' 
                        onChange={handleChange} type='text' 
                        placeholder='enter the address of the property' className='p-3 border rounded-lg' />
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Price</div>
                        <input value={newProperty.price} name='price' 
                        onChange={handleChange} type='text' 
                        placeholder='enter the price of the property' className='p-3 border rounded-lg' />
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Beds</div>
                        <input value={newProperty.bed} name='bed' 
                        onChange={handleChange} type='text' 
                        placeholder='enter how many beds the property has' className='p-3 border rounded-lg' />
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Sqft</div>
                        <input value={newProperty.sqft} name='sqft' 
                        onChange={handleChange} type='text' 
                        placeholder='enter the size of the property' className='p-3 border rounded-lg' />
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Description</div>
                        <input value={newProperty.description} name='description' 
                        onChange={handleChange} type='text' 
                        placeholder='enter description the property' className='p-3 border rounded-lg' />
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Baths</div>
                        <input value={newProperty.bath} name='bath' 
                        onChange={handleChange} type='text' 
                        placeholder='enter how many baths the property has' className='p-3 border rounded-lg' />
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Images</div>
                        <input value={newProperty.image} name='image' 
                        onChange={handleChange} type='text' 
                        placeholder='add images of the property' className='p-3 border rounded-lg' />
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Category</div>
                        <select  className='p-4 border rounded-lg'  onChange={handleChange} value={newProperty.category} name='category' >
                            <option>category</option>
                            {categories.map( category => (
                                <option>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>media</div>
                        <input value={newProperty.media} name='media' 
                        onChange={handleChange} type='file' 
                        placeholder='insert media' className='p-3 border rounded-lg' />
                    </div>
                </div>
                <div className="p-5 flex justify-center space-x-5 text-xs">
                    <button type="button"  onClick={handleCancel}className="px-5 py-3 w-1/5 rounded bg-gray-100">Cancel</button>
                    <button type="submit" className="px-6 py-3 rounded bg-primary w-1/5 text-white">Create Property</button>
                </div>
            </form>
        </div>
        
    );
};

export default AddProperty;