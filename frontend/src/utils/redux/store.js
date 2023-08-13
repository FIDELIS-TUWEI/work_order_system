import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/slices/authSlice";
import { apiSlice } from "../redux/slices/apiSlice";
import { userSlice } from "./slices/userSlice";
import { workSlice } from "./slices/workSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice.reducer,
        work: workSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;