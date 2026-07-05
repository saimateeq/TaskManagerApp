import { createSelector } from "reselect";

export const SelectTasks = (state) => state.task.tasks


export const TaskStats = createSelector(
  [SelectTasks],
  (tasks) => {
    return tasks.reduce(
      (acc, task) => {
        if (task.status === "Active") acc.Active++;
        if (task.status === "Completed") acc.Completed++;
        if (task.status === "Overdue") acc.Overdue++;

        return acc;
      },
      {
        Active: 0,
        Completed: 0,
        Overdue: 0,
      }
    );
  }
);