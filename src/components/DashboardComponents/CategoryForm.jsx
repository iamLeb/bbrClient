import {useEffect, useState} from "react";
import api from "../../services/api.js";

const CategoryForm = () => {
    const [errors, setErrors] = useState('');
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({name: ''});
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    }

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
    })

    const handleChange = e => {
        const {name, value} = e.target;

        setNewCategory({
            ...newCategory,
            [name]: value
        });
    };

    const handleDelete = async id => {
        try {
            const res = await api.delete(`/category/${id}`);
            if (res.status === 200) {
                setCategories(categories.filter(category => category._id !== id));
            }
        } catch (e) {
            setErrors('There was an error deleting the category');
        }
    }
    
    const handleSubmit = async e => {
        e.preventDefault();

        if (!newCategory.name) {
            setErrors('Category name is required');
        } else {
            try {
                const res = await api.post('/category/create', newCategory);
                if (res.status === 201) {
                    setCategories([...categories, res.data]);
                    setNewCategory({name: ''});
                    toggleModal();
                }
            } catch (e) {
                setErrors('There was an error creating the category');
            }
        }
    }

    return (
        <section className="h-screen m-5 mx-10">
            <div className="bg-white border border-gray-100 shadow-2xl ">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold">Category</h3>

                    <div>
                        <button onClick={toggleModal}
                                className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+
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
                        {categories.map((category) => (<tr className="text-xs border-b" key={category._id}>
                            <td className="text-left px-4 py-2">{category.name}</td>
                            <td className="px-4 py-2">
                                <div className={'text-right '}>
                                    <button className="px-2 py-1 rounded bg-primary text-white">Edit</button>
                                    <button onClick={() => handleDelete(category._id)} className="ml-2 px-2 py-1 rounded bg-red-500 text-white">Remove
                                    </button>
                                </div>
                            </td>
                        </tr>))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end p-4 space-x-2">
                    <button className="border px-2 py-1 text-sm rounded">Previous</button>
                    <button className="border px-2 py-1 text-white bg-purple-900 text-sm rounded">1</button>
                    <button className="border px-2 py-1 text-sm rounded">Next</button>
                </div>
            </div>


            {modal && <div
                className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 opacity-100`}>
                <div
                    className={`bg-white m-2 sm:m-0 w-full sm:w-[35%] rounded-md shadow-lg transition-transform duration-300 transform`}>
                    <div className="bg-gray-100 p-3 flex items-center">
                        <h2 className="font-extrabold">Create New Category</h2>
                    </div>
                    <div className="p-3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">

                                {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}

                                <label className="block text-sm font-bold mb-2">Category Name</label>
                                <input
                                    onChange={handleChange}
                                    placeholder="enter category name"
                                    type="text"
                                    name="name"
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex justify-end space-x-2 text-xs">
                                <button type="submit"
                                        onClick={toggleModal}
                                        className="px-3 py-0 rounded bg-gray-100">Close
                                </button>
                                <button type="submit" className="px-4 py-2 rounded bg-primary text-white">Create
                                    Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </section>
    );
};

export default CategoryForm;