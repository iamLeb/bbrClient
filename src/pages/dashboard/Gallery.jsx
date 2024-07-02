import { useState, useEffect } from "react";
import api from "../../services/api.js";

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [newGallery, setNewGallery] = useState({ image: '', province: '' });
    const [errors, setErrors] = useState('');
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const fetchGalleries = async () => {
        try {
            const res = await api.get('/gallery');
            setGalleries(res.data);
        } catch (e) {
            setErrors('There was an error fetching galleries');
        }
    };

    const fetchProvinces = async () => {
        try {
            const res = await api.get('/province');
            setProvinces(res.data);
        } catch (e) {
            setErrors('There was an error fetching provinces');
        }
    };

    useEffect(() => {
        fetchGalleries();
        fetchProvinces();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGallery({
            ...newGallery,
            [name]: value
        });
    };

    const handleDelete = async (id) => {
        try {
            const res = await api.delete(`/gallery/${id}`);
            if (res.status === 200) {
                setGalleries(galleries.filter(gallery => gallery._id !== id));
            }
        } catch (e) {
            setErrors('There was an error deleting the gallery');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newGallery.image || !newGallery.province) {
            setErrors('Image name and province are required');
        } else {
            try {
                const res = await api.post('/gallery/create', newGallery);

                if (res.status === 201) {
                    setGalleries([...galleries, res.data]);
                    setNewGallery({ image: '', province: '' });
                    toggleModal();
                }
            } catch (e) {
                setErrors(e.name);
            }
        }
    };

    const getProvinceName = (id) => {
        const province = provinces.find(province => province._id === id);

        return province ? province.name : '';
    };


    return (
        <section className="h-screen m-5 mx-10">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold">Gallery</h3>

                    <div>
                        <button onClick={toggleModal}
                                className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+
                            Add New Gallery
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-sm bg-gray-100">
                            <th className="text-left px-4 py-2">Image</th>
                            <th className="text-left px-4 py-2">Province</th>
                            <th className="text-right px-4 py-2">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {galleries.map((gallery) => (
                            <tr className="text-xs border-b" key={gallery._id}>
                                <td className="px-4 py-2 text-left">{gallery.image}</td>
                                <td className="px-4 py-2 text-left">{getProvinceName(gallery.province)}</td>
                                <td className="px-4 py-2 text-right">
                                    <div className="flex justify-end">
                                        <button className="px-2 py-1 rounded bg-primary text-white">Edit</button>
                                        <button onClick={() => handleDelete(gallery._id)}
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

            {modal && (
                <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 opacity-100`}>
                    <div className={`bg-white m-2 sm:m-0 w-full sm:w-[35%] rounded-md shadow-lg transition-transform duration-300 transform`}>
                        <div className="bg-gray-100 p-3 flex items-center">
                            <h2 className="font-extrabold">Create New Gallery</h2>
                        </div>
                        <div className="p-3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                                    <label className="block text-sm font-bold mb-2">Image Name</label>
                                    <input
                                        onChange={handleChange}
                                        placeholder="Enter image name"
                                        type="text"
                                        name="image"
                                        value={newGallery.image}
                                        className="w-full p-2 border rounded"
                                    />
                                    <label className="block text-sm font-bold mb-2">Province</label>
                                    <select
                                        onChange={handleChange}
                                        name="province"
                                        value={newGallery.province}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select a province</option>
                                        {provinces.map((province) => (
                                            <option key={province._id} value={province._id}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-end space-x-2 text-xs">
                                    <button type="button" onClick={toggleModal}
                                            className="px-3 py-0 rounded bg-gray-100">Close
                                    </button>
                                    <button type="submit" className="px-4 py-2 rounded bg-primary text-white">Create
                                        Gallery
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
