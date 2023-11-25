import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workOrder: {},
};

const workSlice = createSlice({
    name: "work",
    initialState,
    reducers: {
        setWorkOrder: (state, action) => {
            state.workOrder = action.payload;
        },
    },
});

export const { setWorkOrder } = workSlice.actions;

export default workSlice.reducer;

export const selectWorkOrder = (state) => state.work.workOrder;
