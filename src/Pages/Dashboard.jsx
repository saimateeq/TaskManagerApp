import { GoArrowUpRight } from "react-icons/go";
import Chart from "../Components/Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { MdModeEdit, MdDelete, MdOutlineCancel, MdDoubleArrow } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { TaskStats } from "../selectors/taskSelector";
import { useNavigate } from "react-router";
import { DeleteTask, deleteTask, EditIndex, setSelectedFilter } from "../features/taskSlice";
const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Tasks = useSelector(state => state.task.tasks)
    const [Selected, setSelected] = useState([]);
    const [SelectedDate, setSelectedDate] = useState(null)
    const [data, setData] = useState([
        { name: "Total Tasks", },
        { name: "Active",  },
        { name: "Completed",  },
        { name: "Overdue",  }
    ])
    const stats = useSelector(TaskStats)
    return (
        <div className="">
            <h1 className="text-2xl sm:text-3xl font-bold ml-4">Dashboard</h1>
            <p className="text-gray-400 ml-4 font-BlackOps text-xs sm:text-sm ">Plan, Prioritize, and Manage Your Tasks</p>
            <div className="p-4 flex flex-row flex-wrap items-center justify-center w-full gap-2 sm:gap-4">
                {data.map((item, index) => {
                    return (
                        <div key={index} onClick={()=>{
                            let name = item.name==="Total Tasks" ? "All" : item.name
                            dispatch(setSelectedFilter(name))
                            navigate("/mytasks")
                        }} className={`text-white px-4 py-2 sm:py-4 rounded-lg shadow-md w-full sm:w-[47%]  ${item.name === "Total Tasks" ? 'bg-blue-800' : item.name === "Active" ? 'bg-amber-600' : item.name === "Completed" ? 'bg-green-800' : 'bg-red-800'}`}>
                            <h2 className="text-lg font-bold flex justify-between">{item.name} <button className="text-white border-2 rounded-2xl text-lg font-bold border-white p-1"><GoArrowUpRight /></button></h2>
                            <p className="text-lg sm:text-xl font-bold">{item.name === "Total Tasks" ? Tasks.length : item.name === "Active" ? String(stats.Active) : item.name === "Overdue" ? String(stats.Overdue) : String(stats.Completed)}</p>
                        </div>
                    )
                })}
                <div className="w-full sm:w-[47%]  p-4 bg-gray-200 rounded-lg shadow-md flex sm:flex-col gap-2 items-center justify-center">
                    <Chart />
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <span className="bg-gray-200 w-3 h-3 rounded-full"></span>
                            <span className="text-sm font-bold text-gray-900">Total Tasks : {Tasks.length}</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="bg-red-800 w-3 h-3 rounded-full"></span>
                            <span className="text-sm font-bold text-gray-600">Overdue Tasks</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="bg-green-800 w-3 h-3 rounded-full"></span>
                            <span className="text-sm font-bold text-gray-600">Completed Tasks</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="bg-amber-500 w-3 h-3 rounded-full"></span>
                            <span className="text-sm font-bold text-gray-600">Active Tasks</span>
                        </div>




                    </div>
                </div>
                <div className="w-full sm:w-[47%] p-4 bg-gray-200 rounded-lg shadow-md">
                    {Selected.length!==0?
                        <div className={`w-full bg-gray-700 h-full self-center p-2 rounded-xl flex gap-2 items-center flex-col`} >
                            <span className="text-white flex flex-row items-center justify-between w-full"><span></span>{SelectedDate}<MdOutlineCancel className=" text-2xl" onClick={() => { 
                                setSelected([])
                                setSelectedDate(null)

                             }} /></span>
                            <div className={`w-5/6 h-1/2 rounded-xl flex items-center justify-center p-2
                            ${Selected[0]?.status === 'Active' ? 'bg-amber-500 text-white' : Selected[0]?.status === 'Completed' ? 'bg-green-500 text-white' : Selected[0]?.status === 'Overdue' ? 'bg-red-500' : 'bg-gray-200 text-gray-500'}`}>
                                <h2 className=" font-bold text-sm">{Selected[0].name}</h2>
                            </div>
                            <div className="w-5/6 flex flex-row gap-2 justify-center items-center">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={()=>{
                                    if(Selected[0].name!=="No Tasks"){
                                    dispatch(EditIndex(Selected[0].id))
                                    navigate("/addtask")}
                                }}><MdModeEdit /></button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={()=>{
                                    if(Selected[0].name!=="No Tasks"){
                                        dispatch(DeleteTask(Selected[0].id))
                                        setSelected([])
                                        setSelectedDate(null)
                                    }
                                }}><MdDelete /></button>
                                <button className="bg-green-500 text-white px-2 py-1 rounded-md font-bold" onClick={()=>{
                                    navigate("addtask")
                                }}><CiCirclePlus /></button>
                            </div>
                        </div>:<div></div>}
                    <Calendar value={new Date()} tileClassName={({ date, view }) => {
                        const arr = Tasks.filter(Task => Task.deadline === date.toLocaleDateString())
                        const ClassName = arr[0]?.status === "Completed" ? "completed" :
                            arr[0]?.status === "Active" ? "active" : arr[0]?.status === "Overdue" ? "Overdue" :
                                ""
                        return ClassName
                    }} onClickDay={(value, event) => {
                        const arr = Tasks.filter(Task => Task.deadline === value.toLocaleDateString())
                        arr.length===0 ? setSelected([{ name: "No Tasks", status: "", }]) : setSelected(arr)
                        setSelectedDate(value.toLocaleDateString())
                    }} />
                </div>

            </div>
        </div>
    )
}
export default Dashboard;
