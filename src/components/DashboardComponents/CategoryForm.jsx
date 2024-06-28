import {useState} from "react";

const CategoryForm = () => {
    const [categories, setCategories] = useState([
        {
            name: "Apartment"
        },
        {
            name: "Bungalow"
        },
        {
            name: "House"
        },
        {
            name: "Office"
        },
        {
            name: "SmartHome"
        },
        {
            name: "Villa"
        },
    ]);


    const addCategory = () => {
        const newCategory = prompt('Enter new category');
        if (newCategory) {
            setCategories([...categories, {name: newCategory}]);
        }
    }

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
        <div className={'flex flex-col space-y-8'}>

            <div className={'flex justify-end p-2 space-x-4 '}>
                <button onClick={addCategory} className={'bg-primary rounded-lg p-4 hover:cursor-pointer'}>+ Add New
                    Category
                </button>

                <button onClick={deleteCategory} className={'bg-primary rounded-lg p-4 hover:cursor-pointer'}>
                    - Delete Category
                </button>
            </div>

            <div>
                <table className={'text-left w-full border-collapse border border-slate-500'}>
                    <thead>
                    <tr>
                        <th className={'p-3 text-3xl border border-slate-600'}>Category</th>
                    </tr>
                    </thead>

                    <tbody className={'text-2xl'}>
                    {categories.map((category, index) => (
                        <tr key={index} className={'border border-slate-700'}>
                            <td className={'p-2'}>{category.name}</td>
                        </tr>
                    ))}

                    {/*<tr className={'bg-[#dddddd] p-3'}>*/}
                    {/*    <td>Apartment</td>*/}
                    {/*</tr>*/}

                    {/*<tr className={'border border-slate-700 p-3'}>*/}
                    {/*    <td>Bungalow</td>*/}
                    {/*</tr>*/}

                    {/*<tr className={'border border-slate-700 p-3'}>*/}
                    {/*    <td>House</td>*/}
                    {/*</tr>*/}

                    {/*<tr className={'border border-slate-700 p-3'}>*/}
                    {/*    <td>Office</td>*/}
                    {/*</tr>*/}

                    {/*<tr className={'border border-slate-700 p-3'}>*/}
                    {/*    <td>SmartHome</td>*/}
                    {/*</tr>*/}

                    {/*<tr className={'border border-slate-700 p-3'}>*/}
                    {/*    <td>Villa</td>*/}
                    {/*</tr>*/}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default CategoryForm;