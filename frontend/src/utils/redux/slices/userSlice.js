import { createSlice } from "@reduxjs/toolkit";

// User Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {getUser} = userSlice.actions;
export default userSlice.reducer;