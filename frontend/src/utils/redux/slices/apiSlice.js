import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ 
    baseUrl: "",
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
    },
    credentials: "include",
    //prepareHeaders: (headers, { getState }) => {
    //    const token = getState().auth.token;
    //    if (token) {
    //        headers.set("authorization", `Bearer ${token}`);
    //    }
    //    return headers;
    //} 
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Users", "WorkOrder"],
    endpoints: (builder) => ({}),
})