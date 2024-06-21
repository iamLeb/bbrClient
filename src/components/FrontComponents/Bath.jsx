import React from "react";

const Bath = () => {
    return (
        <div className={'flex justify-center items-center'}>
            <li className={'md:flex-none border rounded-lg p-3 w-full'}>
                <select id="bath" className={'outline-none w-full text-sm text-gray-500'}>
                    <option value="">Baths</option>
                    <option value="bath1">1</option>
                    <option value="bath2">2</option>
                    <option value="bath3">3</option>
                    <option value="bath4">4</option>
                    <option value="bath5">5</option>
                    <option value="bath6">6</option>
                    <option value="bath7">7</option>
                    <option value="bath8">8</option>
                    <option value="bath9">9</option>
                    <option value="bath10">10</option>
                </select>
            </li>
        </div>
    )
}

export default Bath;