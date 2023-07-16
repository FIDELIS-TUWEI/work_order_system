import { createSlice } from "@reduxjs/toolkit";

// Tasks Slice
const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: []
    },
    reducers: {
        getTasks : (state, action) => {
            state.tasks = action.payload.data.tasks.map((task) => {
                return { _id: task._id,
                    title: task.title,
                    location: task.location,
                    priority: task.priority,
                    category: task.category,
                    taskType: task.taskType,
                    status: task.status,
                    assignedTo: task.assignedTo,
                    assignedBy: task.assignedBy,
                    date: task.date 
                }
            })
        },
        addTask : (state, action) => {
            //console.log(action)
            state.tasks.push(action.payload);
        }
    }
});

export const { getTasks, addTask } = taskSlice.actions;
export default taskSlice.reducer;