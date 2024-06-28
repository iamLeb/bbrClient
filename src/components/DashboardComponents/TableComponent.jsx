import React from 'react';

const TableComponent = () => {
    const listings = [
        {
            id:0,
            featured: true,
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$146,000',
            title: 'Lot 6',
            address: '15 Berwick crt, Winnipeg, MB',
            beds: 4,
            baths: 4,
            sqft: 900,
        },
        {
            id:0,
            featured: true,
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$146,000',
            title: 'Lot 6',
            address: '15 Berwick crt, Winnipeg, MB',
            beds: 4,
            baths: 4,
            sqft: 900,
        },
        {
            id:0,
            featured: true,
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$146,000',
            title: 'Lot 6',
            address: '15 Berwick crt, Winnipeg, MB',
            beds: 4,
            baths: 4,
            sqft: 900,
        },
        {
            id:0,
            featured: true,
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            amount: '$146,000',
            title: 'Lot 6',
            address: '15 Berwick crt, Winnipeg, MB',
            beds: 4,
            baths: 4,
            sqft: 900,
        },

    ]
    return (
        <div className='m-3'>
            <div className="bg-white border w-full border-gray-100 shadow-2xl">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold">My listings</h3>
                            <div>
                                <button className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+ Add
                                    New
                                    Category
                                </button>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="sm:flex justify-between items-center">
                                <div className="relative mt-2 sm:mt-0">
                                    <input
                                        placeholder="Search..."
                                        className="py-2 px-10 w-56 outline-none border rounded text-sm"type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead>
                                <tr className="text-center w-full text-[15px] bg-gray-100">
                                    <th className="px-4 py-2 w-1/5 text-center">Title</th>
                                    <th className="px-4 py-2 w-1/5 text-center hidden sm:table-cell">Address</th>
                                    <th className="px-4 py-2 w-1/5 text-center hidden sm:table-cell">Price</th>
                                    <th className="px-4 py-2 w-1/5 text-center hidden sm:table-cell">Created</th>
                                    <th className="px-4 py-2 w-1/5 text-center ">Action</th>
                                </tr>
                                </thead>
                            </table>
            </div>
            {listings.map(feat => (
                <div key={feat.id} className="m-5">
                            <table className='w-full'>
                                <tbody>
                                    <tr className="text-center text-[15px] w-full border-b">
                                        <td className="px-4 py-2 w-1/5 text-center">{feat.title}</td>
                                        <td className=" py-2 w-1/5 text-center hidden sm:table-cell">{feat.address}</td>
                                        <td className="px-4 py-2 w-1/5 text-center hidden sm:table-cell">{feat.amount}</td>
                                        <td className="px-4 py-2 w-1/5 hidden sm:table-cell">
                                            <span className={`px-2 py-1 text-xs font-bold
                                            rounded text-center`}>3
                                            Active
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className={'flex justify-end sm:justify-center sm:block'}>
                                                <button className="px-2 py-1 rounded bg-green-500 text-white text-center">Edit</button>
                                                <button className="ml-2 px-2 py-1 rounded
                                                bg-red-500 text-white text-center">Remove</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                </div>    
            ))}
            <div className="flex justify-end p-4 space-x-2">
                <button className="border px-2 py-1 text-sm
                rounded">Previous</button>
                <button className="border px-2 py-1 text-white bg-purple-900
                text-sm rounded">1</button>
                <button className="border px-2 py-1 text-sm 
                rounded">Next</button>
            </div>
        </div>
        </div>
        
        
        
    );
};

export default TableComponent;