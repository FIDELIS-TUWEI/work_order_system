import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
//import taskSlice from "./slices/taskSlice";
import loadingSlice from "./slices/loadingSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userSlice,
        //task: taskSlice,
        loading: loadingSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;