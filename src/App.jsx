// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import FrontLayout from './layouts/FrontLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Home from './pages/front/Home.jsx';
import PageNotFound from './pages/front/errors/PageNotFound.jsx';
import About from './pages/front/About.jsx';
import Index from './pages/front/properties/Index.jsx';
import BlogSingle from './pages/front/blog/Single.jsx';
import Blog from './pages/dashboard/Blog.jsx';
import Single from './pages/front/properties/Single.jsx';
import Login from './pages/front/auth/Login.jsx';
import Forgot from './pages/front/auth/Forgot.jsx';
import Reset from './pages/front/auth/Reset.jsx';
import Register from './pages/front/auth/Register.jsx';
import ContactUs from './pages/front/ContactUs.jsx';
import Admin from './pages/dashboard/Admin.jsx';
import UserContext from './context/UserContext';
import api from './services/api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get('/auth/check');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, []);

  return (
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<FrontLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogSingle />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="properties/listing" element={<Index />} />
              <Route path="properties/listing/1" element={<Single />} />
              <Route path="auth/login" element={<Login />} />
              <Route path="auth/forgot" element={<Forgot />} />
              <Route path="auth/reset" element={<Reset />} />
              <Route path="auth/register" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>

            {user && (
                <Route path="/secure" element={<DashboardLayout />}>
                  <Route index element={<Admin />} />
                  <Route path={'blog'} element={<Blog />} />
                </Route>
            )}

            {!user && (
                <Route path="/secure" element={<Navigate to="/auth/login" replace />} />
            )}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
