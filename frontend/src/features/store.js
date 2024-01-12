import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import {locationsApi} from "./locations/locationSlice";
import { workApi } from "./work/workSlice";
import { employeesApi } from "./employees/employeeSlice";
import { designationsApi } from "./designations/designationSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [workApi.reducerPath]: workApi.reducer,
        [locationsApi.reducerPath]: locationsApi.reducer,
        [employeesApi.reducerPath]: employeesApi.reducer,
        [designationsApi.reducerPath]: designationsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            apiSlice.middleware, workApi.middleware, 
            locationsApi.middleware, employeesApi.middleware,
            designationsApi.middleware,
        ),
    devTools: true
});

export default store;