import { createSlice } from "@reduxjs/toolkit";

// User Slice
const userSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        getUser : (state, action) => {
            state.users = action.payload.data.map((user) => {
                return { id: user._id, 
                    name: user.name, 
                    username: user.username,
                    role: user.role,
                    active: user.active 
                }
            })
        },
        addUser : (state, action) => {
            state.users.push(action.payload)
        }
    }
})

export const {getUser, addUser} = userSlice.actions;
export default userSlice.reducer;