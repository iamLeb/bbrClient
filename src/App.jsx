import {BrowserRouter, Route, Routes} from "react-router-dom";
import FrontLayout from "./layouts/FrontLayout.jsx";
import Home from "./pages/front/Home.jsx";
import PageNotFound from "./pages/front/errors/PageNotFound.jsx";
import About from "./pages/front/About.jsx";
import Index from "./pages/front/properties/index.jsx";
import BlogSingle from "./pages/front/blog/Single.jsx";
import Blog from "./pages/front/blog/Blog.jsx";
import Single from "./pages/front/properties/Single.jsx";
import Login from "./pages/front/auth/Login.jsx";
import Forgot from "./pages/front/auth/Forgot.jsx";
import Reset from "./pages/front/auth/Reset.jsx";
import Register from "./pages/front/auth/register.jsx";
import ContactUs from "./pages/front/ContactUs.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Admin from "./pages/dashboard/Admin.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route index element={<Home />} />
            {/*Route Example*/}
            {/*  <Route path={'/about'} element={<About />} />*/}
            {/*Route Example Ends*/}
              <Route path={'/about'} element={<About />} />
              <Route path={'/blog'} element={<Blog />} />
              <Route path={'/blog/:id'} element={<BlogSingle />} />
              <Route path={'/contact'} element={<ContactUs />} />
              <Route path={'/properties/listing'} element={<Index />} />
              <Route path={'/properties/listing/1'} element={<Single />} />
              <Route path={'/auth/login'} element={<Login />} />
              <Route path={'/auth/forgot'} element={<Forgot />} />
              <Route path={'/auth/reset'} element={<Reset />} />
              <Route path={'/auth/register'} element={<Register />} />
            {/*Page Not Found*/}
            <Route path={'*'} element={<PageNotFound />} />
          </Route>


          <Route path="/secure" element={<DashboardLayout />}>
            <Route index element={<Admin />} />

          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
