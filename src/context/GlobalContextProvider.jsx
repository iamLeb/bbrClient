import GlobalContext from './Global.js';
import {useEffect, useState} from "react";
import api from "../services/api.js";

const GlobalContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [neighbourhoods, setNeighbourhoods] = useState([]);
    const [contacts, setContacts] = useState([]);

    const getCategories = async () => {
        const res = await api.get('category');
        setCategories(res.data);
    };

    const getTestimonial = async () => {
        const res = await api.get('testimonial');
        setTestimonials(res.data);
    };

    const getBlogs = async () => {
        const res = await api.get('blog');
        setBlogs(res.data);
    };

    const getNeighbourhood = async () => {
        setLoading(true);
        const res = await api.get('neighbourhood');
        setNeighbourhoods(res.data);
        setLoading(false);
    };

    const getContacts = async () => {
        const res = await api.get('contact');
        setContacts(res.data);
    }

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([getCategories(), getTestimonial(), getBlogs(), getNeighbourhood(), getContacts()]);
        };
        fetchData();
    }, []);

    return (
        <GlobalContext.Provider value={{categories, testimonials, blogs, neighbourhoods, loading, contacts}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
