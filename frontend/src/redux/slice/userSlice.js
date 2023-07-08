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
        }
    }
})

export const {getUser} = userSlice.actions;
export default userSlice.reducer;