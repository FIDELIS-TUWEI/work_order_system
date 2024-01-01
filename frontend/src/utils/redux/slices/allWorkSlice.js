import { createSlice } from "@reduxjs/toolkit";

const workSlice = createSlice({
    name: "work",
    initialState: {
        isLoading: false,
        work: [],
        error: false
    },
    reducers: {
        workAdded: (state, action) => {
            state.push(action.payload);
        }
    },
});

export const { workAdded } = workSlice.actions;

export default workSlice.reducer;