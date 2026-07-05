import { createSlice } from "@reduxjs/toolkit";
import { loadTasks } from "../utils/localStorage";

const initialState = {
  tasks: loadTasks(),
  editIndex: -1,
  SelectedFilter: "All",
  SelectedSort: "Newest"
  
};
// export const TaskStats = (state) => {
//   return state.task.tasks.reduce(
//     (acc, task) => {
//       if (task.status === "Active") acc.active++;
//       if (task.status === "Completed") acc.completed++;
//       if (task.status === "OverDue") acc.overdue++;
//       return acc;
//     },
//     { active: 0, completed: 0, overdue: 0 }
//   );
// };
const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        task => task.id !== action.payload
      );
    },
    EditIndex: (state, action) => {
      action.payload === -1 ? state.editIndex = -1 :
        state.editIndex = state.tasks.findIndex(task => task.id === action.payload)

    },
    EditTask: (state, action) => {
      state.tasks = state.tasks.map((task, index) =>
        index === state.editIndex ? {
          ...task,
          name: action.payload.name,
          description: action.payload.description,
          priority: action.payload.priority,
          deadline: action.payload.deadline,
          status: action.payload.status,
          deadlineOBJ: action.payload.deadlineOBJ
        } : task
      )
    },
    DeleteTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload)
      state.tasks.splice(index, 1)
    },
    CompleteTask: (state, action) => {
      state.tasks = state.tasks.map((task, index) =>
        task.id === action.payload ? {
          ...task,
          status: "Completed"
        } : task
      )
    },
    PendingTask: (state, action) => {
      state.tasks = state.tasks.map((task, index) =>
        task.id === action.payload ? {
          ...task,
          status: new Date(state.tasks[index].deadlineOBJ) >= new Date() ? "Active" : "OverDue",
        } : task
      )
    },
    setSelectedSort: (state, action) => {
      state.SelectedSort = action.payload
    },
    setSelectedFilter:(state,action) => {
      console.log(action.payload)
      state.SelectedFilter=action.payload
    }

  }
})

export const { addTask, deleteTask, EditIndex, EditTask, DeleteTask, CompleteTask, PendingTask , setSelectedSort, setSelectedFilter} = taskSlice.actions;

export default taskSlice.reducer;