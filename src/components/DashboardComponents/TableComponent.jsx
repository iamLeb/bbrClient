import React, {useContext, useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import api from "../../services/api.js";
import GlobalContext from "../../context/Global.js";

const TableComponent = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [categories, setCategories] = useState({});
    const [neighbourhoods, setNeighbourhoods] = useState({});
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(true); // Initially set to true

    const fetchProperties = async () => {
        try {
            const response = await api.get('/property');
            const properties = response.data;

            // Fetch categories for each property
            const categoryPromises = properties.map(property => fetchCategoryName(property.category));
            const categoryResponses = await Promise.all(categoryPromises);

            // Create a map of category IDs to category names
            const categoriesMap = {};
            categoryResponses.forEach((response, index) => {
                const categoryId = properties[index].category;
                categoriesMap[categoryId] = response.data;
            });

            // Fetch neighbourhoods for each property
            const neighbourhoodPromises = properties.map(property => fetchNeighbourhoodName(property.neighbourhood));
            const neighbourhoodResponses = await Promise.all(neighbourhoodPromises);

            // Create a map of neighbourhood IDs to neighbourhood names
            const neighbourhoodsMap = {};
            neighbourhoodResponses.forEach((response, index) => {
                const neighbourhoodId = properties[index].neighbourhood;
                neighbourhoodsMap[neighbourhoodId] = response.data;
            });

            // Fetch media for each property
            const mediaPromises = properties.map(property => fetchMedia(property._id));
            const mediaResponses = await Promise.all(mediaPromises);

            properties.forEach((property, index) => {
                property.media = mediaResponses[index].data; // Attach media data to each blog
            });

            setCategories(categoriesMap);
            setNeighbourhoods(neighbourhoodsMap);
            setProperties(properties);
        } catch (error) {
            setErrors('There was an error fetching properties');
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    const fetchCategoryName = async id => {
        const response = await api.get(`/category/${id}`);
        return response;
    };

    const fetchNeighbourhoodName = async id => {
        const response = await api.get(`/neighbourhood/${id}`);
        return response;
    };

    const fetchMedia = async (ownerId) => {
        try {
            return await api.get(`/media/getMediaForOwner/${ownerId}`);
        } catch (error) {
            return {data: []};
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                const res = await api.delete(`/property/${id}`);
                const property = properties.find((property) => property._id === id);
                const media = await api.delete(`/media/${property.media._id}`);
                if (res.status === 200 && media.status === 200) {
                    setProperties(properties.filter(property => property._id !== id));
                }
            } catch (error) {
                setErrors('There was an error deleting the gallery: ' + error.message);
            }
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div
                    className="w-8 h-8 border-4 border-t-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-xl font-semibold">Loading...</span>
            </div>
        );
    }

    return (
        <div className="h-screen m-5">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b"><h3 className="font-bold">Add, Edit & Remove</h3></div>
                <div className="p-3">
                    <div className="sm:flex justify-between items-center">
                        <button onClick={() => navigate('add')}
                                className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+
                            Create New Property
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-left lg:text-center text-sm bg-gray-100">
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2 hidden lg:table-cell">Address</th>
                            <th className="px-4 py-2 hidden lg:table-cell">Price</th>
                            <th className="px-4 py-2 hidden lg:table-cell">Image</th>
                            <th className="px-4 py-2 hidden lg:table-cell">Status</th>
                            <th className="px-4 py-2 text-end lg:text-center">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {properties.map((property) => (
                            <tr key={property._id} className="text-left lg:text-center text-xs border-b">
                                <td className="px-4 py-2">{property.title}</td>
                                <td className="px-4 py-2 truncate hidden lg:table-cell">{property.address}</td>
                                <td className="px-4 py-2 hidden lg:table-cell">{property.price}</td>
                                <td className="px-4 py-2 hidden lg:table-cell">
                                    <img src={property.media.url} alt="Property Image"
                                         className="w-10 h-10 object-cover rounded-lg"/>
                                </td>
                                <td className={`px-4 py-2 hidden lg:table-cell font-bold ${property.status === true ? 'text-green-500' : 'text-red-500'}`}>
                                    {property.status === true ? 'Active' : 'Sold'}
                                </td>

                                <td className="px-4 py-2">
                                    <div className="flex justify-end lg:justify-center text-end">
                                        <button onClick={() => navigate('edit/' + property._id)}
                                                className="px-2 py-1 rounded bg-primary text-white">Edit
                                        </button>
                                        <button onClick={() => handleDelete(property._id)}
                                                className="ml-2 px-2 py-1 rounded bg-red-500 text-white">Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end p-4 space-x-2">
                    <button className="border px-2 py-1 text-sm rounded">Previous</button>
                    <button className="border px-2 py-1 text-white bg-purple-900 text-sm rounded">1</button>
                    <button className="border px-2 py-1 text-sm rounded">Next</button>
                </div>
            </div>
        </div>
    );

};

export default TableComponent;
