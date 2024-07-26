import React from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../../services/api.js";
import {useEffect, useState} from "react";

const Testimonials = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState({name: '', message: ''});
    const [selectedTestimonial, setSelectedTestiomnial] = useState(null); // State for the selected testimonial
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const fetchTestimonials = async () => {
        try {
            const res = await api.get('/testimonial');
            setTestimonials(res.data);
        } catch (error) {
            setErrors('There was an error fetching testimonials');
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleChange = e => {
        const {name, value} = e.target;
        setNewTestimonial({
            ...newTestimonial,
            [name]: value
        });
    };

    const handleDelete = async id => {
        if (window.confirm("Are you sure you want to delete this testimonial?")) {
            setLoading(true);
            try {
                const res = await api.delete(`/testimonial/${id}`);
                if (res.status === 200) {
                    setLoading(false);
                    setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
                }
            } catch (e) {
                setErrors('There was an error deleting the testimonial');
            }
            setLoading(false)
        }
    }

    const handleSubmit = async e => {
        setLoading(true);
        e.preventDefault();
        if (!newTestimonial.name || !newTestimonial.message) {
            setErrors('all fields required');
        } else {
            try {
                if (selectedTestimonial) {
                    // Update testimonial
                    const res = await api.put(`/testimonial/${selectedTestimonial._id}`, newTestimonial);
                    if (res.status === 200) {
                        setTestimonials(testimonials.map(testimonial => testimonial._id === selectedTestimonial._id ? res.data : testimonial));
                        setSelectedTestiomnial(null);
                    }
                } else {
                    // Create testimonial
                    const res = await api.post('/testimonial/create', newTestimonial);
                    if (res.status === 201) {
                        setTestimonials([...testimonials, res.data]);
                    }
                }
                setNewTestimonial({name: '', message: ''});
                toggleModal();
            } catch (e) {
                setErrors(e.response.data.error);
            }
        }
        setLoading(false)
    };

    const closeModal = () => {
        setNewTestimonial({name: '', message: ''});
        setSelectedTestiomnial(null);
        toggleModal();
    }

    const handleEdit = testimonial => {
        setLoading(true)
        setSelectedTestiomnial(testimonial);
        setNewTestimonial({name: testimonial.name, message: testimonial.message});
        toggleModal();
        setLoading(false)
    };


    const getFirstFiveWords = (text) => {
        return text.split(' ').slice(0, 5).join(' ') + (text.split(' ').length > 5 ? '...' : '');
    };

    return (
        <section className="h-screen m-5 mx-10">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold">My Testimonials</h3>
                    {loading ? 'loading...' : ''}
                    <div>
                        <button onClick={toggleModal}
                                className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+
                            Add New
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-sm bg-gray-100">
                            <th className="px-4 py-2 lg:w-1/3 text-center sm:text-wrap">Name</th>
                            <th className="px-4 py-2 md:w-1/4 lg:w-1/3 text-center hidden sm:table-cell">Message</th>
                            <th className="px-4 py-2 lg:w-1/3 text-right ">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {testimonials.map((testimonial) => (
                            <tr key={testimonial._id} className="text-xs border-b">
                                <td className="px-4 py-2 lg:w-1/3  sm:text-center">{testimonial.name}</td>
                                <td className=" py-2 w-1/3 text-center hidden sm:table-cell">{getFirstFiveWords(testimonial.message)}</td>
                                <td className="px-4 py-2">
                                    <div className={'flex text-right justify-end sm:justify-center sm:block'}>
                                        <button onClick={() => handleEdit(testimonial)}
                                                className="px-2 py-1 rounded bg-primary text-white text-center">Edit
                                        </button>
                                        <button onClick={() => handleDelete(testimonial._id)} className="ml-2 px-2 py-1 rounded
                                                bg-red-500 text-white text-center">Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end p-4 space-x-2">
                    <button className="border px-2 py-1 text-sm
                rounded">Previous
                    </button>
                    <button className="border px-2 py-1 text-white bg-purple-900
                text-sm rounded">1
                    </button>
                    <button className="border px-2 py-1 text-sm
                rounded">Next
                    </button>
                </div>
                {modal && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">
                        <div
                            className="bg-white m-2 sm:m-0 w-full sm:w-[35%] rounded-md shadow-lg transition-transform duration-300 transform">
                            <div className="bg-gray-100 p-3 flex items-center">
                                <h2 className="font-extrabold">{selectedTestimonial ? 'Update Testimonial' : 'Create New Testimonial'}</h2>
                            </div>
                            <div className="p-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                                        <label className="block text-sm font-bold mb-2">Name</label>
                                        <input
                                            onChange={handleChange}
                                            value={newTestimonial.name}
                                            placeholder="Enter your name"
                                            type="text"
                                            name="name"
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                                        <label className="block text-sm font-bold mb-2">Message</label>
                                        <input
                                            onChange={handleChange}
                                            value={newTestimonial.message}
                                            placeholder="Enter the message"
                                            type="text"
                                            name="message"
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2 text-xs">
                                        <button type="button" onClick={closeModal}
                                                className="px-3 py-0 rounded bg-gray-100">Close
                                        </button>
                                        <button type="submit"
                                                className="px-4 py-2 rounded bg-primary text-white">{selectedTestimonial ? 'Update Testimonial' : 'Create Testimonial'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </section>
    );
};

export default Testimonials;