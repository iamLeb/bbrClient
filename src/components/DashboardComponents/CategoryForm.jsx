import React, {useContext, useEffect, useState} from "react";
import GlobalContext from "../../context/Global.js";
import api from "../../services/api.js";

const CategoryForm = () => {
    const {categories, setCategories} = useContext(GlobalContext);
    const [errors, setErrors] = useState('');
    const [newCategory, setNewCategory] = useState({name: ''});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage, setCategoriesPerPage] = useState(5);

    const toggleModal = () => {
        setModal(!modal);
        setErrors('');
    };

    const fetchCategories = async () => {
        try {
            const res = await api.get('/category');
            setCategories(res.data);
        } catch (error) {
            setErrors('There was an error fetching categories');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = e => {
        const {name, value} = e.target;
        setNewCategory({
            ...newCategory,
            [name]: value
        });
    };

    const handleDelete = async id => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            setLoading(true);
            try {
                const res = await api.delete(`/category/${id}`);
                if (res.status === 200) {
                    setLoading(false);
                    fetchCategories();
                }
            } catch (e) {
                setErrors('There was an error deleting the category');
            }
            setLoading(false);
        }
    };

    const handleSubmit = async e => {
        setLoading(true);
        e.preventDefault();
        if (!newCategory.name) {
            setErrors('Category name is required');
        } else {
            try {
                if (selectedCategory) {
                    // Update category
                    const res = await api.put(`/category/${selectedCategory._id}`, newCategory);
                    if (res.status === 200) {
                        setCategories(categories.map(category => category._id === selectedCategory._id ? res.data : category));
                        setSelectedCategory(null);
                    }
                } else {
                    // Create category
                    const res = await api.post('/category/create', newCategory);
                    if (res.status === 201) {
                        setCategories([...categories, res.data]);
                    }
                }
                setNewCategory({name: ''});
                toggleModal();
                lastPage();

            } catch (e) {
                setErrors(e.response.data.error);
            }
        }
        setLoading(false);
    };

    const handleEdit = category => {
        setLoading(true);
        setSelectedCategory(category);
        setNewCategory({name: category.name});
        toggleModal();
        setLoading(false);
    };

    const handleClose = () => {
        setSelectedCategory(null);
        setNewCategory({name: ''});
        toggleModal();
    };

    // Update pagination logic to use categoriesPerPage
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const handleNext = () => {
        if (indexOfLastCategory < categories.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const calculateLastPage = (totalCategories, categoriesPerPage) => {
        return Math.ceil(totalCategories / categoriesPerPage);
    };

    const lastPage = () => {
        const lastPage = calculateLastPage(categories.length+1, categoriesPerPage);
        setCurrentPage(lastPage);
    };

    const handleCategoriesPerPageChange = e => {
        setCategoriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <section className="h-screen m-5 mx-10">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold">Category </h3>
                    {loading ? 'loading...' : ''}
                    <div>
                        <button onClick={toggleModal}
                                className="bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer">+
                            Add New Category
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
                        {currentCategories.map((category) => (
                            <tr className="text-xs border-b" key={category._id}>
                                <td className="text-left px-4 py-2">{category.name}</td>
                                <td className="px-4 py-2">
                                    <div className="text-right">
                                        <button onClick={() => handleEdit(category)}
                                                className="px-2 py-1 rounded bg-primary text-white">Edit
                                        </button>
                                        <button onClick={() => handleDelete(category._id)}
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
                            value={categoriesPerPage}
                            onChange={handleCategoriesPerPageChange}
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
                        <button onClick={handleNext} disabled={indexOfLastCategory >= categories.length}
                                className="border px-2 py-1 text-sm rounded">Next
                        </button>
                    </div>
                </div>
            </div>
            {modal && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">
                    <div
                        className="bg-white m-2 sm:m-0 w-full sm:w-[35%] rounded-md shadow-lg transition-transform duration-300 transform">
                        <div className="bg-gray-100 p-3 flex items-center">
                            <h2 className="font-extrabold">{selectedCategory ? 'Update Category' : 'Create New Category'}</h2>
                        </div>
                        <div className="p-3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                                    <label className="block text-sm font-bold mb-2">Category Name</label>
                                    <input
                                        onChange={handleChange}
                                        value={newCategory.name}
                                        placeholder="Enter category name"
                                        type="text"
                                        name="name"
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 text-xs">
                                    <button type="button" onClick={handleClose}
                                            className="px-3 py-0 rounded bg-gray-100">Close
                                    </button>
                                    <button type="submit"
                                            className="px-4 py-2 rounded bg-primary text-white">{selectedCategory ? 'Update Category' : 'Create Category'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CategoryForm;
