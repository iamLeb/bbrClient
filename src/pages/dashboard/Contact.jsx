import React, {useEffect, useState} from 'react';
import api from "../../services/api.js";

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
    }

    useEffect(() => {
        fetchContacts()
    });

    const handleDelete = async id => {
        try {
            const res = await api.delete(`/contact/${id}`);
            if (res.status === 200) {
                setContacts(contacts.filter(contact => contact._id !== id));
            }
        } catch (e) {
            setErrors('There was an error deleting the contact');
        }
    }
    return (
        <section className="h-screen m-5 mx-10">
            <div className={'gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
                {contacts.map((contact) => (
                    <div className={'container mx-auto shadow shadow-lg p-3 rounded-lg flex flex-col space-y-4 items-center'} key={contact._id}>
                        <div>
                            <h1 className={'font-semibold'}>{contact.name}</h1>
                            <p className={'text-sm'}>{contact.email}</p>
                            <p className={'text-sm'}>{contact.phone}</p>
                            <br/>
                            <p>{contact.message}</p>
                        </div>

                        <div>
                            <button onClick={() => handleDelete(contact._id)}
                                    className="ml-2 px-2 py-1 rounded bg-red-500 text-white">Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Contact;