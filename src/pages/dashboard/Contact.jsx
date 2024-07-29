import React, { useEffect, useState } from 'react';
import api from "../../services/api.js";
import { AiOutlineDelete } from "react-icons/ai";

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [errors, setErrors] = useState('');

    const fetchContacts = async () => {
        try {
            const res = await api.get('/contact');
            setContacts(res.data);
        } catch (e) {
            setErrors('There was an error fetching contacts');
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async id => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            try {
                const res = await api.delete(`/contact/${id}`);
                if (res.status === 200) {
                    setContacts(contacts.filter(contact => contact._id !== id));
                }
            } catch (e) {
                setErrors('There was an error deleting the contact');
            }
        }
    };

    return (
        <section className="h-screen p-5 bg-gray-100">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-5">Contact Messages</h1>
                {errors && <p className="text-red-500 mb-4">{errors}</p>}
                <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {contacts.map(contact => (
                        <div
                            className="bg-white shadow-lg p-5 rounded-lg flex flex-col space-y-4 items-start"
                            key={contact._id}
                        >
                            <div>
                                <p className="text-lg font-semibold">Name: {contact.name}</p>
                                <p className="text-sm text-gray-600">Email: {contact.email}</p>
                                <p className="text-sm text-gray-600">Phone: {contact.phone}</p>
                                <p className="mt-4 text-gray-800">Message: {contact.message}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(contact._id)}
                                className="flex items-center px-2 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                <AiOutlineDelete className="mr-2" /> Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
