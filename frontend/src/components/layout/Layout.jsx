import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "../common/Loader";
import ScrollToTop from "../common/ScrollToTop";

const HERO_ROUTES = ["/"];

function Layout() {
  const { pathname } = useLocation();
  const hasHero = HERO_ROUTES.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1c2333] transition-colors duration-500 dark:bg-[#05070f] dark:text-white">
      <Loader />
      <ScrollToTop />
      <Navbar hasHero={hasHero} />

      <main className={`flex-1 ${hasHero ? "" : "pt-20"}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;