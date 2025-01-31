import React, {useState, useEffect} from "react";
import api from "../../services/api.js";

const Neighbourhood = () => {
    const [neighbourhoods, setNeighbourhoods] = useState([]);
    const [newNeighbourhood, setNewNeighbourhood] = useState({name: ''});
    const [errors, setErrors] = useState('');
    const [selectedNeighbourhood, setSelectedNeighbourhood] = useState(null); // State for the selected neighbourhood
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [neighbourhoodPerPage, setNeighbourhoodPerPage] = useState(5);

    const toggleModal = () => {
        setModal(!modal);
        setErrors('');
    }

    const fetchNeighbourhoods = async () => {
        try {
            const res = await api.get('/neighbourhood');
            setNeighbourhoods(res.data);
        } catch (e) {
            setErrors('There was an error fetching neighbourhoods');
        }
    }

    useEffect(() => {
        fetchNeighbourhoods()
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setNewNeighbourhood({
            ...newNeighbourhood,
            [name]: value
        });
    }

    const handleDelete = async id => {
        if (window.confirm("Are you sure you want to delete this neighbourhood?")) {
            setLoading(true);
            try {
                const res = await api.delete(`/neighbourhood/${id}`);
                if (res.status === 200) {
                    setNeighbourhoods(neighbourhoods.filter(neighbourhood => neighbourhood._id !== id));
                }
            } catch (e) {
                setErrors('There was an error deleting the neighbourhood');
            }
            setLoading(false)
        }
    }

    const handleClose = () => {
        setSelectedNeighbourhood(null)
        setNewNeighbourhood({name: ''});
        toggleModal();
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!newNeighbourhood.name) {
            setErrors('Neighbourhood name is required');
        } else {
            try {
                if (selectedNeighbourhood) {
                    // Update category
                    const res = await api.put(`/neighbourhood/${selectedNeighbourhood._id}`, newNeighbourhood);
                    if (res.status === 200) {
                        setNeighbourhoods(neighbourhoods.map(neighbourhood => neighbourhood._id === selectedNeighbourhood._id ? res.data : neighbourhood));
                        setSelectedNeighbourhood(null);
                    }
                } else {
                    const res = await api.post('/neighbourhood/create', newNeighbourhood);
                    if (res.status === 201) {
                        setNeighbourhoods([...neighbourhoods, res.data]);
                    }
                }
                setNewNeighbourhood({name: ''});
                toggleModal();
                lastPage()
            } catch (e) {
                setErrors(e.response.data.error);
            }
        }
        setLoading(false)
    }

    const handleEdit = neighbourhood => {
        setLoading(true)
        setSelectedNeighbourhood(neighbourhood);
        setNewNeighbourhood({name: neighbourhood.name});
        toggleModal();
        setLoading(false)
    };


    const indexOfLastNeighbourhood = currentPage * neighbourhoodPerPage;
    const indexOfFirstNeighbourhood = indexOfLastNeighbourhood - neighbourhoodPerPage;
    const currentNeighbourhood = neighbourhoods.slice(indexOfFirstNeighbourhood, indexOfLastNeighbourhood);

    const handleNext = () => {
        if (indexOfLastNeighbourhood < neighbourhoods.length) {
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
        const lastPage = calculateLastPage(neighbourhoods.length+1, neighbourhoodPerPage);
        setCurrentPage(lastPage);
    };

    const handleNeighbourhoodPerPage = e => {
        setNeighbourhoodPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <section className="h-screen m-5 mx-10">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold">Neighbourhood</h3>
                    {loading ? 'loading...' : ''}
                    <div>
                        <button onClick={toggleModal}
                                className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+
                            Add New
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-sm bg-gray-100">
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="text-right px-4 py-2">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {currentNeighbourhood.map((neighbourhood) => (
                            <tr className="text-xs border-b" key={neighbourhood._id}>
                                <td className="px-4 py-2 text-left">{neighbourhood.name}</td>
                                <td className="px-4 py-2">
                                    <div className={'text-right flex justify-end'}>
                                        <button onClick={() => handleEdit(neighbourhood)}
                                                className="px-2 py-1 rounded bg-primary text-white">Edit
                                        </button>
                                        <button onClick={() => handleDelete(neighbourhood._id)}
                                                className="ml-2 px-2 py-1 rounded bg-red-500 text-white">Remove
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
                            value={neighbourhoodPerPage}
                            onChange={handleNeighbourhoodPerPage}
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
                        <button onClick={handleNext} disabled={indexOfLastNeighbourhood >= neighbourhoods.length}
                                className="border px-2 py-1 text-sm rounded">Next
                        </button>
                    </div>
                </div>
            </div>

            {modal && (
                <div
                    className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 opacity-100`}>
                    <div
                        className={`bg-white m-2 sm:m-0 w-full sm:w-[35%] rounded-md shadow-lg transition-transform duration-300 transform`}>
                        <div className="bg-gray-100 p-3 flex items-center">
                            <h2 className="font-extrabold">{selectedNeighbourhood ? 'Update Neighbourhood' : 'Create New Neighbourhood'}</h2>
                        </div>
                        <div className="p-3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                                    <label className="block text-sm font-bold mb-2">Neighbourhood Name</label>
                                    <input
                                        onChange={handleChange}
                                        placeholder="enter neighbourhood name"
                                        type="text"
                                        name="name"
                                        value={newNeighbourhood.name} // Clear the input after submission
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 text-xs">
                                    <button type="button" onClick={handleClose}
                                            className="px-3 py-0 rounded bg-gray-100">Close
                                    </button>
                                    <button type="submit"
                                            className="px-4 py-2 rounded bg-primary text-white">{selectedNeighbourhood ? 'Update Neighbourhood' : 'Create Neighbourhood'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Neighbourhood;
