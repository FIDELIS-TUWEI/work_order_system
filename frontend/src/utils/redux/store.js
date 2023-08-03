import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import loadingSlice from "../slices/loadingSlice";
import { apiSlice } from "../slices/apiSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        loading: loadingSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;