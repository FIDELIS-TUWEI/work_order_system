import { createSlice } from "@reduxjs/toolkit";

// Tasks Slice
const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: []
    },
    reducers: {
        getTasks : (state, action) => {
            state.tasks = action.payload.data.map((task) => {
                return { id: task._id,
                    title: task.title,
                    description: task.description,
                    location: task.location,
                    priority: task.priority,
                    taskType: task.taskType,
                    status: task.status,
                    assignedTo: task.assignedTo,
                    user: task.user 
                }
            })
        }
    }
});

export const { getTasks } = taskSlice.actions;
export default taskSlice.reducer;