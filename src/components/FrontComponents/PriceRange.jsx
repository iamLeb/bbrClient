import React, {useState} from 'react';

const PriceRange = () => {
    const [value, setValue] = useState(30000);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="flex flex-col ">
            <div className="font-semibold text-md">
                <p>From ${value} - $160,000 </p>
            </div>

            <li className="md:flex-none sw-full">
                <input type="range" min="30000" max="160000" value={value}
                       onChange={handleChange}
                       className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer"
                />
            </li>
        </div>
    );
};

export default PriceRange;
