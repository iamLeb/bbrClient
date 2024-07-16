import React, { useContext, useEffect, useState } from 'react';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { CiCalendar } from 'react-icons/ci';
import { AiOutlineComment } from 'react-icons/ai';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import api from '../../../services/api.js';
import GlobalContext from '../../../context/Global.js';

const Single = () => {
    let { id } = useParams();
    const [blog, setBlog] = useState({});
    const { getName, loading } = useContext(GlobalContext);

    const getBlog = async (id) => {
        try {
            const res = await api.get(`/blog/${id}`);
            setBlog(res.data);
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    useEffect(() => {
        getBlog(id);
    }, [id]);

    return (
        <section className={'container mx-auto'}>
            <div className={'md:flex justify-between gap-4 py-9 px-4 md:px-0 space-x-6'}>

                <div className={'md:w-2/3'}>
                    <div className={'pb-9'}>
                        <h1 className={'text-3xl font-bold'}>{blog.title}</h1>
                        <ul className={'flex space-x-4 items-center py-2 text-xs md:text-sm font-light'}>
                            <li>
                                <div className={'flex space-x-2 items-center'}>
                                    <IoFolderOpenOutline />
                                    <span>{getName(blog.category)}</span>
                                </div>
                            </li>
                            <li>
                                <div className={'flex space-x-2 items-center'}>
                                    <AiOutlineComment />
                                    <span>No Comments</span>
                                </div>
                            </li>
                            <li>
                                <div className={'flex space-x-2 items-center'}>
                                    <CiCalendar />
                                    <span>February 15, 2022</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={'overflow-hidden rounded-lg'}>
                        <img className={'object-cover object-center'}
                             src={blog.url}
                             alt="photo"/>
                    </div>

                    <div className={'pt-9 font-light'}>
                        <p>{blog.content}</p>
                    </div>
                </div>

                <div className="md:w-1/3 p-5">
                    <div className="bg-gray-50 border p-5 rounded-lg flex flex-col gap-4 sticky top-1/2">
                        <h1 className="font-bold text-2xl">Categories?</h1>

                        <ul>
                            <li>
                                <div className={'hover:text-primary flex justify-between space-x-2 items-center border-b'}>
                                    <p className={'py-3'}>{getName(blog.category)}</p>
                                    <IoIosArrowRoundForward size={28}/>
                                </div>
                            </li>

                            <li>
                                <div className={'hover:text-primary flex justify-between space-x-2 items-center border-b'}>
                                    <p className={'py-3'}>{getName(blog.category)}</p>
                                    <IoIosArrowRoundForward size={28}/>
                                </div>
                            </li>

                            <li>
                                <div className={'hover:text-primary flex justify-between space-x-2 items-center border-b'}>
                                    <p className={'py-3'}>{getName(blog.category)}</p>
                                    <IoIosArrowRoundForward size={28}/>
                                </div>
                            </li>
                        </ul>

                        <button className="bg-primary text-white font-bold w-full py-5 rounded-lg">Apply Now!</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Single;
