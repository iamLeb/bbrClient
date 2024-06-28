import {useState} from "react";

const Province = () => {
    const [categories, setCategories] = useState([
        {
            name: "Alberta"
        },
        {
            name: "British Columbia"
        },
        {
            name: "Manitoba"
        },
        {
            name: "New Brunswick"
        },
        {
            name: "Newfoundland and Labrador"
        },
        {
            name: "Nova Scotia"
        },
        {
            name: "Ontario"
        },
        {
            name: "Prince Edward Island"
        },
        {
            name: "Quebec"
        },
        {
            name: "Saskatchewan"
        },
    ]);
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    }
    const addCategory = () => {
        const newCategory = prompt('Enter new category');

        console.log(newCategory);
    };

    const deleteCategory = (categoryName) => {
        const exist = categories.find(category => category.name === categoryName);
        if (exist) {
            setCategories(categories.filter(category => category.name !== categoryName));
        } else {
            alert('Category1 not found');
        }
    };

    return (
        <section className="h-screen m-5">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold">Province</h3>

                    <div>
                        <button onClick={toggleModal}
                                className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+
                            Add
                            New
                            Province
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-left text-sm bg-gray-100">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {categories.map((category, index) => (<tr className="text-center text-xs border-b" key={index}>
                            <td className="px-4 py-2 text-left">{category.name}</td>
                            {/*<td className="px-4 py-2 truncate">{category.dateCreated.toLocaleString()}</td>*/}
                            <td className="px-4 py-2">
                                <div className={'flex sm:block text-left'}>
                                    <button className="px-2 py-1 rounded bg-primary text-white">Edit</button>
                                    <button onClick={() => deleteCategory(category.name)}
                                            className="ml-2 px-2 py-1 rounded bg-red-500 text-white">Remove
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
                        <h2 className="font-extrabold">Create New Province</h2>
                    </div>
                    <div className="p-3">
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Province Name</label>
                                <input
                                    required={true}
                                    placeholder="enter province name"
                                    type="text"
                                    name="name"
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex justify-end space-x-2 text-xs">
                                <button type="button"
                                        onClick={toggleModal}
                                        className="px-3 py-0 rounded bg-gray-100">Close
                                </button>
                                <button type="submit" className="px-4 py-2 rounded bg-primary text-white">Create
                                    Province
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </section>
    );
};

export default Province;