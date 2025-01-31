import {useState, useEffect, useContext} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FrontLayout from "./layouts/FrontLayout.jsx";
import Home from "./pages/front/Home.jsx";
import PageNotFound from "./pages/front/errors/PageNotFound.jsx";
import About from "./pages/front/About.jsx";
import Index from "./pages/front/properties/Index.jsx";
import BlogSingle from "./pages/front/blog/Single.jsx";
import Blog from "./pages/dashboard/blog/Blog.jsx";
import BlogFront from "./pages/front/blog/Blog.jsx";
import Single from "./pages/front/properties/Single.jsx";
import Login from "./pages/front/auth/Login.jsx";
import Forgot from "./pages/front/auth/Forgot.jsx";
import Reset from "./pages/front/auth/Reset.jsx";
import Register from "./pages/front/auth/Register.jsx";
import ContactUs from "./pages/front/ContactUs.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Create from "./pages/dashboard/blog/Create.jsx";
import Admin from "./pages/dashboard/Admin.jsx";
import Categories from "./pages/dashboard/Categories.jsx";
import Neighbourhood from "./pages/dashboard/Neighbourhood.jsx";
import Properties from "./pages/dashboard/property/Properties.jsx";
import AddProperty from "./pages/dashboard/property/AddProperty.jsx";
import Gallery from "./pages/dashboard/Gallery.jsx";
import Profile from "./pages/dashboard/Profile.jsx";
import Contact from "./pages/dashboard/Contact.jsx";
import Testimonial from "./pages/dashboard/Testimonial.jsx";
import AddAgent from "./pages/dashboard/AddAgent.jsx";
import GlobalContext from "./context/Global.js";
import Preloader from "./components/Preloader.jsx"; // Import Preloader component
import ScrollToTop from "./components/ScrollToTop.js";
import Availability from "./pages/dashboard/Availability/Availability.jsx";
import EditProperty from "./pages/dashboard/property/EditProperty.jsx";
import Edit from "./pages/dashboard/blog/Edit.jsx";

function App() {
    const {loading} = useContext(GlobalContext);
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPreloader(false);
        }, 1500); // Display preloader for 3 seconds

        return () => clearTimeout(timer);
    }, []);
    return (
        <BrowserRouter>
            <ScrollToTop/>
            {loading || showPreloader ? (
                <Preloader/> // Use Preloader component
            ) : (
                <Routes>
                    <Route path="/" element={<FrontLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path={"/about"} element={<About/>}/>
                        <Route path={"/blog"} element={<BlogFront/>}/>
                        <Route path={"/blog/:id"} element={<BlogSingle/>}/>
                        <Route path={"/contact"} element={<ContactUs/>}/>
                        <Route path={"/properties/listing"} element={<Index/>}/>
                        <Route path={"/properties/listing/:id"} element={<Single/>}/>
                        <Route path={"/auth/login"} element={<Login/>}/>
                        <Route path={"/auth/forgot"} element={<Forgot/>}/>
                        <Route path={"/auth/reset"} element={<Reset/>}/>
                        <Route path={"/auth/register"} element={<Register/>}/>
                        <Route path={"*"} element={<PageNotFound/>}/>
                    </Route>
                    <Route path="/secure" element={<DashboardLayout/>}>
                        <Route index element={<Admin/>}/>
                        <Route path={'category'} element={<Categories/>}/>
                        <Route path={'blog'} element={<Blog/>}/>
                        <Route path={'blog/create'} element={<Create/>}/>
                        <Route path={'blog/edit/:id'} element={<Edit/>}/>
                        <Route path={'neighbourhoods'} element={<Neighbourhood/>}/>
                        <Route path={'contacts'} element={<Contact/>}/>
                        <Route path={'testimonials'} element={<Testimonial/>}/>
                        <Route path={'profile'} element={<Profile/>}/>
                        <Route path={'availability'} element={<Availability/>}/>
                        <Route path={'listings'} element={<Properties/>}/>
                        <Route path={'listings/add'} element={<AddProperty/>}/>
                        <Route path={'listings/edit/:id'} element={<EditProperty/>}/>
                        <Route path={'addAgent'} element={<AddAgent/>}/>
                        <Route path={'gallery'} element={<Gallery/>}/>
                    </Route>
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
