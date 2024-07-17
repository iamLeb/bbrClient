import React, { useContext, useEffect, useState } from 'react';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { CiCalendar } from 'react-icons/ci';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import api from '../../../services/api.js';
import GlobalContext from '../../../context/Global.js';

const Single = () => {
    let { id } = useParams();
    const [blog, setBlog] = useState({});
    const { getName, fetchMedia } = useContext(GlobalContext);

    useEffect(() => {
        const getBlog = async () => {
            try {
                const response = await api.get(`/blog/${id}`);
                const blogData = response.data;

                // Fetch media data
                const mediaResponse = await fetchMedia(id);
                const url = mediaResponse?.data?.url || 'default.png'; // Use default if media URL is not available

                // Combine blog data with media URL
                const blogWithMedia = { ...blogData, url };
                setBlog(blogWithMedia);
            } catch (error) {
                console.error('Error fetching blog:', error);
                // Handle error, show a message or log it
            }
        };

        getBlog(); // Call getBlog function
    }, [id, fetchMedia]); // Ensure fetchMedia is in the dependency array if it might change

    return (
        <section className="container mx-auto">
            <div className="md:flex justify-between gap-4 py-9 px-4 md:px-4 space-x-6">

                <div className="md:w-2/3">
                    <div className="pb-9">
                        <h1 className="text-3xl font-bold">{blog.title}</h1>
                        <ul className="flex space-x-4 items-center py-2 text-xs md:text-sm font-light">
                            <li>
                                <div className="flex space-x-2 items-center">
                                    <IoFolderOpenOutline />
                                    <span>{getName(blog.category)}</span>
                                </div>
                            </li>
                            <li>
                                <div className="flex space-x-2 items-center">
                                    <CiCalendar />
                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
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
                        {console.log(blog.content)}
                        {/*{blog.content.split('\n').map((line, index) => (*/}
                        {/*    <p key={index} className="font-light text-gray-700 leading-relaxed">*/}
                        {/*        {line}*/}
                        {/*        <br/>*/}
                        {/*    </p>*/}
                        {/*))}*/}
                    </div>

                </div>

                <div className="md:w-1/3 p-5">
                    <div className="bg-gray-50 border p-5 rounded-lg flex flex-col gap-4 sticky top-1/2">
                        <h1 className="font-bold text-2xl">Categories</h1>

                        <ul>
                            {[1, 2, 3].map((item, index) => (
                                <li key={index}>
                                    <div className="hover:text-primary flex justify-between space-x-2 items-center border-b">
                                        <p className="py-3">{getName(blog.category)}</p>
                                        <IoIosArrowRoundForward size={28}/>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button className="bg-primary text-white font-bold w-full py-5 rounded-lg">Apply Now!</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Single;
