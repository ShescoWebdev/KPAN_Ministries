import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "../common/Loader";
import ScrollToTop from "../common/ScrollToTop";
import RouteMeta from "../common/RouteMeta";

// Pages that displays the hero section
const HERO_ROUTES = [
  "/", "/give", 
  "/about", "/contact", 
  "/get-involved/blog", "/get-involved/blog/:slug", 
  "/media", 
  "/events", 
  "/about/who-we-are", "/about/leadership"
];

function Layout() {
  const { pathname } = useLocation();
  const hasHero = HERO_ROUTES.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1c2333] transition-colors duration-500 dark:bg-[#05070f] dark:text-white">
      <Loader />
      <ScrollToTop />
      <RouteMeta />
      <Navbar hasHero={hasHero} />

      <main className={`flex-1 ${hasHero ? "" : "pt-20"}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;