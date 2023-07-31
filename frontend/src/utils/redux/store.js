import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import taskSlice from "./slices/taskSlice";
import loadingSlice from "./slices/loadingSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        task: taskSlice,
        loading: loadingSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

export default store;