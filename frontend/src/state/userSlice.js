import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "648ff871b5ecb5197378d477",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;