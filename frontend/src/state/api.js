import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User"],
    endpoints: (build) => ({
        singleUser: build.query({
            query: (id) => `hin/user/${id}`,
            providesTags: ["User"]
        })
    })
});

export const {
    useSingleUserQuery,
} = api;