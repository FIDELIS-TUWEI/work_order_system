import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const WORK_URL = "/hin";

export const fetchWorkOrders = createAsyncThunk("fetchWorkOrders", async () => {
    const res = await axios.get(`${WORK_URL}/query/all/work`);
    const data = res.data;
    return data;
})


const workSlice = createSlice({
    name: "work",
    initialState: {
        isLoading: false,
        workOrders: [],
        error: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWorkOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.workOrders = action.payload;
            })
            .addCase(fetchWorkOrders.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
});

export default workSlice.reducer;