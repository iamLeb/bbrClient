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
    const [properties, setProperties] = useState([]);
    const [listings, setListings] = useState([]);
    const [bookings, setBookings] = useState([]);

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

    const getProperties = async () => {
        setLoading(true)
        const res = await api.get('property');
        const propertiesData = res.data;

        // Fetch media for each blog
        const propertiesWithMedia = await Promise.all(
            propertiesData.map(async (property) => {
                const mediaResponse = await fetchMedia(property._id);
                const url = mediaResponse.data.url ?? 'default.png';
                return {...property, url};
            })
        );

        setProperties(propertiesWithMedia);
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

    const fetchMultipleMedia = async (ownerId) => {
        try {
            const response = await api.get(`/media/getMultipleMedia/${ownerId}`);
            return response.data;
        } catch (error) {
            return [];
        }
    };

    const getBookings = async () => {
        const res = await api.get('booking');
        setBookings(res.data);
    }


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
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
                setCategories(),
                getProperties(),
                fetchMedia(),
                fetchMultipleMedia(),
                getBookings(),
            ]);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <GlobalContext.Provider value={{
            categories,
            setCategories,
            testimonials,
            blogs,
            neighbourhoods,
            loading,
            contacts,
            format,
            getName,
            galleries,
            getNeighbourhoodName,
            properties,
            setProperties,
            listings,
            setListings,
            fetchMedia,
            fetchMultipleMedia,
            bookings,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
