import React, {useState, useEffect} from "react";
import api from "../../services/api";

const Gallery = () => {
    // State variables
    const [galleries, setGalleries] = useState([]);
    const [neighbourhoods, setNeighbourhoods] = useState([]);
    const [newGallery, setNewGallery] = useState({image: '', neighbourhood: ''});
    const [errors, setErrors] = useState('');
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [galleriesPerPage,setGalleriesPerPage] = useState(5);

    // Fetching galleries and neighbourhoods
    const fetchGalleries = async () => {
        setLoading(true);
        try {
            const res = await api.get('/gallery');
            const galleriesData = res.data;

            const galleriesWithMedia = await Promise.all(galleriesData.map(async (gallery) => {
                const mediaRes = await fetchMedia(gallery._id);
                return {...gallery, media: mediaRes.data};
            }));
            setGalleries(galleriesWithMedia);
        } catch (error) {
            setErrors('There was an error fetching galleries: ' + error.message);
        }finally {
            setLoading(false);
        }
    };

    const fetchMedia = async (ownerId) => {
        try {
            return await api.get(`/media/getMediaForOwner/${ownerId}`);
        } catch (error) {
            setErrors('Error getting Media: ' + error.message);
            return {data: []};
        }
    };

    const fetchNeighbourhoods = async () => {
        try {
            const res = await api.get('/neighbourhood');
            setNeighbourhoods(res.data);
        } catch (error) {
            setErrors('There was an error fetching neighbourhoods: ' + error.message);
        }
    };

    useEffect(() => {
        fetchGalleries();
        fetchNeighbourhoods();
    }, []);

    // Handling form changes and submissions
    const handleChange = (e) => {
        const {name, value} = e.target;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', newGallery.image);
        formData.append('neighbourhood', newGallery.neighbourhood);

        if (!newGallery.image || !newGallery.neighbourhood) {
            setLoading(true)
            setErrors('All Fields are required');
            setLoading(false);
            return;
        }

        try {
            // Upload the file to AWS
            const uploadRes = await api.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const url = uploadRes.data.url; // response url

            // Create the gallery
            const galleryRes = await api.post('/gallery/create', {neighbourhood: newGallery.neighbourhood});
            const galleryId = galleryRes.data._id;

            // Store the URL and gallery ID in the media collection
            await api.post('/media/create', {
                type: 'image',
                url,
                ownerId: galleryId,
                name: 'Gallery',
            });

            fetchGalleries(); // Refresh the galleries list
            setLoading(false);
            handleClose()
            lastPage()
        } catch (error) {
            setErrors('There was a problem creating the gallery: ' + error.message);
        }
    };

    // Deleting gallery
    const handleDelete = async (id) => {
        setLoading(true)
        if (window.confirm("Are you sure you want to delete this gallery?")) {
            try {
                const res = await api.delete(`/gallery/${id}`);
                const gallery = galleries.find((gallery) => gallery._id === id);
                const media = await api.delete(`/media/${gallery.media._id}`);
                if (res.status === 200 && media.status === 200) {
                    setGalleries(galleries.filter(gallery => gallery._id !== id));
                }
            } catch (error) {
                setErrors('There was an error deleting the gallery: ' + error.message);
            }
        }
        setLoading(false)
    };

    // Closing modal
    const handleClose = () => {
        setNewGallery({image: '', neighbourhood: ''});
        toggleModal();
    };

    // Helper function to get neighbourhood name
    const getNeighbourhoodName = (id) => {
        const neighbourhood = neighbourhoods.find((neighbourhood) => neighbourhood._id === id);
        return neighbourhood ? neighbourhood.name : '';
    };

    // Modal toggle function
    const toggleModal = () => {
        setModal(!modal);
    };

    const indexOfLastGallery = currentPage * galleriesPerPage;
    const indexOfFirstGallery = indexOfLastGallery - galleriesPerPage;
    const currentGalleries = galleries.slice(indexOfFirstGallery, indexOfLastGallery);

    const handleNext = () => {
        if (indexOfLastGallery < galleries.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const calculateLastPage = (total, PerPage) => {
        return Math.ceil(total / PerPage);
    };


    const lastPage = () => {
        const lastPage = calculateLastPage(neighbourhoods.length, galleriesPerPage);
        setCurrentPage(lastPage);
    };

    const handleGalleryPerPage = e => {
        setGalleriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

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
        <section className="h-screen m-5 mx-10">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold">Gallery</h3>
                    <button onClick={toggleModal}
                            className="bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer">
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
                        {currentGalleries.map((gallery) => (
                            <tr className="text-xs border-b" key={gallery._id}>
                                <td className="px-4 py-2 text-left">
                                    <div className="overflow-hidden h-9">
                                        <img className="w-full h-full object-center object-cover"
                                             src={gallery.media.url} alt=""/>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-left">{getNeighbourhoodName(gallery.neighbourhood)}</td>
                                <td className="px-4 py-2 text-right">
                                    <div className="flex justify-end">
                                        <button disabled={loading} onClick={() => handleDelete(gallery._id)}
                                                className='px-3 py-2 rounded bg-red-500 text-white flex items-center justify-center'>
                                            <span>Remove</span>
                                            {loading && <span
                                                className='ml-2 animate-spin border-2 border-t-2 border-white border-t-transparent rounded-full w-4 h-4'></span>}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={'flex justify-end'}>
                    <div className="p-4 flex items-center space-x-3">
                        <select
                            value={galleriesPerPage}
                            onChange={handleGalleryPerPage}
                            className="border p-1 rounded"
                        >
                            {[5, 10, 15, 20].map(option => (
                                <option key={option} value={option}>
                                    {option + ' per page'}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end p-4 space-x-2">
                        <button onClick={handlePrevious} disabled={currentPage === 1}
                                className="border px-2 py-1 text-sm rounded">Previous
                        </button>
                        <span className="border px-2 py-1 text-sm rounded">{currentPage}</span>
                        <button onClick={handleNext} disabled={indexOfLastGallery >= galleries.length}
                                className="border px-2 py-1 text-sm rounded">Next
                        </button>
                    </div>
                </div>

            </div>
            {modal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white m-2 sm:m-0 w-full sm:w-[35%] rounded-md shadow-lg">
                        <div className="bg-gray-100 p-3 flex items-center">
                            <h2 className="font-extrabold">Create New Gallery</h2>
                        </div>
                        <div className="p-3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                                    <label className="block text-sm font-bold mb-2">Image</label>
                                    <input onChange={handleFileChange} type="file" name="file"
                                           className="w-full p-2 border rounded"/>
                                    <label className="block text-sm font-bold mb-2">Neighbourhood</label>
                                    <select onChange={handleChange} name="neighbourhood"
                                            value={newGallery.neighbourhood} className="w-full p-2 border rounded">
                                        <option value="">Select a neighbourhood</option>
                                        {neighbourhoods.map((neighbourhood) => (
                                            <option key={neighbourhood._id} value={neighbourhood._id}>
                                                {neighbourhood.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-2 text-xs">
                                    <button type="button" onClick={handleClose}
                                            className="px-3 py-0 rounded bg-gray-100">Close
                                    </button>
                                    <button type='submit'
                                            disabled={loading}
                                            className='px-3 py-2 rounded bg-primary text-white flex items-center justify-center'>
                                        <span>Create Gallery</span>
                                        {loading && <span
                                            className='ml-2 animate-spin border-2 border-t-2 border-white border-t-transparent rounded-full w-4 h-4'></span>}
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
