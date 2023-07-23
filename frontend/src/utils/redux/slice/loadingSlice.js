import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loading: true,
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        }
    },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;