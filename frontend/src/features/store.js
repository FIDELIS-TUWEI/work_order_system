import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import {locationsApi} from "./locations/locationSlice";
import { workApi } from "./work/workSlice";
import { employeesApi } from "./employees/employeeSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [workApi.reducerPath]: workApi.reducer,
        [locationsApi.reducerPath]: locationsApi.reducer,
        [employeesApi.reducerPath]: employeesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            apiSlice.middleware, workApi.middleware, 
            locationsApi.middleware, employeesApi.middleware,
        ),
    devTools: true
});

export default store;