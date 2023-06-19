import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = `http://localhost:5000`

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    reducerPath: "adminApi",
    tagTypes: ["User"],
    endpoints: (build) => ({
        singleUser: build.query({
            query: (id) => `/hin/user/${id}`,
            providesTags: ["User"]
        })
    })
});

export const {
    useSingleUserQuery,
} = api;