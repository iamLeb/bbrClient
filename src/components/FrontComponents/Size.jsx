import React, {useState} from 'react';

const Size = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="flex flex-col ">
            <div className="font-semibold text-md">
                <p>Size {value} - 5,000 </p>
            </div>

            <li className="md:flex-none sw-full">
                <input type="range" min="0" max="5000" value={value}
                       onChange={handleChange}
                       className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer"
                />
            </li>
        </div>
    );
};

export default Size;
