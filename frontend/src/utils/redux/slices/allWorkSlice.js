import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const WORK_URL = "/hin";

const initialState = {
    work: [],
    addWorkStatus: "",
    addWorkError: "",
    getWorkStatus: "",
    getWorkError: "",
    updateWorkStatus: "",
    updateWorkError: "",
    deleteWorkStatus: "",
    deleteWorkError: ""
};

export const addWork = createAsyncThunk("work/addWork", async (work, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${WORK_URL}/create/work`, work)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
        
})

const workSlice = createSlice({
    name: "work",
    initialState,
    reducers: {},
    extraReducers: {
        [addWork.pending]: (state) => {
            return {
                ...state,
                addWorkStatus: "pending",
                addWorkError: "",
                getWorkStatus: "",
                getWorkError: "",
                updateWorkStatus: "",
                updateWorkError: "",
                deleteWorkStatus: "",
                deleteWorkError: ""
            };
        },
        [addWork.fulfilled]: (state, action) => {
            return {
                ...state,
                work: [action.payload, ...state.work],
                addWorkStatus: "success",
                addWorkError: "",
                getWorkStatus: "",
                getWorkError: "",
                updateWorkStatus: "",
                updateWorkError: "",
                deleteWorkStatus: "",
                deleteWorkError: ""
            };
        },
        [addWork.rejected]: (state, action) => {
            return {
                ...state,
                addWorkStatus: "rejected",
                addWorkError: action.payload,
                getWorkStatus: "",
                getWorkError: "",
                updateWorkStatus: "",
                updateWorkError: "",
                deleteWorkStatus: "",
                deleteWorkError: ""
            };
        }
    }
});

export const { workAdded } = workSlice.actions;

export default workSlice.reducer;