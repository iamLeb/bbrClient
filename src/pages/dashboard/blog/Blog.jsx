import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import api from "../../../services/api";
import GlobalContext from "../../../context/Global.js";

const Blog = () => {
    const navigate = useNavigate();
    const {format} = useContext(GlobalContext);

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState({});
    const [errors, setErrors] = useState('');
    const fetchBlogs = async () => {
        try {
            const response = await api.get('/blog');
            const blogs = response.data;

            // Fetch categories for each blog
            const categoryPromises = blogs.map(blog => fetchCategoryName(blog.category));
            const categoryResponses = await Promise.all(categoryPromises);

            // Create a map of category IDs to category names
            const categoriesMap = {};
            categoryResponses.forEach((response, index) => {
                const categoryId = blogs[index].category;
                categoriesMap[categoryId] = response.data;
            });

            // Fetch media for each blog
            const mediaPromises = blogs.map(blog => fetchMedia(blog._id));
            const mediaResponses = await Promise.all(mediaPromises);

            blogs.forEach((blog, index) => {
                blog.media = mediaResponses[index].data; // Attach media data to each blog
            });

            setCategories(categoriesMap);
            setBlogs(blogs);
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchCategoryName = async id => {
        const response = await api.get(`/category/${id}`);
        return response;
    };

    const fetchMedia = async (ownerId) => {
        try {
            return await api.get(`/media/getMediaForOwner/${ownerId}`);
        } catch (error) {
            return {data: []};
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                const res = await api.delete(`/blog/${id}`);
                const blog = blogs.find((blog) => blog._id === id);
                const media = await api.delete(`/media/${blog.media._id}`);
                if (res.status === 200 && media.status === 200) {
                    setBlogs(blogs.filter(blog => blog._id !== id));
                }
            } catch (error) {
                setErrors('There was an error deleting the gallery: ' + error.message);
            }
        }
    };

    const getFirstFiveWords = (text) => {
        return text.split(' ').slice(0, 5).join(' ') + (text.split(' ').length > 5 ? '...' : '');
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <section className="h-screen m-5">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b"><h3 className="font-bold">Add, Edit & Remove</h3></div>
                <div className="p-3">
                    <div className="sm:flex justify-between items-center">
                        <button onClick={() => navigate('create')}
                                className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+
                            Create New Blog
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-left lg:text-center text-sm bg-gray-100">
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2 hidden lg:table-cell">Content</th>
                            <th className="px-4 py-2 hidden lg:table-cell">Image</th>
                            <th className="px-4 py-2 hidden lg:table-cell">Category</th>
                            <th className="px-4 py-2 hidden lg:table-cell">Created</th>
                            <th className="px-4 py-2 text-end lg:text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {blogs.map((blog) => (

                            <tr key={blog._id} className="text-left lg:text-center text-xs border-b ">
                                <td className="px-4 py-2">{getFirstFiveWords(blog.title)}</td>
                                <td className="px-4 py-2 truncate hidden lg:block">{getFirstFiveWords(blog.content)}</td>
                                <td className="px-4 py-2 hidden lg:table-cell">
                                    <img src={blog.media.url} alt="Blog Image"
                                         className="w-10 h-10 object-cover rounded-lg"/>
                                </td>
                                <td className="px-4 py-2 hidden lg:table-cell">
                                    <span
                                        className={`px-2 py-1 text-xs font-bold rounded ${categories[blog.category].active ? 'text-black' : 'text-red-500'}`}>{categories[blog.category].name}</span>

                                </td>
                                <td className="px-4 py-2 hidden lg:block">
                                        <span>
                                            {format(blog.createdAt)}
                                        </span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className={'flex justify-end lg:justify-center text-end '}>
                                        <button onClick={()=> navigate('edit/' + blog._id)} className="px-2 py-1 rounded bg-green-500 text-white">Edit</button>
                                        <button onClick={() => handleDelete(blog._id)}
                                                className="ml-2 px-2 py-1 rounded bg-red-500 text-white">Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end p-4 space-x-2">
                    <button className="border px-2 py-1 text-sm rounded">Previous</button>
                    <button className="border px-2 py-1 text-white bg-purple-900 text-sm rounded">1</button>
                    <button className="border px-2 py-1 text-sm rounded">Next</button>
                </div>
            </div>
        </section>
    );
};

export default Blog;
