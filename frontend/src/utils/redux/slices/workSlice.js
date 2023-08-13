import { createSlice } from "@reduxjs/toolkit";

export const workSlice = createSlice({
    name: "work",
    initialState: {
        work: null
    },
    reducers: {
        setWork: (state, action) => {
            state.work = action.payload;
        }
    }
});

export const { setWork } = workSlice.actions;

export const selectWork = (state) => state.work.work;