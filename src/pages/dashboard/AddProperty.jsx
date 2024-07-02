import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api.js";

const AddProperty = () => {
    const [newListing, setNewListing] = useState({ name: '' });
    const [errors, setErrors] = useState('');
    // const [selectedListing, setSelectedListing] = useState(null); // State for the selected listing
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/secure/listings')
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setNewListing({
            ...newListing,
            [name]: value
        });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (!newListing.name) {
            setErrors('Listing name is required');
        }
    };
    return (
        <div className='m-5 border rounded-b-lg'>
            <div className='bg-gray-100 p-3 font-extrabold text-center'>
                Add new listing
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className='p-3 flex flex-col'>
                    <div className='font-bold mb-3'>Title</div>
                    {errors && <p className="text-red-500 text- mt-2">{errors}</p>}
                    <input name='title' onChange={handleChange} type='text' placeholder='enter the title of the property' className='p-3 border rounded-lg' />
                </div>
                <div className='p-3 flex flex-col'>
                     <div className='font-bold mb-3'>Address</div>
                    <input  name='address' onChange={handleChange} type='text' placeholder='enter the address of the property' className='p-3 border rounded-lg' />
                </div>
                <div className='p-3 flex flex-col'>
                     <div className='font-bold mb-3'>Price</div>
                    <input  name='price' onChange={handleChange} type='text' placeholder='enter the price of the property' className='p-3 border rounded-lg' />
                </div>
                <div className='p-3 flex flex-col'>
                     <div className='font-bold mb-3'>Images</div>
                    <input type='img' placeholder='add images of the property' className='p-3 border rounded-lg' />
                </div>
                <div className="p-5 flex justify-center space-x-5 text-xs">
                    <button type="button"  onClick={handleCancel}className="px-5 py-3 rounded bg-gray-100">Cancel</button>
                    <button type="submit" className="px-6 py-3 rounded bg-primary text-white">Create Listing</button>
                </div>
            </form>
        </div>
        
    );
};

export default AddProperty;