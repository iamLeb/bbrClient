import React, {useContext} from 'react';
import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import api from "../../services/api.js";
import GlobalContext from "../../context/Global.js";

const TableComponent = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [categories, setCategories] = useState({});
    const [neighbourhoods, setNeighbourhoods] = useState({});
    const [errors, setErrors] = useState('');
    const {format} = useContext(GlobalContext);

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
            const neighbourhoodPromises = properties.map(property => fetchNeighbourhoodName(property.category));
            const neighbourhoodResponses = await Promise.all(neighbourhoodPromises);

            // Create a map of neighbourhood IDs to neighbourhood names
            const neighbourhoodsMap = {};
            neighbourhoodResponses.forEach((response, index) => {
                const neighbourhoodId = properties[index].neighbourhood;
                neighbourhoodsMap[neighbourhoodId] = response.data;
            });


            // Fetch media for each blog
            const mediaPromises = properties.map(property => fetchMedia(property._id));
            const mediaResponses = await Promise.all(mediaPromises);

            properties.forEach((property, index) => {
                property.media = mediaResponses[index].data; // Attach media data to each blog
            });

            setCategories(categoriesMap);
            setNeighbourhoods(neighbourhoodsMap)
            setProperties(properties);
        } catch (error) {
            console.log(error.message);
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
        fetchProperties()
    }, []);

    return (
        <div className='m-3'>
            <div className="bg-white border w-full border-gray-100 shadow-2xl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold">My listings</h3>
                    <div>
                        <button onClick={() => navigate('add')}
                                className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+
                            Add
                            New
                            Category
                        </button>
                    </div>
                </div>
                <div className="p-3 hidden sm:block">
                    <div className="sm:flex justify-between items-center">
                        <div className="relative mt-2 sm:mt-0">
                            <input
                                placeholder="Search..."
                                className="py-2 px-10 w-56 outline-none border rounded text-sm" type="text"/>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-center w-full text-[15px] bg-gray-100">
                            <th className="px-4 py-2 lg:w-1/5 text-center sm:text-wrap">Title</th>
                            <th className="px-4 py-2 md:w-1/4 lg:w-1/5 text-center hidden sm:table-cell">Address</th>
                            <th className="px-4 py-2 lg:w-1/5 text-center hidden sm:table-cell">Price</th>
                            <th className="px-4 py-2 lg:w-1/5 text-center hidden lg:table-cell">Created</th>
                            <th className="px-4 py-2 lg:w-1/5 text-center ">Action</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                {properties.map((property) => (
                    <div key={property._id} className="m-5">
                        <table className='w-full'>
                            <tbody>
                            <tr className="text-center text-[15px] w-full border-b">
                                <td className="px-4 py-2 lg:w-1/5  sm:text-center">{property.title}</td>
                                <td className=" py-2 md:w-1/4 lg:w-1/5 text-center hidden sm:table-cell">{property.address}</td>
                                <td className="px-4 py-2 md:w-1/4  lg:w-1/5 text-center hidden sm:table-cell">{property.price}</td>
                                <td className="px-4 py-2 hidden lg:block">
                                        <span>
                                            {format(property.createdAt)}
                                        </span>
                                </td>
                                <td className="px-4 py-2 md:w-1/4  lg:w-1/5 hidden lg:table-cell">
                                            <span className={`px-2py-1 text-xs font-bold
                                            rounded text-center`}>3
                                            Active
                                            </span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className={'flex justify-end sm:justify-center sm:block'}>
                                        <button className="px-2 py-1 rounded bg-green-500 text-white text-center">Edit
                                        </button>
                                        <button onClick={() => handleDelete(property._id)} className="ml-2 px-2 py-1 rounded
                                                bg-red-500 text-white text-center">Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
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
            </div>
        </div>


    );
};

export default TableComponent;