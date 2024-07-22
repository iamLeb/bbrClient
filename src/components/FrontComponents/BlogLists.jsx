import {IoFolderOpenSharp} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import GlobalContext from "../../context/Global.js";

const BlogLists = () => {

    const navigate = useNavigate();
    const {blogs, getName, loading, format} = useContext(GlobalContext);

    return (
        <section className={'container mx-auto'}>
            <div className={'p-3 gap-4 text-center'}>
                <h1 className={'font-bold text-3xl sm:text-4xl'}>Blogs</h1>
                <p className={'font-light text-sm'}>Dive into our blog for the latest news, tips, and stories about home buying and selling.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                {blogs.map(blog => (
                    <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img className="w-full h-48 object-cover object-center"
                             src={blog.url}
                             alt="photo"/>
                        <div className="p-6">
                            <ul className={'flex space-x-6 pb-2 text-xs'}>
                                <li>{format(blog.createdAt)}</li>
                                <li>
                                    <div className={'flex space-x-2 items-center'}>
                                        <IoFolderOpenSharp/>
                                        <span>{getName(blog.category)}</span>
                                    </div>
                                </li>
                            </ul>
                            <h3 onClick={() => navigate(blog._id)}
                                className="font-bold text-2xl cursor-pointer">{blog.title}</h3>
                            <p className="overflow-hidden text-ellipsis whitespace-nowrap">{blog.content}</p>
                            <button onClick={() => navigate(blog._id)}
                                    className={'text-primary font-medium pt-5'}>Read
                                More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogLists;