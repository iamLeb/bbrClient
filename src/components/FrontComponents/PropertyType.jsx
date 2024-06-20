import React from "react";

const PropertyType = () => {
    return (
        <div className={'flex justify-center items-center gap-2 p-5'}>
            <li className={'md:flex-none border rounded-lg p-2 w-1/2'}>
                <select id="propType" className={'outline-none w-full'}>
                    <option value="">Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="house">House</option>
                    <option value="office">Office</option>
                    <option value="smartHome">SmartHome</option>
                    <option value="villa">Villa</option>
                </select>
            </li>

            <li className={'md:flex-none border rounded-lg p-2 w-1/2'}>
                <select id="province" className={'outline-none w-full'}>
                    <option value="">Province</option>
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                </select>
            </li>

        </div>
    )
}

export default PropertyType;