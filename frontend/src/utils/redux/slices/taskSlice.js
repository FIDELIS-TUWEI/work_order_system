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
        },

        editTask: (state, action) => {
            const updatedTask = {
                ...action.payload,
            };
    
            const updatedTasks = state.tasks.map(task =>
                task._id === action.payload._id ? updatedTask : task
            );
    
            return {
                ...state,
                tasks: updatedTasks,
            };
            },
    }
});

export const { getTasks, addTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;