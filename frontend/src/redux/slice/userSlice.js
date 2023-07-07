import { createSlice } from "@reduxjs/toolkit";

// User Slice
const userSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {

    }
})

export const {} = userSlice.actions;
export default userSlice.reducer;