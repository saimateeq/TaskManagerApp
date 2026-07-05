import logo from "../images/logo3.png";
import "../App.css";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router";
import SideBar from "./SideBar";

const Navbar = ({ OpenSidebar }) => {
   const navigate = useNavigate()
    return (
        <div className="w-11/12 h-10 md:h-16 bg-gray-300 mt-2 rounded-full flex m-auto gap-2 items-center justify-between px-2 sm:px-6">
            <div className="sm:hidden" onClick={OpenSidebar}>
                <IoMenu className="text-gray-700 text-xl" />
            </div>
            <div className="flex flex-row items-center w-auto">
                <img src={logo} alt="logo" className="h-16 w-16 md:h-24 md:w-24 rounded-full" />
                <span className="text-xs sm:text-lg md:text-2xl navbarH -ml-4">TASK MANAGER</span>
            </div>
            <div className="hidden sm:flex gap-2">
                <button className="bg-green-500 text-white  text-xs md:text-md px-2 sm:py-1 md:px-4 md:py-2 md:font-bold rounded-md hover:bg-green-600" onClick={() => navigate("/addtask")}>ADD TASK</button>
                <button className="bg-blue-500 text-white  text-xs md:text-md px-2 sm:py-1 md:px-4 md:py-2 md:font-bold rounded-md hover:bg-blue-600" onClick={() => navigate("/login")}>LOGIN</button>
            </div>
        </div>
    )
}
export default Navbar;