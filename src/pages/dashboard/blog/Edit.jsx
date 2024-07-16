import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import api from "../../../services/api.js";
import GlobalContext from "../../../context/Global.js";

const Edit = () => {
    let {id} = useParams();
    const navigate = useNavigate();

    // State variables
    const [loading, setLoading] = useState(false);
    const {categories, getName, fetchMedia} = useContext(GlobalContext);
    const [newBlog, setNewBlog] = useState({
        title: '',
        category: '',
        content: '',
        file: null
    });
    const [errors, setErrors] = useState('');

    const getBlog = async (id) => {
        try {
            setLoading(true);
            const res = await api.get(`/blog/${id}`);
            setNewBlog(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blog:', error);
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewBlog({
            ...newBlog,
            [name]: value
        });
    };

    const handleFileChange = e => {
        setNewBlog(prevValues => ({
            ...prevValues,
            file: e.target.files[0]
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate form fields
        if (!newBlog.title || !newBlog.category || !newBlog.content) {
            setErrors('All fields are required');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', newBlog.title);
            formData.append('category', newBlog.category);
            formData.append('content', newBlog.content);
            if (newBlog.file) {
                formData.append('file', newBlog.file);
            }

            const response = await api.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const url = response.data.url; // response url

            if (response.status === 200) {
                navigate('/secure/blog');
            }
        } catch (error) {
            setErrors(error.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlog(id);
    }, [id]);

    return (
        <div className='m-5 border rounded-b-lg'>
            <div className='bg-gray-100 p-3 font-extrabold text-center'>
                Update Blog
            </div>

            <form onSubmit={handleSubmit}>
                <div className={'flex justify-center'}>
                    {errors && <span
                        className="p-2 rounded-lg bg-red-500 font-bold text-white text-xs mt-2 uppercase">{errors}</span>}
                </div>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <div className='p-3 flex flex-col w-full'>
                            <div className='font-bold mb-3'>Title</div>
                            <input
                                value={newBlog.title}
                                onChange={handleChange}
                                name='title'
                                type='text'
                                className='p-3 border rounded-lg w-full'
                            />
                        </div>
                        <div className='p-3 flex flex-col w-full'>
                            <div className='font-bold mb-3'>Category</div>
                            <select
                                value={newBlog.category}
                                name='category'
                                onChange={handleChange}
                                className='p-3 border rounded-lg w-full'
                            >
                                <option value=''>{getName(newBlog.category)}</option>
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
                            value={newBlog.content}
                            name='content'
                            cols='30'
                            rows='10'
                            className='border rounded-lg'
                        ></textarea>
                    </div>
                </div>
                <div className='p-5 flex justify-center space-x-5 text-xs'>
                    <button
                        type='submit'
                        disabled={loading}
                        className='px-6 py-3 rounded bg-primary text-white flex items-center justify-center'
                    >
                        <span>Update Blog</span>
                        {loading && <span
                            className='ml-2 animate-spin border-2 border-t-2 border-white border-t-transparent rounded-full w-4 h-4'></span>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
