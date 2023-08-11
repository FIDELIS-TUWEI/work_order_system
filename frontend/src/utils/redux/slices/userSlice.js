import { createSlice } from "@reduxjs/toolkit";
const USERS_URL = "/hin";




export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
    },
    reducers: {},
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.user;