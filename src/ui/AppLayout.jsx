import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div>
      <Navbar />
      <div className="bg-[#f3f4f6]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
