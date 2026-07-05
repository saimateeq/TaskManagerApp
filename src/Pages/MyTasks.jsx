import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CompleteTask, DeleteTask, EditIndex, PendingTask, setSelectedFilter, setSelectedSort } from "../features/taskSlice";
import { CompletedTasks, OverDueTasks, ActiveTasks } from "../selectors/FilterSelector";

const MyTasks = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Tasks = useSelector(state => state.task?.tasks)
    const SelectedSort = useSelector(state => state.task.SelectedSort)
    const SelectedFilter = useSelector(state => state.task.SelectedFilter)
    const [Stars, setStars] = useState(["1", "2", "3", "4", "5"])
    const [SortDropDown, setSortDropDown] = useState(false)
    const [FilterDropDown, setFilterDropDown] = useState(false)
    let FilteredTasks = [...Tasks]
    switch (SelectedFilter) {
        case "Active":
            FilteredTasks = Tasks.filter(task => task.status === "Active");
            console.log(FilteredTasks)
            break;
        case "Completed":
            FilteredTasks = Tasks.filter(task => task.status === "Completed");
            break;
        case "Overdue":
            FilteredTasks = Tasks.filter(task => task.status === "Overdue");
            break;
        default: FilteredTasks = [...Tasks]
    }
    let DisplayTasks = [...FilteredTasks]
    switch (SelectedSort) {
        case "Oldest":
            DisplayTasks.sort((a, b) => a.id - b.id)
            break;
        case "Newest":
            DisplayTasks.sort((a, b) => b.id - a.id)
            break;
        case "Priority":
            DisplayTasks.sort((a, b) => b.priority - a.priority)
            break;
        case "Deadline":
            DisplayTasks.sort((a, b) => new Date(a.deadlineOBJ) - new Date(b.deadlineOBJ))
            break;
        case "A to Z":
            DisplayTasks.sort((a, b) => a.name.localeCompare(b.name))
            break;
    }
    const [SortArray, setSortArray] = useState([
        { name: "Oldest", selected: false },
        { name: "Newest", selected: true },
        { name: "Priority", selected: false },
        { name: "Deadline", selected: false },
        { name: "A to Z", selected: false }

    ])
    const [FilterArray, setFilterArray] = useState([
        { name: "All", selected: true, },
        { name: "Active", selected: false, },
        { name: "Completed", selected: false, },
        { name: "Overdue", selected: false, },
    ])
    const SortDropDownFunc = (selectedIndex, name) => {
        dispatch(setSelectedSort(name))
        if (SortDropDown) {
            setSortArray(prev =>
                prev.map((task, index) => {
                    return index === selectedIndex
                        ? { ...task, selected: true }
                        : { ...task, selected: false }
                }))
        } else {
            setSortArray(prev =>
                prev.map(task => ({
                    ...task,
                    selected: true
                }))
            )
        }
        setSortDropDown(!SortDropDown)
    }
    const FilterDropDownFunc = (selectedIndex, name) => {
        dispatch(setSelectedFilter(name))
        if (FilterDropDown) {
            setFilterArray(prev =>
                prev.map((task, index) => {
                    return index === selectedIndex
                        ? { ...task, selected: true }
                        : { ...task, selected: false }
                }))
        } else {
            setFilterArray(prev =>
                prev.map(task => ({
                    ...task,
                    selected: true
                }))
            )
        }
    }
    useEffect(() => {
        setFilterArray(prev =>
            prev.map((task, index) => {
                return index === FilterArray.findIndex(item => item.name === SelectedFilter)
                    ? { ...task, selected: true }
                    : { ...task, selected: false }
            }))
    }, [SelectedFilter])
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-5 p-4 gap-2">
                <div className="flex flex-col col-span-3 font-bold ">
                    <h1 className="text-xl  sm:text-3xl font-bold">YOUR TASKS</h1>
                    <h2 className="text-gray-400 text-xs sm:text-sm ">MANAGE YOUR TASKS</h2>
                </div>
                <div className="flex flex-col border-solid rounded-lg absolute right-20 sm:right-25 w-20 sm:w-25 text-center shadow shadow-black text-xs sm:text-sm">
                    {FilterArray.map((items, index) => {
                        return (
                            <li key={index} className={`bg-gray-200 border-b-2 border-gray-300 text-center  list-none font-bold w-full p-2 ${FilterDropDown ? "hover:bg-blue-400 hover:text-white" : ""}  ${items.selected ? "flex" : "hidden"}`} onClick={() => {
                                FilterDropDownFunc(index, items.name)
                                setFilterDropDown(!FilterDropDown)
                            }}>{items.name}</li>
                        )
                    })}
                </div>
                <div className="flex flex-col border-solid rounded-lg absolute right-3 w-15 sm:w-20 text-center shadow shadow-black text-xs sm:text-sm">
                    {SortArray.map((items, index) => {
                        return (
                            <li key={index} className={`bg-gray-200 border-b-2 border-gray-300 text-center  list-none font-bold w-full p-2 ${SortDropDown ? "hover:bg-blue-400 hover:text-white" : ""}  ${items.selected ? "flex" : "hidden"}`} onClick={() => { SortDropDownFunc(index, items.name) }}>{items.name}</li>
                        )
                    })}
                </div>
            </div>
            <div className="w-full flex flex-wrap flex-row gap-3 justify-center text-sm sm:text-base">
                {DisplayTasks.length > 0 ? DisplayTasks.map((items, index) => {
                    const date = items.id
                    return (
                        <div key={index} className={`w-11/12 rounded-2xl border-2 sm:border-6 ${items.status === "Active" ? "border-blue-800" : items.status === "Completed" ? "border-green-800" : "border-red-800"} md:w-90 p-2  sm:p-4 flex flex-col items-center justify-between gap-1 sm:gap-2`} >
                            <h1 className="text-lg sm:text-2xl font-bold">{items.name}</h1>
                            <p className="w-5/6 bg-white rounded-xl text-gray-600 font-semibold min-h-10 h-auto md:min-h-25 p-1 sm:p-2 text-center overflow-scroll scrollbar-none text-sm sm:text-base">{items.description}</p>
                            <div className="flex flex-row items-center justify-between w-3/5 text-sm sm:text-base">
                                <p className="text-gray-400 font-bold ">Status</p>
                                <p className={`${items.status === "Active" ? "bg-blue-700" : items.status === "Completed" ? "bg-green-700" : "bg-red-700"} text-gray-200 font-bold p-1 sm:p-2 rounded-xl opacity-80 text-sm sm:text-base`}>{items.status}</p>
                            </div>
                            <div className="flex flex-row gap-1 items-center font-bold text-sm sm:text-base w-3/5  justify-between text-gray-400">
                                <p>Priority</p>
                                <div className="flex flex-row">
                                    {Stars.map((star) => {
                                        return (
                                            <div key={star} className={`${items.priority >= star ? "text-amber-300" : "text-gray-500"} `}>
                                                <GoStarFill className="w-4 h-4" />
                                            </div>
                                        )
                                    })}</div>
                            </div>
                            <div className="flex flex-col justify-between m-auto w-3/5 gap-2">
                                <h2 className="text-sm w-full flex flex-row justify-between items-center"><span className="font-bold text-gray-400">Start Date</span>{items.StartDate}</h2>
                                <h2 className="text-sm w-full flex flex-row items-center justify-between"><span className="font-bold text-gray-400">Deadeline</span>{items.deadline}</h2>
                            </div>
                            <div className="flex flex-row items-center justify-evenly gap-2">
                                <button className="bg-blue-600 px-2 py-1 rounded-2xl w-20 sm:w-24 shadow text-xs sm:text-base" onClick={() => {
                                    dispatch(EditIndex(items.id))
                                    navigate("/addtask")
                                }}>Edit</button>
                                <button className="bg-red-600 px-2 py-1 rounded-2xl w-20 sm:w-24  shadow text-xs sm:text-base" onClick={() => { dispatch(DeleteTask(items.id)) }}>Delete</button>
                                {items.status === "Completed" ?
                                    <button className="bg-amber-400 px-2 py-1 rounded-2xl w-20 sm:w-24 shadow text-xs sm:text-base" onClick={() => { dispatch(PendingTask(items.id)) }}>Pending</button>
                                    :
                                    <button className="bg-green-600 px-2 py-1 rounded-2xl w-20 sm:w-24 shadow text-xs sm:text-base" onClick={() => { dispatch(CompleteTask(items.id)) }}>Completed</button>
                                }
                            </div>
                        </div>
                    )
                })
                    :
                    <div>
                        <h1 className="text-2xl font-bold text-gray-400">No Tasks Found</h1>
                    </div>}
            </div>
        </div>
    )
}
export default MyTasks;