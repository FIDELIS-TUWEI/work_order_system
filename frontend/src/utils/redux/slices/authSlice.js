import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, userInfo } = action.payload;
            state.userInfo = userInfo;
            state.token = token;
        },
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;