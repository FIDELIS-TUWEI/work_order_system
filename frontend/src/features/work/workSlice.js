import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const WORK_URL = "/hin";

export const workApi = createApi({
    reducerPath: "workApi",
    baseQuery: fetchBaseQuery({ baseUrl: WORK_URL }),
    endpoints: (builder) => ({
        createWork: builder.mutation({
            query: (values) => ({
                url: `/create/work`,
                method: "POST",
                body: values,
            }),
        }),
        allWork: builder.query({
            query: (page) => ({
                url: `/all-work?pageNumber=${page}`,
                method: "GET",
            }),
        }),
        queryAllWork: builder.query({
            query: () => ({
                url: `/search/work`,
                method: "GET",
            }),
        }),
        deleteWork: builder.mutation({
            query: (id) => ({
                url: `/work/${id}`,
                method: "DELETE",
            }),
        })
    })
});

export const {
    useCreateWorkMutation,
    useQueryAllWorkQuery,
    useAllWorkQuery,
    useDeleteWorkMutation,
} = workApi;
