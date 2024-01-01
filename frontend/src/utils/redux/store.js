import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/slices/authSlice";
import { apiSlice } from "../redux/slices/apiSlice";
import queryWorkSlice from "./slices/queryWorkSlice";
import allWorkSlice from "./slices/allWorkSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        queryWork: queryWorkSlice,
        work: allWorkSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;