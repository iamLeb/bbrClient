import {useState} from "react";

const CategoryForm = () => {
    const [categories, setCategories] = useState([
        {
            name: "Apartment", dateCreated: new Date()
        },
        {
            name: "Bungalow", dateCreated: new Date()
        },
        {
            name: "House", dateCreated: new Date()
        },
        {
            name: "Office", dateCreated: new Date()
        },
        {
            name: "SmartHome", dateCreated: new Date()
        },
        {
            name: "Villa", dateCreated: new Date()
        },
    ]);

    const addCategory = () => {
        const newCategory = prompt('Enter new category');
        if (newCategory) {
            setCategories([...categories, {name: newCategory, dateCreated: new Date()}]);
        }
    };

    const deleteCategory = (categoryName) => {
        const exist = categories.find(category => category.name === categoryName);
        if (exist) {
            setCategories(categories.filter(category => category.name !== categoryName));
        } else {
            alert('Category not found');
        }
    };

    return (
        <section className="h-screen m-5">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold">Category</h3>

                    <div>
                        <button onClick={addCategory} className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+ Add
                            New
                            Category
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-center text-sm bg-gray-100">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Created</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {categories.map((category, index) => (<tr className="text-center text-xs border-b" key={index}>
                            <td className="px-4 py-2">{category.name}</td>
                            <td className="px-4 py-2 truncate">{category.dateCreated.toLocaleString()}</td>
                            <td className="px-4 py-2">
                                <div className={'flex sm:block'}>
                                    <button className="px-2 py-1 rounded bg-green-500 text-white">Edit</button>
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
        </section>
    );
};

export default CategoryForm;