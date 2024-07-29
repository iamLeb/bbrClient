import {useContext, useEffect, useRef, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Header from '../components/DashboardComponents/Header.jsx';
import Sidebar from '../components/DashboardComponents/Sidebar.jsx';
import UserContext from "../context/UserContext.js";

const DashboardLayout = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const sidebarRef = useRef(null);
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    useEffect(() => {

        if (!user) navigate('/auth/login');
        // Function to handle clicks outside of sidebar
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setSidebar(false); // Close sidebar if click is outside
            }
        };

        // Adding event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Cleaning up event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative lg:static flex">
            <div className="fixed z-10 lg:static lg:z-auto" ref={sidebarRef}>
                <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} />
            </div>
            <div className="flex-1 z-0 lg:z-auto">
                <Header sidebar={sidebar} toggleSidebar={toggleSidebar} />
                <Outlet />
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default DashboardLayout;
