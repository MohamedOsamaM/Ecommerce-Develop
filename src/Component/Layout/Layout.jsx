import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Layout() {
    return ( <>
    <Navbar></Navbar>
    <div className="w-[90%] mx-auto py-5 ">
        <Outlet></Outlet>
    </div>
    <Footer></Footer>
    </> );
}

export default Layout;