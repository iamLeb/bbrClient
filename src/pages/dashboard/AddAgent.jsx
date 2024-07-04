import React from 'react';
import CategoryForm from "../../components/DashboardComponents/CategoryForm.jsx";

const AddAgent = () => {
    return (
        <div className='m-5 border rounded-b-lg'>
             <div className='bg-gray-100 p-3 font-extrabold text-center'>
                Add an agent
            </div>
            <form>
                <div className='p-3 flex flex-col'>
                    <div className='font-bold mb-3'>Name</div>
                    <p className="text-red-500 text- mt-2"></p>
                    <input  name='title'
                     type='text' 
                    placeholder='enter the name of the agent' className='p-3 border rounded-lg' />
                </div>
            </form>

        </div>
    );
};

export default AddAgent;