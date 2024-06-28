import {useState} from "react";

const CategoryForm = () => {
    const [categories, setCategories] = useState([
        {
            name: "Apartment",
            dateCreated: new Date()
        },
        {
            name: "Bungalow",
            dateCreated: new Date()
        },
        {
            name: "House",
            dateCreated: new Date()
        },
        {
            name: "Office",
            dateCreated: new Date()
        },
        {
            name: "SmartHome",
            dateCreated: new Date()
        },
        {
            name: "Villa",
            dateCreated: new Date()
        },
    ]);


    const addCategory = () => {
        const newCategory = prompt('Enter new category');
        if (newCategory) {
            setCategories([...categories, { name: newCategory, dateCreated: new Date() }]);
        }
    };

    const deleteCategory = () => {
        const newCategory = prompt('Name of Category to delete');
        const exist = categories.find(category => category.name === newCategory);

        if (exist) {
                setCategories(categories.filter(category => category.name !== newCategory));
        } else {
            alert('Category not found');
        }
    }

    return (
        <div className={'flex flex-col space-y-4 pl-20'}>

            <div className={'flex justify-end p-2 space-x-4 '}>
                <button onClick={addCategory} className={'bg-primary rounded-lg p-4 hover:cursor-pointer'}>+ Add New
                    Category
                </button>

                <button onClick={deleteCategory} className={'bg-primary rounded-lg p-4 hover:cursor-pointer'}>
                    - Delete Category
                </button>
            </div>

            <div className={'bg-white flex flex-col w-4/5 p-8 shadow shadow-lg shadow-black rounded-lg'}>
                {/*header*/}
                <div>
                   <h4 className={'text-3xl'}>Category</h4>
                </div>

                {/*body*/}
                <div >
                    <table className={'border-collapse border border-slate-500'}>
                        <thead>
                        <tr>
                            <th className={'p-3 text-3xl border border-slate-600'}>Name</th>
                            <th className={'p-3 text-3xl border border-slate-600'}>Date Created</th>
                            <th className={'p-3 text-3xl border border-slate-600'}>Action</th>
                        </tr>
                        </thead>

                        <tbody className={'text-2xl'}>
                        {categories.map((category, index) => (
                            <tr key={index}>
                                <td className={'border border-slate-700 p-2'}>{category.name}</td>
                                <td className={'border border-slate-700 p-2'}>{category.dateCreated.toLocaleString()}</td>
                                <td className={'border border-slate-700 p-2'}>Button</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <section className="h-screen m-5">
                <div className="bg-white border border-gray-100 shadow-2xl">
                    <div className="p-4 border-b">
                        <h3 className="font-bold">Add, Edit & Remove</h3>
                    </div>
                    <div className="p-3">
                        <div className="sm:flex justify-between items-center">
                            <div className="relative mt-2 sm:mt-0">
                                <input
                                    placeholder="Search..."
                                    className="py-2 px-10 w-56 outline-none border
rounded text-sm"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                            <tr className="text-center text-sm bg-gray-100">
                                <th className="px-4 py-2">PostID</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Published</th>
                                <th className="px-4 py-2">Created</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="text-center text-xs border-b">
                                <td className="px-4 py-2">bla</td>
                                <td className="px-4 py-2 truncate">bla</td>
                                <td className="px-4 py-2">img</td>
                                <td className="px-4 py-2">
 <span
     className={`px-2 py-1 text-xs font-bold
rounded `}>
 Active
 </span>
                                </td>
                                <td className="px-4 py-2"></td>
                                <td className="px-4 py-2">
                                    <div className={'flex sm:block'}>
                                        <button className="px-2 py-1 rounded bggreen-500 text-white">Edit</button>
                                        <button className="ml-2 px-2 py-1 rounded
bg-red-500 text-white">Remove</button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end p-4 space-x-2">
                        <button className="border px-2 py-1 text-sm
rounded">Previous</button>
                        <button className="border px-2 py-1 text-white bg-purple-900
text-sm rounded">1</button>
                        <button className="border px-2 py-1 text-sm
rounded">Next</button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CategoryForm;