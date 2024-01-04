import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/slices/authSlice";
import { apiSlice } from "../redux/slices/apiSlice";
import queryWorkSlice from "./slices/queryWorkSlice";
import {locationsApi} from "../redux/slices/locationSlice";
import { workApi } from "./slices/workSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        queryWork: queryWorkSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [workApi.reducerPath]: workApi.reducer,
        [locationsApi.reducerPath]: locationsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, workApi.middleware, locationsApi.middleware),
    devTools: true
});

export default store;