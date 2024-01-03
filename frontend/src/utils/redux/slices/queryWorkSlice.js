import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const WORK_URL = "/hin";

export const queryWorkOrders = createAsyncThunk("queryWorkOrders", async () => {
    const res = await axios.get(`${WORK_URL}/query/all/work`);
    const data = res.data;
    return data;
});

const initialState = {
    isLoading: false,
    workOrders: [],
    error: false
}

const queryWorkSlice = createSlice({
    name: "queryWork",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(queryWorkOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(queryWorkOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.workOrders = action.payload;
            })
            .addCase(queryWorkOrders.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
});

export const queryAllWork = (state) => state.queryWork;

export default queryWorkSlice.reducer;