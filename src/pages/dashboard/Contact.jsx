import React, {useState} from 'react';

const Contact = () => {
    const [contacts, setContacts] = useState([
        {
            name: 'Faiza',
            email: 'f@gmail.com',
            phone: '431278288222',
            message: 'Hello I was revyil.vuwiubduobdbuwdjjobdjbdw'
        },
        {
            name: 'Victor',
            email: 'vic@gail.com',
            phone: '792812892189982198',
            message: 'Hello I was revyil.vuwiubduobdbuwdjjobdjbdw'
        },
        {
            name: 'Faiza',
            email: 'jinssu@ghshsjjs',
            phone: '431278288222',
            message: 'Hello I was revyil.vuwiubduobdbuwdjjobdjbdw'
        },
        {
            name: 'FaRandoiza',
            email: 'jinssu@ghshsjjs',
            phone: '431278288222',
            message: 'Call me when yoire avaianlele'
        },
    ]);


    return (
        <section className="h-screen m-5 mx-10">
            <div className={'container mx-auto gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
                {contacts.map((contact) => (
                    <div className={'shadow shadow-lg p-4'} key={contact._id}>
                        <h1>{contact.name}</h1>
                        <p>{contact.email}</p>
                        <p>{contact.phone}</p>
                        <p>{contact.message}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Contact;