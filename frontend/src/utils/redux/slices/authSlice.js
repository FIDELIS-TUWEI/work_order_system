import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            state.userInfo = user;
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

export const selectUserInfo = (state) => state.auth.userInfo;
export const selectToken = (state) => state.auth.token;