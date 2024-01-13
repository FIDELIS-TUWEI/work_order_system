import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import {locationsApi} from "./locations/locationSlice";
import { workApi } from "./work/workSlice";
import { employeesApi } from "./employees/employeeSlice";
import { designationsApi } from "./designations/designationSlice";
import { departmentsApi } from "./departments/departmentSlice";
import { categoriesApi } from "./categories/categorySlice";
import { usersApi } from "./users/userSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [workApi.reducerPath]: workApi.reducer,
        [locationsApi.reducerPath]: locationsApi.reducer,
        [employeesApi.reducerPath]: employeesApi.reducer,
        [designationsApi.reducerPath]: designationsApi.reducer,
        [departmentsApi.reducerPath]: departmentsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            apiSlice.middleware, workApi.middleware, 
            locationsApi.middleware, employeesApi.middleware,
            designationsApi.middleware, departmentsApi.middleware,
            categoriesApi.middleware, usersApi.middleware
        ),
    devTools: true
});

export default store;