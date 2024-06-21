import React from "react";

const Province = () => {
    return (
        <div className={'flex justify-center items-center'}>
            <li className={'md:flex-none border rounded-lg p-3 w-full'}>
                <select id="province" className={'outline-none w-full text-sm text-gray-500'}>
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

export default Province;