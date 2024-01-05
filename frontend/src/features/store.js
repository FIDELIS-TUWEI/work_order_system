import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import queryWorkSlice from "./work/queryWorkSlice";
import {locationsApi} from "./locations/locationSlice";
import { workApi } from "./work/workSlice";

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