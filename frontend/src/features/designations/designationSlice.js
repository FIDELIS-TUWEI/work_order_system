import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const WORK_URL = "/hin";

const baseQuery = fetchBaseQuery({
    baseUrl: WORK_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});