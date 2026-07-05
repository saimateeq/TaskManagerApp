import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, EditIndex } from "../features/taskSlice";
import { EditTask } from "../features/taskSlice";

const AddTask = () => {
    const Tasks = useSelector(state => state.task.tasks)
    const EditID = useSelector(state => state.task.editIndex)
    const priorityRef = useRef(null);
    const [priority, setpriority] = useState(1);
    const dispatch = useDispatch()
    const TaskNameRef = useRef(null)
    const DeadlineRef = useRef(null)
    const DescriptionRef = useRef(null)
    const [id, setId] = useState(Date.now())
    const OnSubmitFunc = (event) => {
        const date = new Date()
        const deadline = new Date(DeadlineRef.current.value)
        {EditID === -1 ?
            dispatch(
                addTask({
                    id: id,
                    name: TaskNameRef.current?.value,
                    description: DescriptionRef.current?.value,
                    priority: priorityRef.current?.value,
                    deadline: deadline.toLocaleDateString(),
                    status: new Date(DeadlineRef.current.value) >= new Date() ? "Active" : "Overdue",
                    StartDate: date.toLocaleDateString(),
                    deadlineOBJ: DeadlineRef.current?.value
                })
            ) 
            :
            dispatch(EditTask({
                name: TaskNameRef.current?.value,
                description: DescriptionRef.current?.value,
                priority: priorityRef.current?.value,
                deadline: deadline.toLocaleDateString(),
                status: new Date(DeadlineRef.current.value) >= new Date() ? "Active" : "Overdue",
                deadlineOBJ: DeadlineRef.current?.value
            }))
            dispatch(EditIndex(-1))}

    }
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <form onSubmit={(event) => { OnSubmitFunc(event) }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskName">
                        Task Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taskName" type="text" placeholder="Task Name" ref={TaskNameRef} defaultValue={EditID !== -1 && Tasks.length !== 0 ? Tasks[EditID].name : ""} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
                        Deadline
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="deadline" type="date" ref={DeadlineRef} defaultValue={EditID !== -1 && Tasks.length !== 0 ? (Tasks[EditID].deadlineOBJ) : ""} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                        <span className="w-full flex flex-row">Priority <span className="ml-auto">{EditID === -1 ? priority : Tasks[EditID].priority}</span></span>
                    </label>
                    <input className="w-full shadow border rounded py-4 " id="priority" type="range" min="1" max="5" defaultValue="1" ref={priorityRef} defaultValue={EditID !== -1 && Tasks.length !== 0 ? (Tasks[EditID].priority) : 1} onChange={() => { setpriority(priorityRef.current?.value) }} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskDescription">
                        Task Description
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taskDescription" placeholder="Task Description" ref={DescriptionRef} onChange={()=>{console.log(DescriptionRef.current.value);
                    }} defaultValue={EditID !== -1 && Tasks.length !== 0 ? (Tasks[EditID].description) : ""} required></textarea>
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                    {EditID !== -1 && Tasks.length !== 0 ? "Edit" : "Add Task"}
                </button>
            </form>
        </div>
    )
}
export default AddTask;
