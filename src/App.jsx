import {BrowserRouter, Route, Routes} from "react-router-dom";
import FrontLayout from "./layouts/FrontLayout.jsx";
import Home from "./pages/front/Home.jsx";
import PageNotFound from "./pages/front/errors/PageNotFound.jsx";
import About from "./pages/front/About.jsx";
import Index from "./pages/front/properties/index.jsx";
import BlogSingle from "./pages/front/blog/Single.jsx";
import Blog from "./pages/front/blog/Blog.jsx";
import Single from "./pages/front/properties/Single.jsx";

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
              <Route path={'/properties/listing'} element={<Index />} />
              <Route path={'/properties/listing/1'} element={<Single />} />
            {/*Page Not Found*/}
            <Route path={'*'} element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
