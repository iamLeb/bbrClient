import React from "react";

const PropertyType = () => {
    return (
        <div className={'flex justify-center items-center'}>
            <li className={'border rounded-lg p-3 w-full'}>
                <select id="propType" className={'outline-none w-full text-sm text-gray-500'}>
                    <option value="">Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="house">House</option>
                    <option value="office">Office</option>
                    <option value="smartHome">SmartHome</option>
                    <option value="villa">Villa</option>
                </select>
            </li>
        </div>
    )
}

export default PropertyType;