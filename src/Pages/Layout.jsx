import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"
import Navbar from "./Navbar"
import { useState } from "react";
const Layout = () => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
    return(
        <div className={`w-full grid grid-cols-3 md:grid-cols-4 gap-2 ${SidebarOpen ? "overflow-hidden h-screen" : ""}`}>
      <SideBar CloseSidebar={() => setSidebarOpen(false)} SidebarOpen={SidebarOpen} />
      <div className="grid grid-rows-[60px_1fr] md:grid-rows-[100px_1fr] col-span-full sm:col-span-2 md:col-span-3">
        <Navbar OpenSidebar={() => setSidebarOpen(true)} />
        <Outlet context={{ CloseSidebar: () => setSidebarOpen(false) }} />
      </div>
    </div>
    )
}
export default Layout