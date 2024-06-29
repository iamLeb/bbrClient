import React from 'react';

const Gallery = () => {
    return (
        <section className="h-screen m-5">
            <div className="bg-white border border-gray-100 shadow-2xl">
                <div className="p-4 border-b"><h3 className="font-bold">Add, Edit & Remove</h3></div>
                <div className="p-3">
                    <div className="sm:flex justify-between items-center">
                        <div className="relative mt-2 sm:mt-0">
                            <input placeholder="Search..."
                                   className="py-2 px-10 w-56 outline-none border rounded text-sm" type="text"/>
                        </div>
                        <button className={'bg-primary rounded-lg text-white text-sm px-3 py-2 hover:cursor-pointer'}>+
                            Create New Blog
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                        <tr className="text-center text-sm bg-gray-100">
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Content</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Created</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="text-center text-xs border-b">
                            <td className="px-4 py-2">Post One</td>
                            <td className="px-4 py-2 truncate">content for post one</td>
                            <td className="px-4 py-2">img.png</td>
                            <td className="px-4 py-2">
                                <span className={`px-2 py-1 text-xs font-bold rounded `}>Apartment</span>
                            </td>
                            <td className="px-4 py-2">
                                <span>
                                    Jan 15, 2024
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className={'flex sm:block'}>
                                    <button className="px-2 py-1 rounded bg-green-500 text-white">Edit</button>
                                    <button className="ml-2 px-2 py-1 rounded bg-red-500 text-white">Remove</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end p-4 space-x-2">
                    <button className="border px-2 py-1 text-sm rounded">Previous</button>
                    <button className="border px-2 py-1 text-white bg-purple-900 text-sm rounded">1</button>
                    <button className="border px-2 py-1 text-sm rounded">Next</button>
                </div>
            </div>
        </section>
    );
};

export default Gallery;