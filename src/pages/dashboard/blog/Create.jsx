import {useContext, useEffect, useState} from 'react';
import GlobalContext from "../../../context/Global.js";
import api from '../../../services/api';
import {useNavigate} from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const {categories} = useContext(GlobalContext);

    const [values, setValues] = useState({
        title: '',
        category: '',
        file: null,
        content: ''
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = e => {
        setValues(prevValues => ({
            ...prevValues,
            file: e.target.files[0]
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('category', values.category);
        formData.append('file', values.file);
        formData.append('content', values.content);

        if (!values.file || !values.content || !values.title || !values.category) {
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
            const blogRes = await api.post('/blog/create', {
                title: values.title,
                category: values.category,
                content: values.content,
            });

            const blogId = blogRes.data._id;

            // Store the URL and blog ID in the media collection
            await api.post('/media/create', {
                type: 'image',
                url,
                ownerId: blogId,
                name: 'Blog',
            });
            setLoading(false);
            navigate('/secure/blog');

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

            <form onSubmit={handleSubmit}>
                <div className={'flex justify-center'}>
                    {errors && <span className="p-2 rounded-lg bg-red-500 font-bold text-white text-xs mt-2 uppercase">{errors}</span>}
                </div>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <div className='p-3 flex flex-col w-full'>
                            <div className='font-bold mb-3'>Title</div>
                            <input
                                onChange={handleChange}
                                name='title'
                                type='text'
                                placeholder='Enter the title of the property'
                                className='p-3 border rounded-lg w-full'
                            />
                        </div>
                        <div className='p-3 flex flex-col w-full'>
                            <div className='font-bold mb-3'>Category</div>
                            <select
                                onChange={handleChange}
                                className='p-3 border rounded-lg w-full'
                                name='category'
                            >
                                <option value=''>--Select Category--</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='p-3 flex flex-col w-full'>
                            <div className='font-bold mb-3'>Image</div>
                            <input
                                onChange={handleFileChange}
                                name='file'
                                type='file'
                                className='p-3 border rounded-lg w-full'
                            />
                        </div>
                    </div>

                    <div className='p-3 flex flex-col'>
                        <div className='font-bold mb-3'>Content</div>
                        <textarea
                            onChange={handleChange}
                            name='content'
                            cols='30'
                            rows='10'
                            className='border rounded-lg'
                        ></textarea>
                    </div>
                </div>
                <div className='p-5 flex justify-center space-x-5 text-xs'>
                    <button type='submit'
                            disabled={loading}
                            className='px-6 py-3 rounded bg-primary w-1/5 text-white flex items-center justify-center'>
                        <span>Create Property</span>
                        {loading && <span
                            className='ml-2 animate-spin border-2 border-t-2 border-white border-t-transparent rounded-full w-4 h-4'></span>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
