import { GoGraph } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTasks, FaClock } from "react-icons/fa";
import { MdTaskAlt } from "react-icons/md";
import { BiTaskX, BiLogIn } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { IoMdCloseCircle } from "react-icons/io";

const SideBar = ({ SidebarOpen, CloseSidebar }) => {
    const navigate = useNavigate();
    const Location = useLocation();
    const [Sidebar, setSidebar] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const [SideBarItems, setSideBarItems] = useState([
        { Name: "Dashboard", Icon: <GoGraph />, path: "/" },
        { Name: "Add Task", Icon: <IoMdAddCircleOutline />, path: "/addtask" },
        { Name: "My Tasks", Icon: <FaTasks />, path: "/mytasks" },
        { Name: "Login", Icon: <BiLogIn />, path: "/login" },
        { Name: "Sign Up", Icon: <FaUserPlus />, path: "/signup" },
    ]);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, [])

    return (
        <motion.div initial={{ x: -200 }} animate={{ x: !isMobile ? 0 : SidebarOpen ? 0 : "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 ,duration: 0.5}} className={`col-span-1 absolute sm:relative w-full  min-h-screen bg-blue-900 sm:block overflow-y-scroll scrollbar-none z-30 }`}>
            <h1 className="text-white text-bold text-2xl text-center my-4">SIDEBAR</h1>
            {SideBarItems.map((item, index) => (
                <div key={index} onClick={() => {
                    isMobile && CloseSidebar()
                    navigate(item.path)
                }} className={`flex items-center gap-2 text-white p-4 hover:bg-blue-700 cursor-pointer ${item.path === Location.pathname ? 'bg-blue-700' : ''}`}>
                    {item.Icon}
                    <span>{item.Name}</span>
                </div>
            ))}
            {isMobile && <div className="absolute top-2 right-2" onClick={CloseSidebar}>
                <IoMdCloseCircle className="text-white text-3xl" />
            </div>}
        </motion.div>
    )
}
export default SideBar;