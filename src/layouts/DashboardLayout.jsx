import React, {useContext, useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import UserContext from "../context/UserContext.js";
import {useNavigate} from "react-router-dom";
import Header from "../components/DashboardComponents/Header.jsx";
import Footer from "../components/DashboardComponents/Footer.jsx";
import Sidebar from "../components/DashboardComponents/Sidebar.jsx";

const DashboardLayout = () => {
    const navigate = useNavigate();

    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }
    const {user} = useContext(UserContext);
    !user && navigate('/auth/login');
    return (
        <div className={'relative lg:static flex'}>
            <div className={'fixed z-10 lg:static lg:z-auto'}>
                <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar}/>
            </div>
            <div className={'flex-1 z-0 lg:z-auto'}>
                <Header sidebar={sidebar} toggleSidebar={toggleSidebar}/>
                <Outlet/>
                {/*<Footer />*/}
            </div>
        </div>
    );
};

export default DashboardLayout;