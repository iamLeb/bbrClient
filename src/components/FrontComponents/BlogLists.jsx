import {IoFolderOpenSharp} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
const BlogLists = () => {

    const navigate = useNavigate();
    const blogs = [
        {
            title: 'We Are Hiring ‘Moderately',
            image: 'https://dreamhomewp.themesflat.com/wp-content/uploads/2024/02/blog8_3.webp',
            createdAt: 'February 29, 2024',
            category: 'Apartments',
            content: 'A “For Sale” sign outside a house in Albany,'
        }, {
            title: 'The is another post',
            image: 'https://dreamhomewp.themesflat.com/wp-content/uploads/2024/02/blog8_3.webp',
            createdAt: 'March 29, 2024',
            category: 'House',
            content: 'This is the content of the second post'
        }, {
            title: 'The is the third post',
            image: 'https://dreamhomewp.themesflat.com/wp-content/uploads/2024/02/blog8_3.webp',
            createdAt: 'January 15, 2024',
            category: 'House',
            content: 'This is the content of the third post'
        }
    ];
    return (
        <section className={'container mx-auto'}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                {blogs.map(blog => (
                    <div key={blog.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img className="w-full h-48 object-cover object-center"
                             src={blog.image}
                             alt="photo"/>
                        <div className="p-6">
                            <ul className={'flex space-x-6 pb-2 text-xs'}>
                                <li>{blog.createdAt}</li>
                                <li>
                                    <div className={'flex space-x-2 items-center'}>
                                        <IoFolderOpenSharp/>
                                        <span>{blog.category}</span>
                                    </div>
                                </li>
                            </ul>
                            <h3 className="font-bold text-2xl">{blog.title}</h3>
                            <p className="overflow-hidden text-ellipsis whitespace-nowrap">{blog.content}</p>
                            <button onClick={() => navigate('/blog/1')} className={'text-primary font-medium pt-5'}>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogLists;