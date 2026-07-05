import { createSelector } from "reselect";

export const SelectTasks = (state) => state.task?.tasks??[]

export const ActiveTasks = createSelector(
    [SelectTasks],
    (tasks) => tasks.filter((task) => task.status === "Active")
    ,
)
export const CompletedTasks = createSelector(
    [SelectTasks],
    (tasks) => tasks.filter((task) => task.status === "Completed")
    ,
)
export const OverDueTasks = createSelector(
    [SelectTasks],
    (tasks) => tasks.filter((task) => task.status === "Overdue")
)