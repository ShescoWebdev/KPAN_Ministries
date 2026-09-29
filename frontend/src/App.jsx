import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Media from "./pages/Media";
import Ministries from "./pages/Ministries";
import Give from "./pages/Give";
import GetInvolved from "./pages/GetInvolved";
import OnlineChurch from "./pages/OnlineChurch";
import Events from "./pages/Events";
import Location from "./pages/Location";
import KSOM from "./pages/KSOM";
import TFC from "./pages/TFC";
import WOF from "./pages/WOF";
import MOF from "./pages/MOF";
import KPANCommunity from "./pages/KPANCommunity";
import WhoWeAre from "./pages/WhoWeAre";
import Leadership from "./pages/Leadership";
import TheFullnessChurch from "./pages/TheFullnessChurch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* About group */}
          <Route path="/about" element={<About />} />
          <Route path="/about/who-we-are" element={<WhoWeAre />} />
          <Route path="/about/leadership" element={<Leadership />} />

          {/* Ministries group */}
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/ministries/the-fullness-church" element={<TheFullnessChurch />} />
          <Route path="/ministries/ksom" element={<KSOM />} />
          <Route path="/ministries/tfc" element={<TFC />} />

          {/* Single pages */}
          <Route path="/media" element={<Media />} />
          <Route path="/give" element={<Give />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/online-church" element={<OnlineChurch />} />

          {/* Get Involved group */}
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/get-involved/wof" element={<WOF />} />
          <Route path="/get-involved/mof" element={<MOF />} />
          <Route path="/get-involved/kpan-community" element={<KPANCommunity />} />
          <Route path="/get-involved/blogs" element={<Blogs />} />

          {/* Location group */}
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;