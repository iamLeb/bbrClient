import React, {useContext, useEffect, useState} from 'react';
import {IoFolderOpenOutline} from 'react-icons/io5';
import {CiCalendar} from 'react-icons/ci';
import {IoIosArrowRoundForward} from 'react-icons/io';
import {useNavigate, useParams} from 'react-router-dom';
import api from '../../../services/api.js';
import GlobalContext from '../../../context/Global.js';
import properties from "../../dashboard/property/Properties.jsx";
import login from "../auth/Login.jsx";

const Single = () => {
    let {id} = useParams();
    const [blog, setBlog] = useState({
        title: '',
        category: '',
        createdAt: '',
        content: '',
        url: 'default.png' // Default image URL or empty string as per your needs
    });
    const navigate = useNavigate();
    const {getName, fetchMedia, format, properties} = useContext(GlobalContext);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const getBlog = async () => {
            const response = await api.get(`/blog/${id}`);
            const blogData = response.data;

            const mediaResponse = await fetchMedia(id);
            const url = mediaResponse?.data?.url || 'default.png';

            const blogWithMedia = {...blogData, url};
            setBlog(blogWithMedia);
            setLoading(false);

        };

        getBlog();
    }, [id, fetchMedia]);

    return (
        <section className="container mx-auto">
            <div className="md:flex justify-between gap-4 py-9 px-4 md:px-4 space-x-6">

                <div className="md:w-2/3">
                    <div className="pb-9">
                        <h1 className="text-3xl font-bold">{blog.title}</h1>
                        <ul className="flex space-x-4 items-center py-2 text-xs md:text-sm font-light">
                            <li>
                                <div className="flex space-x-2 items-center">
                                    <IoFolderOpenOutline/>
                                    <span>{getName(blog.category)}</span>
                                </div>
                            </li>
                            <li>
                                <div className="flex space-x-2 items-center">
                                    <CiCalendar/>
                                    <span>{format(blog.createdAt)}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="overflow-hidden rounded-lg">
                        <img className="object-cover object-center h-80 md:h-96 w-full"
                             src={blog.url}
                             alt="photo"/>
                    </div>

                    <div className="pt-9">
                        {blog.content.split('\n').map((line, index) => (
                            <p key={index} className="font-medium text-gray-700 leading-relaxed">
                                {line}
                                <br/>
                            </p>
                        ))}
                    </div>

                </div>

                <div className="md:w-1/3 p-5">
                    <div className="bg-gray-50 border p-5 rounded-lg flex flex-col gap-4 sticky top-1/2">
                        <h1 className="font-bold text-2xl">Categories</h1>

                        <ul>
                            {properties.slice(0,3).map((item, index) => (
                                <li key={index}>
                                    <div onClick={()=>navigate(`/properties/listing/${item._id}`)}
                                        className="hover:text-primary flex justify-between space-x-2 items-center border-b cursor-pointer">
                                        <p className="py-3">{item.title}</p>
                                        <IoIosArrowRoundForward size={28}/>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button onClick={() => navigate('/contact')}
                                className="bg-primary text-white font-bold w-full py-5 rounded-lg">Apply Now!
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Single;
