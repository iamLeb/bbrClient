import { useState, useEffect } from "react";
import api from "../../services/api.js";
import neighbourhood from "./Neighbourhood.jsx";

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [neighbourhoods, setNeighbourhood] = useState([]);
    const [newGallery, setNewGallery] = useState({ image: '', neighbourhood: '' });
    const [errors, setErrors] = useState('');
    const [modal, setModal] = useState(false);
    const [selectedGallery, setSelectedGallery] = useState(null);

    const toggleModal = () => {
        setModal(!modal);
    };

    // console.log(neighbourhoods);
    const getNeighbourhoodName = id => {
        const res = neighbourhoods.find((neighbourhood) => neighbourhood._id === id);
        return res ? res.name : '';
    }


    const fetchGalleries = async () => {
        try {
            const res = await api.get('/gallery');
            setGalleries(res.data);
        } catch (e) {
            setErrors('There was an error fetching galleries');
        }
    };

    const fetchNeighbourhood = async () => {
        try {
            const res = await api.get('/neighbourhood');
            setNeighbourhood(res.data);
        } catch (e) {
            setErrors('There was an error fetching Neighbourhood');
        }
    };

    useEffect(() => {
        fetchGalleries();
        fetchNeighbourhood()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGallery({
            ...newGallery,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setNewGallery({
            ...newGallery,
            image: e.target.files[0]
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
        const formData = new FormData();
        formData.append('file', newGallery.image);
        formData.append('neighbourhood', newGallery.neighbourhood);

        try {
            const res = await api.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // if (res.status === 200) {
                let url = res.data.url;
                // create gallery
                const gallery = await api.post(`/gallery/create`, {
                    image: url,
                    neighbourhood: newGallery.neighbourhood
                });

            const holder = gallery.data;

                setGalleries([
                    ...galleries,
                    holder
                ]);
                handleClose();

        } catch (e) {
            setErrors(e.response.data.error);
        }
    };


    const handleEdit = (gallery) => {
        setSelectedGallery(gallery);
        setNewGallery({ image: gallery.image, neighbourhood: gallery.neighbourhood });
        toggleModal();
    };

    const handleClose = () => {
        setSelectedGallery(null);
        setNewGallery({ image: '', neighbourhood: '' });
        toggleModal();
    };

    return (
        <section className="h-screen m-5 mx-10">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold">Gallery</h3>
                    <button onClick={toggleModal} className="bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer">
                        + Add New Gallery
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-sm bg-gray-100">
                            <th className="text-left px-4 py-2">Image</th>
                            <th className="text-left px-4 py-2">Neighbourhood</th>
                            <th className="text-right px-4 py-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {galleries.map((gallery) => (
                            <tr className="text-xs border-b" key={gallery._id}>
                                <td className="px-4 py-2 text-left">{gallery.image}</td>
                                <td className="px-4 py-2 text-left">{getNeighbourhoodName(gallery.neighbourhood)}</td>
                                <td className="px-4 py-2 text-right">
                                    <div className="flex justify-end">
                                        <button onClick={() => handleEdit(gallery)} className="px-2 py-1 rounded bg-primary text-white">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(gallery._id)} className="ml-2 px-2 py-1 rounded bg-red-500 text-white">
                                            Remove
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
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white m-2 sm:m-0 w-full sm:w-[35%] rounded-md shadow-lg">
                        <div className="bg-gray-100 p-3 flex items-center">
                            <h2 className="font-extrabold">{selectedGallery ? 'Update Gallery' : 'Create New Gallery'}</h2>
                        </div>
                        <div className="p-3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                                    <label className="block text-sm font-bold mb-2">Image</label>
                                    <input onChange={handleFileChange} type="file" name="file" className="w-full p-2 border rounded" />
                                    <label className="block text-sm font-bold mb-2">Neighbourhood</label>
                                    <select onChange={handleChange} name="neighbourhood" value={newGallery.neighbourhood} className="w-full p-2 border rounded">
                                        <option value="">Select a neighbourhood</option>
                                        {neighbourhoods.map((neighbourhood) => (
                                            <option key={neighbourhood._id} value={neighbourhood._id}>
                                                {neighbourhood.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-2 text-xs">
                                    <button type="button" onClick={handleClose} className="px-3 py-0 rounded bg-gray-100">Close</button>
                                    <button type="submit" className="px-4 py-2 rounded bg-primary text-white">
                                        {selectedGallery ? 'Update Gallery' : 'Create Gallery'}
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
