import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverUrl = import.meta.env.VITE_SERVER_URL;

const baseQuery = fetchBaseQuery({ 
    baseUrl: serverUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        console.log("Token:", token);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    } 
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Users", "WorkOrder"],
    endpoints: (builder) => ({}),
});