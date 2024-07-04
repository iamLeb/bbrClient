import GlobalContext from './Global.js';
import {useEffect, useState} from "react";
import api from "../services/api.js";

const GlobalContextProvider = ({ children }) => {
    /*
        Categories
     */
    const [categories, setCategories] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [neighbourhoods, setNeighbourhoods] = useState([]);

    const getCategories = async () => {
        const res = await api.get('category');
        setCategories(res.data);
    }

    const getTestimonial = async () => {
        const res = await api.get('testimonial');
        setTestimonials(res.data);
    }

    const getBlogs= async () => {
        const res = await api.get('blog');
        setBlogs(res.data);
    }

    const getProvinces = async () => {
        const res = await api.get('province');
        setNeighbourhoods(res.data);
    }


    useEffect(() => {
        getCategories()
        getTestimonial()
        getBlogs()
        getProvinces()
    })
    return (
        <GlobalContext.Provider value={{ categories, testimonials, blogs, neighbourhoods }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;