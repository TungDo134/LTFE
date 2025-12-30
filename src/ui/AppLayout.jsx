import {Outlet} from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Chat from "./Chat.jsx";

function AppLayout() {
    return (
        <div className={"relative"}>
            <Navbar/>
            <Chat/>
            <div className="bg-[#f3f4f6]">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}

export default AppLayout;
