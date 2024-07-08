import React from 'react';
import {GoArrowRight} from "react-icons/go";

const ViewMore = () => {
    return (
        <div className={'flex justify-center items-center pt-5'}>
            <button className="flex items-center space-x-4 bg-primary px-6 py-4 rounded-full text-white font-bold">
                <span>View More</span>
                <GoArrowRight/>
            </button>
        </div>
    );
};

export default ViewMore;