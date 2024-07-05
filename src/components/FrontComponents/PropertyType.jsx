import {useContext} from "react";
import GlobalContext from "../../context/Global.js";

const PropertyType = () => {
    const {categories} = useContext(GlobalContext);
    return (
        <div className={'flex justify-center items-center'}>
            <li className={'border rounded-lg p-3 w-full'}>
                <select id="propType" className={'outline-none w-full text-sm text-gray-500'}>
                    <option value="">Property Type</option>
                    {categories.map(category => (
                        <option key={category._id} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </li>
        </div>
    )
}

export default PropertyType;