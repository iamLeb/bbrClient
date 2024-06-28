import React, {useContext, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import UserContext from "../context/UserContext.js";
import {useNavigate} from "react-router-dom";
import Header from "../components/DashboardComponents/Header.jsx";
import Footer from "../components/DashboardComponents/Footer.jsx";
import Sidebar from "../components/DashboardComponents/Sidebar.jsx";

const DashboardLayout = () => {
    const navigate = useNavigate();

    const {user} = useContext(UserContext);
    !user && navigate('/auth/login');
    return (
        <div className={'flex'}>
            <Sidebar />
            <div className={'flex-1'}>
                <Header />
                    <Outlet />
                {/*<Footer />*/}
            </div>
        </div>
    );
};

export default DashboardLayout;