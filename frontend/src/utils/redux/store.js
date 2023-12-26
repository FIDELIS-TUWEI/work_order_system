import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/slices/authSlice";
import { apiSlice } from "../redux/slices/apiSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;