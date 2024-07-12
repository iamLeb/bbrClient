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
    const [galleries, setGalleries] = useState([]);

    const getCategories = async () => {
        const res = await api.get('category');
        setCategories(res.data);
    };

    const getTestimonials = async () => {
        const res = await api.get('testimonial');
        setTestimonials(res.data);
    };

    const getBlogs = async () => {
        setLoading(true)
        const res = await api.get('blog');
        const blogsData = res.data;

        // Fetch media for each blog
        const blogsWithMedia = await Promise.all(
            blogsData.map(async (blog) => {
                const mediaResponse = await fetchMedia(blog._id);
                const url = mediaResponse.data.url ?? 'default.png';
                return {...blog, url};
            })
        );

        setBlogs(blogsWithMedia);
        setLoading(false)
    };

    const getGalleries = async () => {
        setLoading(true);
        const res = await api.get('gallery');
        const galleriesData = res.data;

        // Fetch media for each blog
        const galleriesWithMedia = await Promise.all(
            galleriesData.map(async (gallery) => {
                const mediaResponse = await fetchMedia(gallery._id);
                const url = mediaResponse.data.url ?? 'default.png';
                return {...gallery, url};
            })
        );

        setGalleries(galleriesWithMedia)
        setLoading(false)
    }

    // Helper function to get name
    const getName = id => {
        const category = categories.find((category) => category._id === id);
        return category ? category.name : '';
    };

    const getNeighbourhoods = async () => {
        setLoading(true);
        const res = await api.get('neighbourhood');
        setNeighbourhoods(res.data);
        setLoading(false);
    };

    const getContacts = async () => {
        const res = await api.get('contact');
        setContacts(res.data);
    };

    const getNeighbourhoodName = (id) => {
        const neighbourhood = neighbourhoods.find((neighbourhood) => neighbourhood._id === id);
        return neighbourhood ? neighbourhood.name : '';
    }
    const format = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const fetchMedia = async (ownerId) => {
        try {
            return await api.get(`/media/getMediaForOwner/${ownerId}`);
        } catch (error) {
            return {data: []};
        }
    };

    

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                getCategories(),
                getTestimonials(),
                getBlogs(),
                getNeighbourhoods(),
                getContacts(),
                format(),
                getName(),
                getGalleries(),
                getNeighbourhoodName(),
            ]);
        };
        fetchData();
    }, []);

    return (
        <GlobalContext.Provider value={{
            categories,
            testimonials,
            blogs,
            neighbourhoods,
            loading,
            contacts,
            format,
            getName,
            galleries,
            getNeighbourhoodName,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
